import { useCallback, type JSX, useState, ChangeEvent } from "react";
import { Input, InputProps } from "@heroui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  variant?: InputProps["variant"];
  handleSearch: (value: string) => Promise<void> | void;
  placeholder?: string;
}

function SearchInput({
  variant,
  handleSearch,
  placeholder = "Buscar...",
}: SearchInputProps): JSX.Element {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(() => handleSearch(event.target.value), 500));
    },
    [handleSearch],
  );

  return (
    <Input
      isClearable
      aria-label="Search"
      classNames={{
        inputWrapper:
          "dark:bg-opacity-10 hover:bg-opacity-20 dark:group-data-[focus=true]:bg-opacity-10 dark:group-data-[hover=true]:bg-opacity-30 group-data-[focus=true]:border-default-500",
        input: "text-md",
        clearButton: "text-primary-500",
      }}
      labelPlacement="outside"
      placeholder={placeholder}
      startContent={
        <SearchIcon className="text-base text-primary-400 pointer-events-none flex-shrink-0" />
      }
      variant={variant}
      onChange={handleChange}
      onClear={async () => await handleSearch("")}
    />
  );
}

export default SearchInput;
