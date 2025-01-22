import React from 'react';
import { debounce } from '../../../utils/debounce';
import Input from '../../shared/Input';
import Button from '../../shared/Button';

interface FilterBarProps {
  filterSno: string;
  filterName: string;
  onFilterChange: (field: 'sno' | 'name', value: string) => void;
  onFilter: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterSno,
  filterName,
  onFilterChange,
  onFilter,
}) => {
  const debouncedFilter = debounce(onFilter, 500);

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          type="number"
          placeholder="Filter by Student No"
          value={filterSno}
          onChange={(value) => {
            onFilterChange('sno', value);
            debouncedFilter();
          }}
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Filter by Name"
          value={filterName}
          onChange={(value) => {
            onFilterChange('name', value);
            debouncedFilter();
          }}
        />
      </div>
      <Button onClick={onFilter}>
        Filter
      </Button>
    </div>
  );
};

export default FilterBar;