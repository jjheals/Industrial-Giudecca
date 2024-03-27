import { useEffect } from 'react';

export const useLockScroll = (ref, startYear, endYear, setYear) => {

    useEffect(() => {
        const handleWheel = (e) => {

            if (ref.current) {
                const { top, bottom } = ref.current.getBoundingClientRect();
                const margin = 15;

                if(top + margin >= 0 && bottom - margin <= window.innerHeight) {
                    e.preventDefault();
                                        
                    // Control the scroll speed in both directions
                    const scrollFactor = 0.4;                                       // DECREASE => SLOWER
                    const direction = e.deltaY > 0 ? scrollFactor : -scrollFactor;  // Set the scroll speed 

                    // Calculate the year
                    setYear((prevYear) => {
                        const newYear = prevYear + direction; 

                        // Check if the scroll is up or down
                        if (newYear >= startYear && newYear <= endYear) return newYear;  // Scroll is "down" (increase year)  
                        else return prevYear;                                            // Scroll is "up" (decrease year)
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
