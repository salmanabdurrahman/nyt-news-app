import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "relevance" | "newest" | "oldest";

interface SortOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  disabled: boolean;
}

const SortOptions = ({ value, onChange, disabled }: SortOptionsProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Urutkan berdasarkan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Paling Relevan</SelectItem>
        <SelectItem value="newest">Terbaru</SelectItem>
        <SelectItem value="oldest">Terlama</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortOptions;
