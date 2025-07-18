import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSubmit, isLoading }: SearchFormProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center space-x-2">
      <Input
        type="text"
        name="search"
        placeholder="Cari artikel tentang 'indonesia', 'teknologi', 'politik'..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={isLoading}
        className="flex-1"
        autoComplete="search"
        autoFocus
      />
      <Button type="submit" disabled={isLoading} aria-label="Cari">
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span className="sr-only">Cari</span>
      </Button>
    </form>
  );
};

export default SearchForm;
