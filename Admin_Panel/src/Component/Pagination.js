import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const Prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const Next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show the first page
    pages.push(
      <button
        key={1}
        className="pageNumber"
        style={{
          border: "1px solid #555",
          background: page === 1 ? "green" : "transparent",
          color: page === 1 ? "white" : "black",
        }}
        onClick={() => goToPage(1)}
      >
        1
      </button>
    );

    // Show the next few pages based on current page position
    if (page > 3) {
      pages.push(<span key="dots1">...</span>);
    }

    // Show the current page and its neighbors (1 page before and 1 page after)
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(
        <button
          key={i}
          className="pageNumber"
          style={{
            border: "1px solid #555",
            background: page === i ? "green" : "transparent",
            color: page === i ? "white" : "black",
          }}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis before the last page if needed
    if (page < totalPages - 2) {
      pages.push(<span key="dots2">...</span>);
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className="pageNumber"
          style={{
            border: "1px solid #555",
            background: page === totalPages ? "green" : "transparent",
            color: page === totalPages ? "white" : "black",
          }}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination mt-2">
      {/* Previous Button */}
      <button
        className="prevBtn"
        onClick={Prev}
        disabled={page === 1}
        style={{ border: "1px solid #555", }}
      >
        <i className="fa-solid fa-backward"></i> Previous
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className="nextBtn"
        onClick={Next}
        disabled={page >= totalPages}
        style={{ border: "1px solid #555",}}
      >
        Next <i className="fa-sharp fa-solid fa-forward"></i>
      </button>
    </div>
  );
};

export default Pagination;
