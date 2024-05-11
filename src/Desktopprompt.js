import React, { useState, useEffect } from 'react';
import './desktop.css';  // Importing the CSS for styling

const DesktopViewPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsVisible(true);  // Show prompt on mobile devices
            } else {
                setIsVisible(false);  // Hide prompt on desktops
            }
        };

        // Call the function on component mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        isVisible && (
            <div className="desktop-view-prompt">
                For the best experience, please use a desktop device.
            </div>
        )
    );
};

export default DesktopViewPrompt;
