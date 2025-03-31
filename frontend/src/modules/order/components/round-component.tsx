import { Round } from "@/types/orders";
import React from "react";
import { Edit, Trash } from "lucide-react";

interface RoundProps {
  round: Round;
  onEditRound: (round: Round) => void | Promise<void>;
  onDeleteRound: (roundId: string) => void;
  isPaid: boolean;
}

export const RoundComponent = ({
  round,
  onEditRound,
  onDeleteRound,
  isPaid,
}: RoundProps) => {
  return (
    <div key={round.id} className="rounded-md border p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Round #{round.id.substring(0, 6)}</h3>
        {!isPaid && (
          <div>
            <button
              onClick={() => onEditRound(round)}
              className="rounded-full p-1 text-blue-500 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDeleteRound(round.id)}
              className="rounded-full p-1 text-red-500 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <p className="mb-1 text-sm text-gray-500">
        Creado: {new Date(round.created).toLocaleString()}
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {round.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
