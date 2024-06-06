import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import LocationItem from "./LocationItem"; // Adjust the path as needed

const locations = [
  {
    name: "Johor Bahru",
    address: "79xxx to 81xxx Johor Bahru, Johor, Malaysia",
    type: "city",
  },
  {
    name: "Beauty in The Pot Johor",
    address:
      "02-01, Wisma Oka, Jalan Setia Tropika 1/21, Setia Tropika, 81200 Johor Bahru, Johor, Malaysia",
    type: "restaurant",
  },
  {
    name: "Unique One Cafe",
    address:
      "No 18, jalan molek 2/1, taman molek, 81100 Johor Bahru, Johor, Malaysia",
    type: "restaurant",
  },
  {
    name: "Gazipur",
    address: "Gazipur, Dhaka Division, Bangladesh",
    type: "city",
  },
  { name: "Kuala Lumpur", address: "Kuala Lumpur, Malaysia", type: "city" },
  {
    name: "China Press Johor",
    address:
      "81, Jalan Maju, Taman Tebrau Jaya, 80400 Johor Bahru, Johor, Malaysia",
    type: "office",
  },
  { name: "Bangkok", address: "Bangkok, Thailand", type: "city" },
];

function LocationSearchModal({ show, handleClose }) {
  const [search, setSearch] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search for location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="locationSearch">
            <Form.Control
              type="text"
              placeholder="Where are you?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tw-mb-4"
            />
          </Form.Group>
          <div className="location-results">
            {locations
              .filter((location) =>
                location.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((location, index) => (
                <LocationItem
                  key={index}
                  location={location}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LocationSearchModal;
