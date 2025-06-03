// @components/ui/spinner.tsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      {/* You can customize your spinner here. This is a basic example using Tailwind CSS. */}
      <div
        className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"
        role="status"
        aria-label="Loading..."
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
