import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from "@phosphor-icons/react";

export default function Orderform() {
  return (
    <>
      <section className="flex flex-col p-10 mt-4 rounded-md bg-card">
        <article className="flex mb-6 items-start">
          <MapPin className="text-primary" size={24} style={{ marginRight: '10px' }} />
          <div>
            <h2 className="text-base font-semibold">Endereço de Entrega</h2>
            <p className="text-sm">Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </article>
        <div className="mb-4">
          <input
            type="text"
            placeholder="CEP"
            className="w-1/2 p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Rua"
            className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            placeholder="Número"
            className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
          />
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Complemento"
              className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 italic">
              Opcional
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Bairro"
              className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Cidade"
              className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="md:col-span-1 min-w-[55px]">
            <input
              type="text"
              placeholder="UF"
              className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col p-10 mt-4 rounded-md bg-card">
        <article className="flex mb-6 items-start">
          <CurrencyDollar className="text-purple-500" size={24} style={{ marginRight: '10px' }} />
          <div>
            <h2 className="text-base font-semibold">Pagamento</h2>
            <p className="text-sm">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </article>
        <div className="flex flex-row justify-between flex-wrap gap-4">
          <button className="flex items-center p-4 rounded cursor-pointer bg-light">
            <CreditCard className="text-purple-500" size={16} style={{ marginRight: '12px' }} />
            <p className="text-xs">CARTÃO DE CRÉDITO</p>
          </button>
          <button className="flex items-center p-4 rounded cursor-pointer  bg-light">
            <Bank className="text-purple-500" size={16} style={{ marginRight: '12px' }} />
            <p className="text-xs">CARTÃO DE DÉBITO</p>
          </button>
          <button className="flex items-center p-4 rounded cursor-pointer  bg-light">
            <Money className="text-purple-500" size={16} style={{ marginRight: '12px' }} />
            <p className="text-xs">DINHEIRO</p>
          </button>
        </div>
      </section>
    </>
  );
}
