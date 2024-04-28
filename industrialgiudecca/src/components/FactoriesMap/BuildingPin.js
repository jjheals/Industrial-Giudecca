import { useEffect  } from "react";

export const BuildingPin = ({id, factories, left, top}) => { 
    const markerWidthPx = 20;
    const markerHeightPx = 30;

    useEffect(() => {
        const pin = document.getElementById(`marker-${id}`);

        // Create the popup div element to contain the popups for this building
        const popupDivElm = document.createElement('div');
        popupDivElm.className = 'bpopup-div';
        popupDivElm.id = `bpopup-div-${id}`;

        // Add a link from the popupDivElm to the page for that factory
        popupDivElm.addEventListener('click', () => { window.location.href = `/industrial-sites/${id}`});

        // Iterate over the factories and create the elements to display on the sidebar
        // NOTE: factoires.reverse() to display them in order of most recent to least recent 
        factories.reverse().map(factory => { 
            const thisFactoryContainer = document.createElement('div');
            thisFactoryContainer.className = 'bpopup-factory-container';
            thisFactoryContainer.id = `bpopup-factory-container-${factory.Factory_ID}`;

            const infoContainerElm = document.createElement('div');
            infoContainerElm.className = 'bpopup-info-container';
            infoContainerElm.id = `bpopup-info-container-${id}`;

            // yearElm => element with the year bolded above the name
            const yearElm = document.createElement('div');
            yearElm.className = 'bpopup year';
            yearElm.id = `bpopup-${factory.Factory_ID}`;

            // Set the closing year to "present" if the factory is still active
            let closingYear = factory.Closing_Year;
            if(closingYear == 9999) closingYear = 'Present';
            yearElm.textContent = `(${factory.Opening_Year} to ${closingYear})`;
            
            // nameElm => text containing the factory name 
            const nameElm = document.createElement('p');
            nameElm.className = 'bpopup name-text';
            nameElm.textContent = factory.English_Name;
            
            // imgElm => image for the factory
            const imgElm = document.createElement('img');
            imgElm.className = 'bpopup-img';
            imgElm.id = `bpopup-img-${factory.Factory_ID}`;
            imgElm.src = factory.coverPicURL;

            infoContainerElm.appendChild(yearElm);                // Append the year elm to the info container
            infoContainerElm.appendChild(nameElm);                // Append the name text to the info container
            thisFactoryContainer.appendChild(infoContainerElm);   // Append the info container to the factory container
            thisFactoryContainer.appendChild(imgElm);             // Append the img elm to the factory container 
            popupDivElm.appendChild(thisFactoryContainer);        // Append the factory container to the popup div
        });

        // Append the popup div to the side container
        document.getElementById('all-popup-divs-container').appendChild(popupDivElm);
        
    }, []);

    return(
        <div id={`pin-container-${id}`}>
            <img className='building-pin'
             id={`marker-${id}`}
             src='pin-icon-2.png'
             style={{
                top: `calc(${top - markerHeightPx}px - ${window.innerHeight}px)`,
                left: `${left - (markerWidthPx / 2)}px`,
                width: markerWidthPx,
                height: markerHeightPx
             }}
            >
            </img>
                
        </div>
    );

}