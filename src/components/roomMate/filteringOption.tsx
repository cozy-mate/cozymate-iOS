import React, { useState } from 'react';
import { FlatList } from 'react-native';

import FilteringModalItem from './filteringModalItem';

import { useDetailFilterListStore } from '@zustand/member-stat/member-stat';





interface FilteringOptionProps {
  selectedFilter: string;
}

const FilteringOption: React.FC<FilteringOptionProps> = ({ selectedFilter }) => {
  const { setDetailFilterList } = useDetailFilterListStore();
  

  const selectedItems = filterDetailItem.find((item) => item[selectedFilter]);



  const handleDetailSelect = (filterKey: string, item: any) => {
    setFilterDetailItem((prevList) =>
      prevList.map((filter) => {
        if (filterKey in filter) {
          return {
            ...filter,
            [filterKey]: filter[filterKey].map((detail) =>
              detail.index === item.index ? { ...detail, select: !detail.select } : detail,
            ),
          };
        }
        return filter;
      }),
    );

    // Update selected values in selectedValueList
    setDetailFilterList((prevSelected) => {
      const updatedList = { ...prevSelected };
      if (!updatedList[filterKey]) {
        updatedList[filterKey] = [];
      }

      // Toggle the select value
      if (item.select) {
        updatedList[filterKey] = updatedList[filterKey].filter((value) => value !== item.value);
      } else {
        updatedList[filterKey].push(item.value);
      }

      return updatedList;
    });
  };

  return (
    
  );
};

export default FilteringOption;
