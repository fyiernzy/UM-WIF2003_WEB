import React from "react";
import { Button } from "react-bootstrap";

const LocationButton = ({ handleShowLocationModal }) => (
  <div className="tw-mb-4">
    <Button
      variant="outline-secondary"
      className="tw-mr-2"
      onClick={handleShowLocationModal}
    >
      Add Location
    </Button>
  </div>
);

export default LocationButton;
