// src/pages/BasicFactoryTemplate.js

/** BasicFactoryTemplate
 * @abstract Renders the page for each individual factory. Takes one parameter in the URL, "Factory_ID", and renders at the relative
 * route "/industrial-sites/:Factory_ID". The page renders with the title and cover image, a gallery, plus EITHER: 
 *      1. If there is no storymap for this factory, the page shows a data table containing raw data on this factory. 
 *      2. If there is a storymap for this factory (defined in src/GlobalConstants.js => factoryStorymapURLs[Factory_ID]), the page 
 *         shows the storymap instead of a table of data. The storymap should include a data table.  
 * @param { int } Factory_ID 
 */

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';
import { featureLayerServiceURLs } from '../GlobalConstants.js';
import { fetchFactoriesFL, fetchFL } from '../ArcGIS.js';
import Title from '../components/Title.js';
import Gallery from '../components/Photo/Gallery.js';
import { factoryStoryMapURLs } from '../GlobalConstants.js';
import FactoryTimeline from '../components/FactoryTimeline.js';

import { LanguageContext } from '../context/LanguageContext.js';
import LanguageSelector from '../components/LanguageSelector.js';

import '../css/components/Gallery.css';
import '../css/components/Photo.css';
import '../css/BasicFactoryTemplate.css';

function BasicFactoryTemplate() {
    const { Factory_ID } = useParams();
    const [coverPicURL, setCoverPicURL] = useState('');
    const [allAttachments, setAllAttachments] = useState([]);
    const [storymapURL, setStorymapURL] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState('');
    const [factoryTimelineParams, setTimelineParams] = useState({});
    let removeTimeline = false;

    const { t, language } = useContext(LanguageContext);                   // For translation
    let languageSelected = sessionStorage.getItem('hasSelectedLanguage');

    const circleColors = { 
        'products': [255, 199, 238],
        'employment': [255, 251, 199],
        'info': [199, 255, 246],
        'timeperiods': [216, 204, 255]
    }

    // Set viewport to the top of the page since React is sus
    window.scrollTo({ 
        top: 0
    });

    // useEffect => get the details for this factory to init the page
    useEffect(() => { 
        // Use fetchFactoriesFL with a filter to get the preliminary data for just the factory ID passed
        fetchFactoriesFL(`Factory_ID = ${Factory_ID}`)
        .then(async factories => {

            // Since we used a primary key as the filter, there is only one result
            const factory = factories[0];

            /** Get the timeperiods FL using the factory's opening/closing dates
             * @constant { dict } timeperiods - the timeperiods to pass to the FactoryTimeline in the format 
             *                                  { 'Title': "Timeperiod title.", 'Year': [Timeperiod start year] }
             */
            let timeperiods = {} 
            await fetchFL(
                featureLayerServiceURLs['Timeperiod'], 
                `(Start_Date >= ${factory.Opening_Year}) AND (End_Date <= ${factory.Closing_Year})`
            )
            .then(fl => { 
                fl.map(d => { 
                    timeperiods[d.attributes['Start_Date']] = [{
                        'Title': d.attributes[`Title_${language}`],
                        'Color': circleColors['timeperiods']
                    }];
                });
            });

            
            // Push the opening and closing dates for this factory onto the timeperiods (if they exist)
            if(factory.Opening_Year) { 
                let returnDict = {};

                if(language == 'en') { 
                    returnDict = { 
                        'Title': `${factory.English_Name} opens.`,
                        'Color': circleColors['info']
                    }
                } else { 
                    returnDict = { 
                        'Title': `${t('opens')} ${factory.Italian_Name}.`,
                        'Color': circleColors['info']
                    }
                }
                if(timeperiods.hasOwnProperty(parseInt(factory.Opening_Year))) { 
                    timeperiods[parseInt(factory.Opening_Year)].push(returnDict);
                } else { 
                    timeperiods[parseInt(factory.Opening_Year)] = [returnDict];
                }
            }
            
            if(factory.Closing_Year && factory.Closing_Year != 9999) { 
                let returnDict = {};

                if(language == 'en') { 
                    returnDict = { 
                        'Title': `${factory.English_Name} closes.`,
                        'Color': circleColors['info']
                    }
                } else { 
                    returnDict = { 
                        'Title': `${t('closes')} ${factory.Italian_Name}.`,
                        'Color': circleColors['info']
                    }
                }
                
                if(timeperiods.hasOwnProperty(parseInt(factory.Closing_Year))) { 
                    timeperiods[parseInt(factory.Closing_Year)].push(returnDict);
                } else { 
                    timeperiods[parseInt(factory.Closing_Year)] = [returnDict];
                }
            }

            


            /** Get the product information for this factory & construct timeperiods
             * @constant { dict } productsTimeperiods - the changes in products produced for this factory in the format 
             *                                          { 'Title': "[Factory name] starts producing X.", 'Year': [Year started producing]}
             */
            const productsTimeperiods = await fetchFL(
                featureLayerServiceURLs['Product_Over_Time'],
                `Factory_ID = ${Factory_ID}`
            )
            .then(fl => { 
                return fl.map(d => { 
                    const thisStartDate = parseInt(d.attributes.Year_Started);

                    if(thisStartDate) {
                        const returnDict = { 
                            'Title': `${factory.English_Name} ${t('startsProducing')} ${String(d.attributes[`Product_${language}`]).toLowerCase()}.`,
                            'Color': circleColors['products']
                        }

                        if(timeperiods.hasOwnProperty(thisStartDate)) { 
                            timeperiods[thisStartDate].push(returnDict);
                        } else { 
                            timeperiods[thisStartDate] = [returnDict];
                        }
                    }
                }); 
            });

            /** Get the employment information for this factory & construct timeperiods
             * @constant { dict } employmentTimeperiods - the changes in employment rates for this factory in the format 
             *                                          { 'Title': "[Factory name] has X employees.", 'Year': [Year]}
             */
            const employmentTimeperiods = await fetchFL(
                featureLayerServiceURLs['Employment_Over_Time'],
                `Factory_ID = ${Factory_ID}`
            )
            .then(fl => { 
                return fl.map(d => { 
                    const thisYear = parseInt(d.attributes.Year);

                    if(thisYear) {
                        const returnDict = { 
                            'Title': `${factory.English_Name} ${t('has')} ${d.attributes.Employment} ${t('employees')}.`,
                            'Color': circleColors['employment']
                        }
                        
                        if(timeperiods.hasOwnProperty(thisYear)) { 
                            timeperiods[thisYear].push(returnDict);
                        } else { 
                            timeperiods[thisYear] = [returnDict];
                        }
                    }
                }); 
            })

            console.log(timeperiods);

            // Set the timeline params 
            setTimelineParams({ 
                'factory': factory, 
                'timeperiods': timeperiods
            });

            setTitle(factory.English_Name);       // Set the title as the english name
            setCoverPicURL(factory.coverPicURL);  // Set the cover img on the title     
            
            // Get all the images for the gallery
            fetchFL(featureLayerServiceURLs['Photo_Sources'], `Factory_ID = ${factory.Factory_ID}`)
            .then(fl => { setAllAttachments(fl.map(feature => { return feature.attributes; })); })
            .catch(error => {
                console.error(`Error fetching the images for the factory with ID ${Factory_ID}:`, error);
            })
        })
        .catch(error => {
            console.error('Error fetching details for factory:', error);
        });

        // Set the storymap on the page, if it exists 
        const thisStorymapURL = factoryStoryMapURLs[Factory_ID] ? factoryStoryMapURLs[Factory_ID][language] : null;
        if (thisStorymapURL) {
            removeTimeline = true;
            setStorymapURL(thisStorymapURL);
        }
    }, [languageSelected]);

    /* useEffect => Run after DOM loads - check if there's a storyboard for this factory
          - if there is a storyboard, then remove the grid and do nothing else
          - if there is not a storyboard, then keep the grid, populate it, and remove the storyboard element
    */
    useEffect(() => {
        const timelineContainer = document.getElementById('factory-timeline-container');    // Element for the grid 
        const storyboardContainer = document.getElementById('storyboard');          // Element for the storyboard

        // Conditional: if removeGrid and gridContainer exists, remove the grid and do nothing else 
        if (timelineContainer && removeTimeline) { 
            timelineContainer.remove();
        }
        // There is no storyboard - keep the timeline, remove the storyboard, and populate the timeline
        else if (storyboardContainer && !removeTimeline) { 
            storyboardContainer.remove();
        }

    }, [languageSelected]);

    return (
        <div className='factory-template-container'>
            {sessionStorage.getItem('hasSelectedLanguage') == 'false' ? <LanguageSelector /> : ''}
            <div><Sidebar isOpen={showSidebar}/></div>
            <div><Title title={ title } imgSrc={ coverPicURL }/></div>

            {/* Gallery container under the title */}
            <div className='f-gallery-container'>
                    <Gallery
                        key={Factory_ID}
                        Factory_ID={Factory_ID}
                        allAttachments={allAttachments}
                    />
            </div>

            {/* Grid container for basic factory details if applicable */}
            <div id='factory-timeline-container' className='factory-timeline-container'>

                <FactoryTimeline 
                    factory={factoryTimelineParams.factory} 
                    timeperiods={factoryTimelineParams.timeperiods}
                    products={factoryTimelineParams.products}
                    employment={factoryTimelineParams.employment}
                />
            </div>

            {/* ArcGIS storyboard for this factory if available */}
            <div className='sb-iframe-container'>
                <iframe 
                    id="storyboard"
                    className="storyboard-iframe" 
                    src={ storymapURL + '?cover=false' }
                    style={{ 
                        overflow: 'visible',
                        width: '100vw',
                    }}
                    width="100%" 
                    frameborder="0" 
                />
            </div>
            <div className='factory-template-footer'>
                <button className='factory-template-button' onClick={() => window.location.href = '/'}>{ t('goToHome') }</button>
                <button className='factory-template-button' onClick={() => window.location.href = '/'}>{ t('goToIndustrialSites') }</button>
                <button className='factory-template-button' onClick={() => window.location.href = '/'}>{ t('goToStories') }</button>
                <hr className='factory-template-footer-hr'></hr>
            </div>
        </div>
    );
}

export default BasicFactoryTemplate;