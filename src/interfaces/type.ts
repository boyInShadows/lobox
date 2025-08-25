export interface Option {
    id: string | number;
    label: string;
    value: string;
  }
  
  export interface MultiSelectProps {
    options: Option[];
    selected: Option[];
    onChange: (selected: Option[]) => void;
    onCreateOption?: (inputValue: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }