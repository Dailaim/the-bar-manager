import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

export const NotFoundOrder = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-xl font-bold">Orden no encontrada</h1>
        <p className="mb-6 text-gray-600">
          La orden que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
};
