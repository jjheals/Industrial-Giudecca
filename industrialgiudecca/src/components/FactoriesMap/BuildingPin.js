import { useEffect  } from "react";

export const BuildingPin = ({id, factories, left, top}) => { 
    const markerWidthPx = 20;
    const markerHeightPx = 30;

    useEffect(() => {
        const pin = document.getElementById(`marker-${id}`);

         // Calculate the top margin of the timeline in pixels
        // NOTE: vh in the below formula is the margin in VH
        const marginVH = 5;  // Margin in VH
        const marginPx = (marginVH * window.innerHeight) / 50;

        
        if(pin) { 
            factories.map((factory, idx) => { 
                const fid = factory.Factory_ID;

                const popupElm = document.createElement('div'); // Create a new div element for the popup
                popupElm.className = 'pin-popup';               // Set the class name
                popupElm.id = `popup-${fid}`;
                popupElm.style.display = 'none';                // Hide the popup initially
                popupElm.textContent = factory.English_Name;    // Set the text content of the popup
                
                // Calculate the tooltip position
                const popupLeft = left + (markerWidthPx / 2);
                const popupTop = top + (idx * 30);       
    
                popupElm.style.left = `${popupLeft}px`;
                popupElm.style.top = `calc(${popupTop}px + ${marginPx}px - ${markerHeightPx * 4}px - ${window.innerHeight}px)`;
                popupElm.style.width = '7vw';
                popupElm.style.zIndex = '2';

                // Append the popup element to the document body
                document.getElementById(`pin-container-${id}`).appendChild(popupElm);
                
                // Event listeners to show/hide popups on hover
                // Show the factory name tooltip on mouseover
                pin.addEventListener('mouseover', () => {
                    document.getElementById(`popup-${fid}`).style.display = 'block';
                });
    
                // Hide the factory name tooltip on mouseout
                pin.addEventListener('mouseout', () => { 
                    document.getElementById(`popup-${fid}`).style.display= 'none'; 
                });
            });
        }
            
        
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