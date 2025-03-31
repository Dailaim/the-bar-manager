import React from "react";

interface PricingProps {
  orderid: string;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  total: number;
}

export const Pricing = ({
  created,
  paid,
  subtotal,
  taxes,
  discounts,
  total,
  orderid,
}: PricingProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">Resumen de la Orden</h2>

      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>ID:</span>
          <span>{orderid}</span>
        </div>
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>Fecha:</span>
          <span>{new Date(created).toLocaleString()}</span>
        </div>
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>Estado:</span>
          <span className="font-medium text-blue-500">
            {paid ? "Pagada" : "Pendiente"}
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-b py-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos:</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Descuentos:</span>
          <span>-${discounts.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
