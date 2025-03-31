"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { RoundModal } from "@/modules/order/components/round-modal";
import { useGetOrder } from "@/modules/shared/hooks/get-order";
import { useGetStock } from "@/modules/shared/hooks/get-stock";
import {
  useDeleteOrder,
  usePayOrder,
} from "@/modules/shared/hooks/post-orders";
import { useGetOrders } from "@/modules/shared/hooks/get-orders";
import {
  useAddRoundToOrder,
  useDeleteRoundFromOrder,
  useUpdateRoundInOrder,
} from "@/modules/shared/hooks/post-rounds";
import { toast } from "sonner";
import { Round, RoundItem } from "@/types/orders";
import { IsLoading } from "../components/is-loading";
import { NotFoundOrder } from "../components/not-found-order";
import { RoundComponent } from "../components/round-component";
import { Pricing } from "../components/pricing";
import { ItemsTable } from "../components/items-table";

interface OrderScreenProps {
  orderId: string;
}

export function OrderScreen({ orderId }: OrderScreenProps) {
  const router = useRouter();
  const {
    data: orderData,
    refetch: refetchOrder,
    isLoading,
  } = useGetOrder(orderId);
  const { data: stockData, refetch: refetchStock } = useGetStock();
  const { mutate: deleteOrder } = useDeleteOrder();
  const { refetch: AllOrdersRefetch } = useGetOrders();
  const { mutate: payOrder } = usePayOrder();
  const [isAddRoundModalOpen, setIsAddRoundModalOpen] = useState(false);
  const { mutate: deleteRound } = useDeleteRoundFromOrder();
  const { mutate: updateRound } = useUpdateRoundInOrder();
  const { mutate: addRound } = useAddRoundToOrder();
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [isEditRoundModalOpen, setIsEditRoundModalOpen] = useState(false);

  const order = orderData?.order;
  const stock = stockData?.beers;

  const handleAddRound = async (items: RoundItem[]) => {
    if (!order) return;

    addRound(
      {
        round: items,
        orderid: order.id,
      },
      {
        onSuccess: () => {
          refetchOrder();
          refetchStock();
          AllOrdersRefetch();
          toast.success("Round añadido exitosamente", {
            position: "top-center",
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  const handleEditRound = async (items: RoundItem[]) => {
    if (!order || !currentRound) return;

    updateRound(
      {
        orderid: order.id,
        roundId: currentRound.id,
        round: items,
      },
      {
        onSuccess: () => {
          refetchOrder();
          refetchStock();
          AllOrdersRefetch();
          toast.success("Round actualizado exitosamente", {
            position: "top-center",
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  const PayOrder = () => {
    if (!order) return;

    payOrder(order.id, {
      onSuccess: () => {
        refetchOrder();
        refetchStock();
        AllOrdersRefetch();
        toast.success("Orden pagada exitosamente", {
          position: "top-center",
        });
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  };

  const handleDeleteRound = async (roundId: string) => {
    if (!order) return;

    deleteRound(
      {
        orderid: order.id,
        roundId: roundId,
      },
      {
        onSuccess: () => {
          refetchOrder();
          refetchStock();
          AllOrdersRefetch();
          toast.success("Round eliminado exitosamente", {
            position: "top-center",
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  const openEditRoundModal = (round: Round) => {
    setCurrentRound(round);
    setIsEditRoundModalOpen(true);
  };

  const cancelOrder = async () => {
    if (!order) return;

    deleteOrder(order.id, {
      onSuccess: () => {
        refetchOrder();
        refetchStock();
        AllOrdersRefetch();
        toast.success("Orden cancelada exitosamente", {
          position: "top-center",
        });
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  };

  if (isLoading) {
    return <IsLoading />;
  }

  if (!order) {
    return <NotFoundOrder />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver al dashboard
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Editar Orden #{orderId}</h1>
          {!order.paid && (
            <div className="flex space-x-2">
              <button
                onClick={() => PayOrder()}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Pay Orden
              </button>
              <button
                onClick={cancelOrder}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Cancelar Orden
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-lg bg-white p-4 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Rounds</h2>
                {!order.paid && (
                  <button
                    onClick={() => setIsAddRoundModalOpen(true)}
                    className="flex items-center rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Añadir Round
                  </button>
                )}
              </div>

              {order.rounds.length === 0 ? (
                <p className="text-gray-500">No hay rounds en esta orden</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {order.rounds.map((round) => (
                    <RoundComponent
                      key={round.id}
                      isPaid={order.paid}
                      round={round}
                      onEditRound={openEditRoundModal}
                      onDeleteRound={handleDeleteRound}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold">
                Productos Individuales
              </h2>

              {order.items.length === 0 ? (
                <p className="text-gray-500">
                  No hay productos individuales en esta orden
                </p>
              ) : (
                <ItemsTable items={order.items} />
              )}
            </div>
          </div>

          <Pricing
            orderid={order.id}
            created={order.created}
            paid={order.paid}
            subtotal={order.subtotal}
            taxes={order.taxes}
            discounts={order.discounts}
            total={order.total}
          />
        </div>
      </div>

      <RoundModal
        isOpen={isAddRoundModalOpen}
        onClose={() => setIsAddRoundModalOpen(false)}
        onSave={handleAddRound}
        availableStock={stock ?? []}
        title="Añadir Nuevo Round"
      />

      <RoundModal
        isOpen={isEditRoundModalOpen}
        onClose={() => setIsEditRoundModalOpen(false)}
        onSave={handleEditRound}
        existingItems={currentRound?.items || []}
        availableStock={stock ?? []}
        title={`Editar Round #${currentRound?.id.substring(0, 6) || ""}`}
      />
    </div>
  );
}
