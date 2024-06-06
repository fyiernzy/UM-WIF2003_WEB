import React from "react";
import PropTypes from "prop-types";

const SuggestionsList = ({ suggestions, onSelectUser }) => {
  return (
    <ul
      className="tw-absolute tw-z-10 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded mt-1 tw-max-h-60 tw-overflow-y-auto tw-shadow-sm"
      style={{ marginTop: "2.5rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      {suggestions.map((user) => (
        <li
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="tw-p-2 hover:tw-bg-gray-100 tw-cursor-pointer"
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
};

SuggestionsList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};

export default SuggestionsList;
