import { Button } from "./button";
import { ListMetaType } from "@/types/user";
function Pagination({
  total_pages,
  current_page,
  total_items,
  setQuery,
  query,
}: ListMetaType) {
  const handleNext = () => {
    const nextPage =
      (query.page || 0) < (total_pages || 0)
        ? (query.page || 0) + 1
        : query.page;

    setQuery((prev) => ({ ...prev, page: nextPage }));
  };

  const handlePrevious = () => {
    const prevPage = (query.page || 0) > 1 ? (query.page || 1) - 1 : query.page;
    setQuery((prev) => ({ ...prev, page: prevPage }));
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (total_pages <= maxVisible) {
      for (let i = 1; i <= total_pages; i++) pages.push(i);
    } else {
      pages.push(1);

      const left = Math.max(2, current_page - Math.floor((maxVisible - 2) / 2));
      const right = Math.min(
        total_pages - 1,
        current_page + Math.floor((maxVisible - 2) / 2)
      );

      if (left > 2) {
        pages.push("…");
      }

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < total_pages - 1) {
        pages.push("…");
      }

      pages.push(total_pages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  if (total_pages === 0) return null;

  const start = (current_page - 1) * (query?.limit ?? 20) + 1;
  const end = Math.min(current_page * (query?.limit ?? 20), total_items);

  return (
    <div className="flex flex-col-reverse items-center gap-4 py-2 justify-between sm:flex-row w-full">
      <div className="flex gap-1 items-center text-primary/70 text-sm">
        <span className="pl-1 text-sm">Showing </span>
        <span>
          {start} - {end}
        </span>
        <span>of</span>
        <span>{total_items}</span>
        <span>entries</span>
      </div>
      <div className="flex gap-2 items-center justify-end py-2 text-primary/70">
        <Button
          disabled={query.page == 1}
          onClick={handlePrevious}
          size="sm"
          variant="ghost"
        >
          Previous
        </Button>

        {pages.map((page, index) =>
          page === "…" ? (
            <span key={`ellipsis-${index}`} className="px-2">
              …
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              size="sm"
              variant={current_page === page ? "default" : "outline"}
              onClick={() =>
                setQuery((prev) => ({ ...prev, page: page as number }))
              }
            >
              {page}
            </Button>
          )
        )}

        <Button
          disabled={query.page == total_pages || total_pages === 0}
          onClick={handleNext}
          size="sm"
          variant="ghost"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
