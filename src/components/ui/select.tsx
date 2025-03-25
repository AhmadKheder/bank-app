

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder,
  className,
}: SelectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full border text-gray-600 border-input bg-background rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring ${className} `}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
