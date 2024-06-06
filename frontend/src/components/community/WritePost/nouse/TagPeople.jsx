import React, { useState } from "react";
import { Form, InputGroup, Badge } from "react-bootstrap";
import SuggestionsList from "./SuggestionsList";

const DUMMY_DATA = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

const TagPeople = ({ taggedUsers, setTaggedUsers }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input) {
      const filteredSuggestions = DUMMY_DATA.filter(
        (user) =>
          user.name.toLowerCase().includes(input.toLowerCase()) &&
          !taggedUsers.some((taggedUser) => taggedUser.id === user.id)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectUser = (user) => {
    setTaggedUsers((prev) => [...prev, user]);
    setQuery("");
    setSuggestions([]);
  };

  const handleRemoveUser = (user) => {
    setTaggedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <Form.Group controlId="formPeopleTag" className="tw-relative">
      <Form.Label>Tag People</Form.Label>
      <div className="tw-relative tw-flex tw-items-center tw-flex-wrap tw-border tw-border-gray-300 tw-rounded tw-p-2 tw-w-full">
        {taggedUsers.map((user) => (
          <Badge
            key={user.id}
            pill
            variant="primary"
            onClick={() => handleRemoveUser(user)}
            className="tw-bg-blue-500 tw-text-white tw-m-1 tw-p-2 tw-rounded-md tw-cursor-pointer"
          >
            {user.name} <span>&times;</span>
          </Badge>
        ))}
        <InputGroup className="tw-flex-grow">
          <Form.Control
            type="text"
            placeholder="Type a name..."
            value={query}
            onChange={handleInputChange}
            className="tw-border-none tw-outline-none tw-p-0 tw-m-0 tw-w-full tw-flex-grow"
            style={{ flex: "1 0 auto" }}
          />
        </InputGroup>
      </div>
      {suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          onSelectUser={handleSelectUser}
        />
      )}
    </Form.Group>
  );
};

export default TagPeople;
