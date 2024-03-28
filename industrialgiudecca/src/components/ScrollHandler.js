import { useEffect } from 'react';

export const useLockScroll = (ref, startYear, endYear, setYear) => {

    useEffect(() => {
        const handleWheel = (e) => {

            if (ref.current) {
                const { top, bottom } = ref.current.getBoundingClientRect();
                const margin = 50;

                if(top + margin >= 0 && bottom - margin <= window.innerHeight) {
                    e.preventDefault();
                                        
                    // Control the scroll speed in both directions
                    const scrollFactor = 0.4;                                       // DECREASE => SLOWER
                    const direction = e.deltaY > 0 ? scrollFactor : -scrollFactor;  // Set the scroll speed 

                    // Calculate the year
                    setYear((prevYear) => {
                        const newYear = prevYear + direction; 

                        // Scroll is "down" (increase year)  
                        if (newYear >= startYear && newYear <= endYear) return newYear; 
                        
                        // We are at the end, so remove the event listener to unlock scroll
                        else if (newYear >= endYear) {
                            window.removeEventListener('wheel', handleWheel);

                            // Return the newYear as the last year to show on the screen
                            return newYear;
                        }

                        // Scroll is "up" (decrease year)
                        else return prevYear;                                            
                    });
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [ref, startYear, endYear, setYear]);
};
