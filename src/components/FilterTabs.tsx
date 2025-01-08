import React from "react";
import { Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  showFilterIcon?: boolean;
}

const FilterTabs = ({
  options,
  value,
  onValueChange,
  showFilterIcon = true,
}: FilterTabsProps) => {
  return (
    <div className="flex items-center gap-2">
      {showFilterIcon && <Filter className="w-4 h-4 text-gray-400" />}
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList className="h-9 bg-dark-200 p-1">
          {options.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              className="px-3 py-1.5 text-sm data-[state=active]:bg-primary-500"
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
