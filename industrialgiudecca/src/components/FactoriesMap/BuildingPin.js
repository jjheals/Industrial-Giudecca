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

        // Iterate over the factories and create the elements to display on the sidebar
        // NOTE: factoires.reverse() to display them in order of most recent to least recent 
        factories.reverse().map(factory => { 

            // yearElm => element with the year bolded above the name
            const yearElm = document.createElement('div');
            yearElm.className = 'bpopup year';
            yearElm.id = `bpopup-${factory.Factory_ID}`;

            // Set the closing year to "present" if the factory is still active
            let closingYear = factory.Closing_Year;
            if(closingYear == 9999) closingYear = 'Present';
            yearElm.textContent = `(${factory.Opening_Year} to ${closingYear})`;

            // nameRow => row below the year containing the name and image
            const nameRow = document.createElement('div');
            nameRow.className = 'bpopup name-row';
            nameRow.id = `bpopup-${factory.Factory_ID}`;
            
            // nameElm => text containing the factory name 
            const nameElm = document.createElement('p');
            nameElm.className = 'bpopup name-text';
            nameElm.textContent = factory.English_Name;
            

            // imgElm => image for the factory
            const imgElm = document.createElement('img');
            imgElm.className = 'bpopup-img';
            imgElm.id = `bpopup-img-${factory.Factory_ID}`;
            imgElm.src = factory.coverPicURL;

            nameRow.appendChild(nameElm);       // Append the name text to the name row
            nameRow.appendChild(imgElm);        // Append the image to the name row
            popupDivElm.appendChild(yearElm);   // Append the year to the name row
            popupDivElm.appendChild(nameRow);   // Append the entire popup div to the name row
        });

        // Append the popup div to the side container
        document.getElementById('all-popup-divs-container').appendChild(popupDivElm);

        // Event listeners to show/hide popups on hover
        // Show the factory name tooltip on mouseover
        pin.addEventListener('mouseover', () => {
            document.getElementById(`bpopup-div-${id}`).style.display = 'flex';
        });

        // Hide the factory name tooltip on mouseout
        pin.addEventListener('mouseout', () => { 
            document.getElementById(`bpopup-div-${id}`).style.display= 'none'; 
        });    
        
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