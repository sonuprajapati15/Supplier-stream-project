import React from "react";
import "../styles/suggestionlist.css";
export default function SuggestionList({ suggestions, onSelect }) {
  return (
    <ul className="eg-suggestion-list">
      {suggestions.map((suggestion, idx) => (
        <li key={idx} onMouseDown={() => onSelect(suggestion.name)}>
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
}