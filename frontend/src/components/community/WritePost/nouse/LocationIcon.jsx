import React from "react";
import { FaMapMarkerAlt, FaUtensils, FaHotel } from "react-icons/fa";

const LocationIcon = ({ type }) => {
  switch (type) {
    case "city":
      return <FaMapMarkerAlt className="tw-text-lg tw-mr-2" />;
    case "restaurant":
      return <FaUtensils className="tw-text-lg tw-mr-2" />;
    case "hotel":
      return <FaHotel className="tw-text-lg tw-mr-2" />;
    default:
      return <FaMapMarkerAlt className="tw-text-lg tw-mr-2" />;
  }
};

export default LocationIcon;
