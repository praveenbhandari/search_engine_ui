import React, { useState, useEffect } from 'react';
import './desktop.css';  // Importing the CSS for styling

const DesktopViewPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth <= 768);  // Condition to display the notification
        };

        handleResize();  // Check immediately on load
        window.addEventListener('resize', handleResize);  // Add resize listener

        return () => window.removeEventListener('resize', handleResize);  // Cleanup
    }, []);

    if (!isVisible) {
        return null;  // Return null to render nothing when the condition is not met
    }

    return (
        <div className="full-screen-prompt">
            For the best experience, please use a desktop device.
        </div>
    );
};

export default DesktopViewPrompt;
