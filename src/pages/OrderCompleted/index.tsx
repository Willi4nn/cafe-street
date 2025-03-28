import { Clock, CurrencyDollar, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ImgScooter from "../../assets/delivery-scooter.png";
import { CompletedOrder } from "../../types/cart";


export default function OrderCompleted() {
  const [order, setOrder] = useState<CompletedOrder | null>(null);

  useEffect(() => {
    const completedOrder = localStorage.getItem("completed-order");
    if (completedOrder) {
      setOrder(JSON.parse(completedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">Nenhum pedido em aberto no momento</p>
      </div>
    )
  }

  return (
    <div className="flex p-6 mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl justify-between flex-wrap ">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          Uhu! Pedido confirmado
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Agora é só aguardar que logo o café chegará até você
        </p>

        <div className="relative mx-auto rounded-lg bg-gradient-to-tr from-primary to-purple-500 p-0.5 shadow-lg" style={{
          borderRadius: "5px 50px 5px 50px",
        }}>
          <div className="bg-white"
            style={{
              borderRadius: "5px 50px 5px 50px",
            }}>
            <div className="flex p-[40px] flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  <MapPin size={16} weight="fill" className="fill-white" />
                </div>
                <p className="text-lg">
                  Entrega em <strong>{order.street}, {order.number}</strong> <br />
                  {order.neighborhood} - {order.city}, {order.state}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  <Clock size={16} weight="fill" className="fill-white" />
                </div>
                <p className="text-lg">
                  Previsão de entrega <br /> <strong>20 min - 30 min</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full">
                  <CurrencyDollar size={16} weight="light" className="fill-white" />
                </div>
                <p className="text-lg">
                  Pagamento na entrega <br /> <strong>{order.paymentMethod}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={ImgScooter}
        alt="Entregador de scooter"
      />

    </div >

  );
}
