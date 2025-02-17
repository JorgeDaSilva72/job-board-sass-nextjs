"use client";
import { useState } from "react";

export function MultiSelect({ options, selected, onChange, placeholder }) {
  const [selectedItems, setSelectedItems] = useState(selected || []);

  const handleSelect = (value) => {
    const newSelected = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];
    setSelectedItems(newSelected);
    onChange(newSelected);
  };

  return (
    <div>
      <select multiple>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
