import { OrderScreen } from "@/modules/order/screens/order-screen";

export default function EditOrderPage({ params }: { params: { id: string } }) {
  return <OrderScreen orderId={params.id} />;
}
