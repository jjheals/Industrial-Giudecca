// src/components/MapTimelineLockScroll.js

/** { Component } MapTimelineLockScroll
 * 
 * @abstract ScrollHandler handles the locking/unlocking of the scroll for the picture timeline on the homepage/landing page.
 * @param { Ref } ref - PageRef
 * @param { int } startYear - The minimum year on the timeline
 * @param { int } endYear - The maximum (final) year on the timeline
 * @param { int } setYear - Current year on the timeline 
 * 
 */
import { useEffect } from 'react';

export const MapTimelineLockScroll = (ref, thresh, startYear, endYear, setYear, timelineTop) => {

    useEffect(() => {
        const handleWheel = (e) => {
            if (ref.current) {
                const top = ref.current.getBoundingClientRect().top;
                const margin = 50;
                
                if(top - margin <= thresh) {
                    window.scrollTo(0, timelineTop);
                    e.preventDefault();

                    // Control the scroll speed in both directions
                    const scrollFactor = 0.7;                                       // DECREASE => SLOWER
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
