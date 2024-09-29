import React from "react";

const FilterSection = ({ filters, onFilterChange, isPending }) => {

  if (isPending) { return <div className="text-center text-gray-500">Cargando...</div>; }

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.key} className="mb-4">
          <label className="block mb-2">{filter.label}</label>
          {filter.type === "text" && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === "select" && (
            <select
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
