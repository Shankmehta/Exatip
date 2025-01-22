import React, { useState } from 'react';
// import { debounce } from '../../utils/debounce';

interface FilterBarProps {
  onFilter: (sno?: number, sname?: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [filterSno, setFilterSno] = useState('');
  const [filterName, setFilterName] = useState('');

  // const debouncedFilter = debounce(() => {
  //   onFilter(
  //     filterSno ? parseInt(filterSno) : undefined,
  //     filterName || undefined
  //   );
  // }, 2000);

  return (
    <div className="bg-white/80 p-4 rounded-lg shadow-lg mb-6 flex gap-4 flex-wrap">
      <input
        type="number"
        placeholder="Filter by Student No"
        value={filterSno}
        onChange={(e) => {
          setFilterSno(e.target.value);
          // debouncedFilter();
        }}
        className="flex-1 min-w-[200px] p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Filter by Name"
        value={filterName}
        onChange={(e) => {
          setFilterName(e.target.value);
          // debouncedFilter();
        }}
        className="flex-1 min-w-[200px] p-2 border rounded-md"
      />
      <button
        onClick={() => onFilter(
          filterSno ? parseInt(filterSno) : undefined,
          filterName || undefined
        )}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterBar;