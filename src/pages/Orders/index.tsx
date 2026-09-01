import {
  ArrowLeft,
  CalendarBlank,
  MapPin,
  Package,
  Receipt,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CompletedOrder } from '../../types/cart';
import { PriceFormatter } from '../../utils/PriceFormatter';

export default function Orders() {
  const [orders, setOrders] = useState<CompletedOrder[]>([]);

  useEffect(() => {
    const history = localStorage.getItem('orders-history');
    if (history) {
      setOrders(JSON.parse(history));
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24 pt-8 min-h-[70vh]">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-bold text-3xl text-secondary flex items-center gap-3">
            <Package size={32} className="text-primary" weight="fill" />
            Meus Pedidos
          </h1>
          <p className="text-secondary/70 mt-2 font-medium">
            Acompanhe o histórico das suas compras
          </p>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-light border-dashed shadow-sm gap-6">
          <div className="w-24 h-24 bg-light rounded-full flex items-center justify-center">
            <Receipt size={48} className="text-secondary/40" weight="duotone" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-bold text-2xl text-secondary">
              Nenhum pedido feito
            </h3>
            <p className="text-secondary/70 font-medium max-w-sm">
              Você ainda não realizou nenhuma compra. Que tal explorar nosso
              cardápio?
            </p>
          </div>
          <Link
            to="/"
            className="mt-4 flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
          >
            <ArrowLeft weight="bold" size={20} />
            Explorar Cafés
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {orders.map((order) => (
            <article
              key={order.id}
              className="flex flex-col bg-card border border-light/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start border-b border-light pb-4 mb-6 gap-4 flex-wrap">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-md">
                    Concluído
                  </span>
                  <div className="flex items-center gap-2 text-secondary/70 text-sm mt-3 font-medium">
                    <CalendarBlank size={16} />
                    {formatDate(order.date)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary/70 font-medium">
                    Total do Pedido
                  </p>
                  <p className="text-2xl font-black text-secondary">
                    <PriceFormatter value={order.totalPrice} />
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4 mb-6">
                {order.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-light rounded-xl p-2 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-secondary">
                        {product.name}
                      </h4>
                      <p className="text-sm text-secondary/70 font-medium">
                        {product.quantity}x{' '}
                        <PriceFormatter value={product.price} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-light/50 rounded-xl p-4 flex gap-3 items-start">
                <MapPin
                  size={20}
                  className="text-primary shrink-0 mt-0.5"
                  weight="fill"
                />
                <div className="text-sm text-secondary/80 font-medium leading-relaxed">
                  <p>
                    <span className="font-bold text-secondary">Endereço:</span>{' '}
                    {order.street}, {order.number}
                  </p>
                  <p>
                    {order.neighborhood} — {order.city}/{order.state}
                  </p>
                  <p className="mt-1 pt-1 border-t border-light/60">
                    <span className="font-bold text-secondary">Pagamento:</span>{' '}
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
