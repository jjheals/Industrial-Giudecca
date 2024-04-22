import { useEffect  } from "react";

export const FactoryPin = ({id, name, left, top}) => { 
    const markerWidthPx = 20;
    const markerHeightPx = 30;

    useEffect(() => {
        const pin = document.getElementById(`marker-${id}`);

        if(pin) { 
            // Create the tooltip element
            const tooltip = document.createElement('div');  // Create element
            tooltip.className = 'factory-tooltip';          // Set class name
            tooltip.style.display = 'none';                 // IMPORTANT: hide by default

            // Event listeners to show/hide popups on hover
            // Show the factory name tooltip on mouseover
            pin.addEventListener('mouseover', () => {
                tooltip.textContent = name; 
                tooltip.style.display = 'block';

                // Calculate the tooltip position
                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;
                const tooltipLeft = left - (tooltipWidth / 2) + (markerWidthPx / 2);
                const tooltipTop = top - tooltipHeight - 10; // Adjust the vertical position as needed

                tooltip.style.left = `${tooltipLeft}px`;
                tooltip.style.top = `calc(${tooltipTop}px - ${markerHeightPx * 4}px)`;
            });

            // Hide the factory name tooltip on mouseout
            pin.addEventListener('mouseout', () => { tooltip.style.display = 'none'; });


            // Event listener to redirect to another page on marker click
            pin.addEventListener('click', () => {
                window.location.href = `/industrial-sites/${id}`;
            });
        }
        
    });

    return(
        <img className='factory-pin hidden'
             id={`marker-${id}`}
             src='pin-icon-2.png'
             style={{
                top: `${top- markerHeightPx * 1.5}px`,
                left: `${left - (markerWidthPx / 2)}px`,
                width: markerWidthPx,
                height: markerHeightPx,
                display: 'none'
             }}
            >

        </img>
    );

}