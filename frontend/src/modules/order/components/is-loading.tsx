import React from "react";

export function IsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 mx-auto"></div>
        <p>Cargando datos...</p>
      </div>
    </div>
  );
}
