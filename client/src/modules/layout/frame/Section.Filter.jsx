import React, { useState, useEffect } from "react";

// Subcomponentes
import ElementList from "./SectionWFilter/Elements";
import FilterSection from "./SectionWFilter/Filters";

const SectionWFilters = ({ data, filters, Card }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [activeFilters, setActiveFilters] = useState({});

  // Maneja cambios en los filtros
  const handleFilterChange = (filterKey, filterValue) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
  };

  // Filtra los datos cada vez que los filtros cambian
  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      Object.keys(activeFilters).forEach((filterKey) => {
        const filterValue = activeFilters[filterKey];
        if (filterValue) {
          filtered = filtered.filter((item) =>
            item[filterKey]?.toLowerCase().includes(filterValue.toLowerCase())
          );
        }
      });
      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, data]);

  return (
    <div className="flex">
      {/* Sección de filtros */}
      <div className="w-1/4 p-4 border-r border-gray-200">
        <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Sección de elementos */}
      <div className="w-3/4 p-4">
        <ElementList data={filteredData} Card={Card} />
      </div>
    </div>
  );
};

export default SectionWFilters;