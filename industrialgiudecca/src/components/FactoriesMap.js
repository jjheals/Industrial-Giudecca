/**
 * The FactoriesMap component is responsible for rendering a map with factory markers.
 * It receives an array of factories, a callback function for marker clicks, and a search term.
 *
 * @param {Object[]} factories - An array of factory objects containing factory data.
 * @param {Function} onMarkerClick - A callback function to handle marker click events.
 * @param {string} searchTerm - The current search term used for filtering factories.
 *
 * @returns {JSX.Element} - The rendered FactoriesMap component.
 */
const FactoriesMap = ({ factories, onMarkerClick, searchTerm }) => {
    // Refs for accessing DOM elements
    const pageRef = useRef(null);
    const mapContainerRef = useRef(null);
    const clickedMarkerRef = useRef(null);

    // Calculate the top margin of the timeline in pixels based on a margin in VH
    const marginVH = 5;
    const marginPx = (marginVH * window.innerHeight) / 50;

    /**
     * Highlights a marker by adding the 'highlighted' class and setting its z-index to 1.
     *
     * @param {HTMLElement} marker - The marker element to highlight.
     */
    const highlightMarker = (marker) => {
        marker.classList.add('highlighted');
        marker.style.zIndex = '1';
    };

    /**
     * Unhighlights a marker by removing the 'highlighted' class and setting its z-index to 0,
     * unless it is the currently clicked marker.
     *
     * @param {HTMLElement} marker - The marker element to unhighlight.
     */
    const unhighlightMarker = (marker) => {
        if (marker !== clickedMarkerRef.current) {
            marker.classList.remove('highlighted');
            marker.style.zIndex = '0';
        }
    };

    /**
     * Handles a marker click event by updating the clicked marker's style and storing a reference to it.
     *
     * @param {HTMLElement} marker - The marker element that was clicked.
     */
    const clickMarker = (marker) => {
        if (clickedMarkerRef.current) {
            clickedMarkerRef.current.classList.remove('clicked');
            clickedMarkerRef.current.style.zIndex = '0';
        }

        marker.classList.add('clicked');
        marker.style.zIndex = '2';
        clickedMarkerRef.current = marker;
    };

    // Effect hook to render markers on the map when factories, onMarkerClick, or searchTerm change
    useEffect(() => {
        if (factories.length > 0 && mapContainerRef.current) {
            mapContainerRef.current.innerHTML = ''; // Clear previous markers

            factories.map(factory => {
                // If this factory does not have a location, hide it from the map
                if (!factory.x || !factory.y) return;
                else {
                    // Create the marker element and set its attributes
                    const markerWidthPx = 20;
                    const markerHeightPx = 30;
                    const marker = document.createElement('img');

                    marker.className = 'fhp-factory-pin';
                    marker.id = `${factory.Factory_ID}-marker`;
                    marker.src = 'pin-icon-2.png';
                    marker.style.left = `${factory.x - (markerWidthPx / 2)}px`;
                    marker.style.top = `calc(${factory.y}px + 65vh)`;
                    marker.style.zIndex = '0';

                    // Event listeners for marker interactions
                    marker.addEventListener('click', () => {
                        onMarkerClick(factory.Factory_ID);
                        clickMarker(marker);
                    });

                    marker.addEventListener('mouseover', () => {
                        highlightMarker(marker);
                    });

                    marker.addEventListener('mouseout', () => {
                        unhighlightMarker(marker);
                    });

                    // Add the marker to the map overlay
                    mapContainerRef.current.appendChild(marker);
                }
            });
        }
    }, [factories, onMarkerClick, searchTerm]);

    // Effect hook to reset the clicked marker when the search term changes
    useEffect(() => {
        if (searchTerm) {
            if (clickedMarkerRef.current) {
                clickedMarkerRef.current.classList.remove('clicked');
                clickedMarkerRef.current.style.zIndex = '0';
                clickedMarkerRef.current = null;
            }
        }
    }, [searchTerm]);

    return (
        <div ref={pageRef} className='fhp-map-container'>
            <div className='fhp-giudecca-map' style={{ width: '100%', height: '100%' }}>
                {/* Container for map image */}
                <img
                    src="giudecca-map.png"
                    className='fhp-giudecca-map-img'
                    alt="Map"
                    style={{ height: window.innerHeight }}
                />

                {/* Overlayed container for factory pins */}
                <div
                    ref={mapContainerRef}
                    className='fhp-map-container'
                    style={{ height: window.innerHeight }}
                ></div>
            </div>
        </div>
    );
};

export default FactoriesMap;