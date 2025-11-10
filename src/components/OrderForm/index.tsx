import { zodResolver } from "@hookform/resolvers/zod";
import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect } from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";
import { z } from "zod";

const orderFormSchema = z.object({
  cep: z.string().min(8, "CEP é obrigatório (8 caracteres)").max(9, "CEP inválido"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "UF é obrigatória").max(2, "UF inválida"),
  paymentMethod: z.enum(['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'], {
    errorMap: () => ({ message: "Selecione um método de pagamento" })
  })
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  onOrderSubmit: (data: OrderFormData) => void;
  formRef?: React.MutableRefObject<UseFormReturn<OrderFormData> | undefined>;
}

const defaultValues = {
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  paymentMethod: undefined
};

export default function Orderform({ onOrderSubmit, formRef }: OrderFormProps) {
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors }
  } = methods;

  const cep = watch("cep");

  useEffect(() => {
    if (!cep) return;
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        .then((response) => {
          if (response.data.erro) {
            toast.error("CEP não encontrado.");
            return;
          }
          const { logradouro, bairro, localidade, uf } = response.data;
          setValue("street", logradouro || "");
          setValue("neighborhood", bairro || "");
          setValue("city", localidade || "");
          setValue("state", uf || "");
        })
        .catch((error) => {
          console.error("CEP lookup error:", error);
          toast.error("Erro ao buscar o CEP. Tente novamente.");
        })
    }
  }, [cep, setValue]);

  useEffect(() => {
    if (formRef) {
      formRef.current = methods;
    }
  }, [formRef, methods]);

  const onSubmit = (data: OrderFormData) => {
    onOrderSubmit(data);
    toast.success("Dados confirmados!");
  };

  return (
    <form id="order-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <section className="flex flex-col p-10 mt-4 rounded-md bg-card">
        <article className="flex mb-6 items-start">
          <MapPin className="text-primary" size={24} style={{ marginRight: '10px' }} />
          <div>
            <h2 className="text-base font-semibold">Endereço de Entrega</h2>
            <p className="text-sm">Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </article>

        <div className="mb-4">
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="99999-999"
                placeholder="CEP"
                className={`w-1/2 p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none
          ${errors.cep ? 'border-red-500' : 'focus:border-orange-500'}`}
              />
            )}
          />
          {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Rua"
            {...register('street')}
            className={`w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none 
              ${errors.street ? 'border-red-500' : 'focus:border-orange-500'}`}
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Número"
              {...register('number')}
              className={`w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none 
                ${errors.number ? 'border-red-500' : 'focus:border-orange-500'}`}
            />
            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Complemento"
              {...register('complement')}
              className="w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none focus:border-orange-500"
            />
            {window.innerWidth > 800 && (
              <span className="text-gray-400 italic">
                Opcional
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Bairro"
              {...register('neighborhood')}
              className={`w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none 
                ${errors.neighborhood ? 'border-red-500' : 'focus:border-orange-500'}`}
            />
            {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>}
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Cidade"
              {...register('city')}
              className={`w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none 
                ${errors.city ? 'border-red-500' : 'focus:border-orange-500'}`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div className="md:col-span-1 min-w-[55px]">
            <input
              type="text"
              placeholder="UF"
              {...register('state')}
              className={`w-full p-4 h-10 bg-gray-50 rounded-lg text-gray-500 border-2 focus:outline-none 
                ${errors.state ? 'border-red-500' : 'focus:border-orange-500'}`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>
        </div>
      </section>

      <section className="flex flex-col p-10 rounded-md bg-card">
        <article className="flex mb-6 items-start">
          <CurrencyDollar className="text-purple-500" size={24} style={{ marginRight: '10px' }} />
          <div>
            <h2 className="text-base font-semibold">Pagamento</h2>
            <p className="text-sm">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </article>

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div className="flex gap-3 justify-between flex-wrap">
              {["Cartão de Crédito", "Cartão de Débito", "Dinheiro"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => field.onChange(method)}
                  className={`p-4 rounded-md cursor-pointer transition ${field.value === method ? "bg-green-200" : "bg-gray-200"
                    }`}
                >
                  {method === "Cartão de Crédito" && <CreditCard className="mr-2" />}
                  {method === "Cartão de Débito" && <Bank className="mr-2" />}
                  {method === "Dinheiro" && <Money className="mr-2" />}
                  {method}
                </button>
              ))}
            </div>
          )}
        />
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-1">
            {errors.paymentMethod.message}
          </p>
        )}
      </section>
      <button type="submit" className="w-full py-3 rounded-md bg-green-500 text-white font-bold">CONFIRMAR</button>
    </form>
  );
}