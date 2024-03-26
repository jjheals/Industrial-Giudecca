import { useEffect } from 'react';

export const useLockScroll = (ref, startYear, endYear, setYear) => {
    useEffect(() => {
        const handleWheel = (e) => {
            if (ref.current) {
                const { top, bottom } = ref.current.getBoundingClientRect();
                const isInView = top >= 0 && bottom <= window.innerHeight;
                if (isInView) {
                    e.preventDefault();
                    const direction = e.deltaY > 0 ? 1 : -1;
                    setYear((prevYear) => {
                        const newYear = prevYear + direction;
                        if (newYear >= startYear && newYear <= endYear) {
                            return newYear;
                        }
                        return prevYear;
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
