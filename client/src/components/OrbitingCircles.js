import React from 'react';

const OrbitingCircles = ({
  children,
  reverse = false,
  duration = 20,
  radius = 160,
  angle = 72,
  iconSize = 40,
  speed = 1.8,
}) => {
  const calculatedDuration = duration / speed;

  return (
    <div className="orbiting-circles-container">
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        const orbitStyle = {
          '--duration': `${calculatedDuration}s`,
          '--radius': `${radius}px`,
          '--angle': `${angle}deg`,
          '--icon-size': `${iconSize}px`,
        };

        return (
          <div
            className={`orbiting-circle ${reverse ? 'reverse' : ''}`}
            style={orbitStyle}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default OrbitingCircles;
