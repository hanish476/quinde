import React, { useState, useEffect } from 'react'
const FlyingBee = ({ direction = 1, speed = 0.5, verticalOffset = 0, onBeePass = null }) => {
    const [position, setPosition] = useState({ 
        x: window.innerWidth / 2 , // Start from center
        y: 50 + verticalOffset 
    });
    const [wingsFlap, setWingsFlap] = useState(0);
    const [hasStarted, setHasStarted] = useState(false); // Prevent initial center confetti

    useEffect(() => {
        // Move bee from center to edges
        const moveInterval = setInterval(() => {
            setPosition(prev => {
                let newX = prev.x + (direction * speed);
                let newY = prev.y + Math.sin(prev.x / 50) * 0.3; // Gentle wave motion
                
                // Notify when bee passes center (only after initial setup)
                if (hasStarted && onBeePass && 
                    ((direction === 1 && prev.x < window.innerWidth / 2 && newX >= window.innerWidth / 2) ||
                     (direction === -1 && prev.x > window.innerWidth / 2 && newX <= window.innerWidth / 2))) {
                    onBeePass(newX, newY);
                }
                
                // Change direction at screen edges (for continuous loop)
                if (direction === 1 && newX > window.innerWidth + 100) {
                    setHasStarted(false); // Reset for next cycle
                    return { x: window.innerWidth / 2, y: 50 + verticalOffset };
                } else if (direction === -1 && newX < -100) {
                    setHasStarted(false); // Reset for next cycle
                    return { x: window.innerWidth / 2, y: 50 + verticalOffset };
                }
                
                // Mark as started after first movement
                if (!hasStarted) {
                    setHasStarted(true);
                }
                
                return { x: newX, y: newY };
            });
        }, 30);

        // Animate wings
        const flapInterval = setInterval(() => {
            setWingsFlap(prev => (prev + 1) % 2);
        }, 100);

        return () => {
            clearInterval(moveInterval);
            clearInterval(flapInterval);
        };
    }, [direction, speed, verticalOffset, onBeePass, hasStarted]);

    const beeStyle = {
        position: 'fixed',
        top: `${position.y}vh`,
        left: `${position.x}px`,
        transform: `scaleX(${direction})`, // Flip based on direction
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'none'
    };

    return (
        <div style={beeStyle}>
            <svg 
                width="40" 
                height="24" 
                viewBox="0 0 40 24"
                className="drop-shadow-lg"
            >
                {/* Bee Body */}
                <ellipse cx="20" cy="12" rx="12" ry="6" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
                
                {/* Bee Stripes */}
                <rect x="16" y="7" width="2" height="10" fill="#DAA520"/>
                <rect x="22" y="7" width="2" height="10" fill="#DAA520"/>
                
                {/* Head */}
                <circle cx="30" cy="12" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
                
                {/* Eyes */}
                <circle cx="31" cy="10" r="1" fill="#000"/>
                <circle cx="33" cy="11" r="1" fill="#000"/>
                
                {/* Antennae */}
                <line x1="31" y1="8" x2="30" y2="5" stroke="#000" strokeWidth="1"/>
                <line x1="33" y1="8" x2="34" y2="5" stroke="#000" strokeWidth="1"/>
                
                {/* Wings */}
                <g transform={`translate(20, 8) scale(1, ${wingsFlap ? 1 : 0.9})`}>
                    <ellipse cx="-2" cy="-2" rx="6" ry="3" fill="#E6E6FA" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.8"/>
                    <ellipse cx="-2" cy="0" rx="6" ry="3" fill="#F8F8FF" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.6"/>
                </g>
                <g transform={`translate(20, 14) scale(1, ${wingsFlap ? 1 : 0.9})`}>
                    <ellipse cx="-2" cy="-2" rx="6" ry="3" fill="#E6E6FA" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.8"/>
                    <ellipse cx="-2" cy="0" rx="6" ry="3" fill="#F8F8FF" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.6"/>
                </g>
            </svg>
        </div>
    );
};

export default FlyingBee;