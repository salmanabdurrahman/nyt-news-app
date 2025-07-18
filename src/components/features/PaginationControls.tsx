import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-8 flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        aria-label="Halaman Sebelumnya"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="ml-2">Sebelumnya</span>
      </Button>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Halaman {currentPage + 1} dari {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={handleNextPage}
        disabled={currentPage >= totalPages - 1}
        aria-label="Halaman Berikutnya"
      >
        <span className="mr-2">Berikutnya</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationControls;
