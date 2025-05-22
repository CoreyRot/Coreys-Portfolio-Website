import React, { useRef, useEffect } from "react";
import "../../styles/components/tiles/Services.css";

const Services = () => {
  const scrollRef = useRef(null);

  // Services data matching the image
  const servicesList = [
    {
      title: "Frontend Development",
    },
    {
      title: "WordPress Development",
    },
    {
      title: "Full Stack Development",
    },
    {
      title: "UI/UX Design",
    },
    {
      title: "Plugin Development",
    },
    {
      title: "E-Commerce Development",
    },
    {
      title: "Maintenance & Support",
    }
  ];
  
  // Add smooth scrolling polyfill for Safari
  useEffect(() => {
    // Check if the browser supports smooth scrolling
    if (typeof CSS !== 'undefined' && CSS.supports && 
        !CSS.supports('scroll-behavior', 'smooth')) {
      // If smooth scrolling is not supported, load polyfill
      import('smoothscroll-polyfill').then(smoothscroll => {
        smoothscroll.polyfill();
      }).catch(err => {
        console.warn('Smooth scroll polyfill could not be loaded', err);
      });
    }
    
    // Add passive touch listeners for better performance on mobile
    if (scrollRef.current) {
      const options = { passive: true };
      const element = scrollRef.current;
      
      element.addEventListener('touchstart', () => {}, options);
      element.addEventListener('touchmove', () => {}, options);
      
      return () => {
        element.removeEventListener('touchstart', () => {}, options);
        element.removeEventListener('touchmove', () => {}, options);
      };
    }
  }, []);

  return (
    <div className="content">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Services</h2>
        </div>
        
        <div className="services-scroll-container">
          {/* Fallback for older browsers that don't support grid */}
          <div className="services-row-fallback">
            <div 
              className="services-row" 
              ref={scrollRef}
              role="list"
              aria-label="Services offered"
            >
              {servicesList.map((service, index) => (
                <div 
                  className="service-card" 
                  key={index}
                  tabIndex="0"
                  role="listitem"
                  aria-label={service.title}
                >
                  <h4 className="service-title">{service.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;