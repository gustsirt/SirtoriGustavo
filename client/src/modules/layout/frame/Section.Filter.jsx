import React, { useState, useEffect } from "react";
import { BiSolidPlusSquare } from 'react-icons/bi';

// Subcomponentes
import ElementList from "./SectionWFilter/Elements";
import FilterSection from "./SectionWFilter/Filters";
import ActionModal from "./ActionModal";

const SectionWFilters = ({
  title,
  data,
  isFilterPending, 
  isElementPending, 
  config
  }) => {

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
          filtered = filtered.filter((item) => {
            const itemValue = item[filterKey];
            
            // Comparamos los valores directamente sin usar toLowerCase
            return itemValue && itemValue.includes(filterValue);
          });
        }
      });
      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, data]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold mb-2">{title}</h2>
        <ActionModal 
          title={"Agregar nuevo elemento"}
          fields={config.fields}
          functionApi={config.actions.postApi}
        >
          Contribuir<BiSolidPlusSquare className="ml-2" />
        </ActionModal>
      </div>
      <div className="flex">
        {/* Sección de filtros */}
        <div className="w-1/4 p-4 border-r border-gray-200">
          <FilterSection filters={config.filters} onFilterChange={handleFilterChange} isPending={isFilterPending}/>
        </div>

        {/* Sección de elementos */}
        <div className="w-3/4 p-4">
          <ElementList data={filteredData} config={config} isPending={isElementPending}/>
        </div>
      </div>
    </>
  );
};

export default SectionWFilters;