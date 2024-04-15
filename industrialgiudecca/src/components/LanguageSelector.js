import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';


const LanguageSelector = () => {
    const { i18n } = useTranslation();
    let preferredLanguageSet = false;   // Flag to render the component or not

    const languages = [
        { code: "en", lang: "English" },
        { code: "it", lang: "Italian" },
    ];

    /** handleLanguageChange = (selectedLanguage)
     * @abstract Handles changing the language, i.e. setting the preferredLanguage cookie and changing it in browser
     * @param { String } selectedLanguage 
     */
    const handleLanguageChange = (selectedLanguage) => {
    // Store the language preference in a cookie
    Cookies.set('preferredLanguage', selectedLanguage, { expires: 180 }); // expires in 180 days
    i18n.changeLanguage(selectedLanguage);
    };
    
    // useEffect => check for a stored prefferedLanguage in the browser's cookies and act accordingly
    useEffect(() => {
        // Check if the language cookie exists, and if it does, set the preferred languge to that
        const storedLanguage = Cookies.get('preferredLanguage');

        if(storedLanguage) { 
            // If the language was found in cookies, just log and move on
            preferredLanguageSet = true;
            console.log("Current language (from cookies):", i18n.language);
            i18n.changeLanguage(storedLanguage);
        } else { 
            // If the language was not found in cookies, prompt the user to select a language 
            preferredLanguageSet = false;
        }
        
    }, [i18n.language]);

    if(!preferredLanguageSet) { 
        return (
            <div className="btn-container">
                {languages.map((lng) => (
                    <button
                        className={lng.code === i18n.language ? "selected" : ""}
                        key={lng.code}
                        onClick={() => handleLanguageChange(lng.code)}
                    >
                        {lng.lang}
                    </button>
                ))}
            </div>
        );
    } else { 
        return null;
    }
    
};

export default LanguageSelector;