import React from "react";
import { useSpring, animated } from "react-spring";
import LocationIcon from "./LocationIcon"; // Adjust the path as needed

const LocationItem = ({ location, index, hoveredIndex, setHoveredIndex }) => {
  const hoverStyle = useSpring({
    transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
    backgroundColor: hoveredIndex === index ? "#e0f7fa" : "#fff", // Brighter color for better visibility
    config: { tension: 220, friction: 120 },
  });

  return (
    <animated.div
      style={hoverStyle}
      className="tw-mb-2 tw-p-2 tw-border tw-border-gray-300 tw-rounded tw-flex tw-items-center"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <LocationIcon type={location.type} />
      <div>
        <div className="tw-font-bold">{location.name}</div>
        <div className="tw-text-sm tw-text-gray-600">{location.address}</div>
      </div>
    </animated.div>
  );
};

export default LocationItem;
