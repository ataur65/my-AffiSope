"use client";
import React from 'react';

interface PaginationProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="flex justify-end mt-4">
      <button
        className="bg-custom-card text-sm text-white font-semibold py-2 px-4 rounded-lg hover:bg-custom-accent transition"
        onClick={onPrevious}
      >
        Previous
      </button>
      <button
        className="ml-2 bg-custom-card text-sm text-white font-semibold py-2 px-4 rounded-lg hover:bg-custom-accent transition"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
