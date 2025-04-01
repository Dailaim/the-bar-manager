import { OrderScreen } from "@/modules/order/screens/order-screen";

export default async function EditOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderScreen orderId={id} />;
}
