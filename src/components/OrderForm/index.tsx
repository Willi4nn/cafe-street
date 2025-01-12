import { zodResolver } from "@hookform/resolvers/zod";
import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { z } from "zod";

const orderFormSchema = z.object({
  cep: z.string().min(9, "CEP é obrigatório (8 caracteres)").max(9, "CEP inválido"),
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

interface OrderformProps {
  onOrderFormDataChange?: (data: OrderFormData | null) => void;
  onValidSubmit?: (data: OrderFormData) => void;
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

const paymentMethodOptions = [
  { label: 'CARTÃO DE CRÉDITO', value: 'Cartão de Crédito' },
  { label: 'CARTÃO DE DÉBITO', value: 'Cartão de Débito' },
  { label: 'DINHEIRO', value: 'Dinheiro' },
];

export default function Orderform({ onOrderFormDataChange, onValidSubmit, formRef }: OrderformProps) {
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = methods;

  useEffect(() => {
    if (formRef) {
      formRef.current = methods;
    }
  }, [formRef, methods]);

  useEffect(() => {
    const savedData = localStorage.getItem('order-form-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const validationResult = orderFormSchema.safeParse(parsedData);

        if (validationResult.success) {
          Object.keys(parsedData).forEach(key => {
            setValue(key as keyof OrderFormData, parsedData[key]);
          });
        }
      } catch (error) {
        console.error('Erro ao analisar os dados do formulário:', error);
      }
    }
  }, [setValue]);

  const formData = watch();
  useEffect(() => {
    if (methods.formState.isValid) {
      localStorage.setItem('order-form-data', JSON.stringify(formData));

      if (onOrderFormDataChange) {
        onOrderFormDataChange(formData);
      }
    }
  }, [formData, methods.formState.isValid, onOrderFormDataChange]);

  const onSubmit = (data: OrderFormData) => {
    if (onValidSubmit) {
      onValidSubmit(data);
    }
    reset();
  };

  return (
    <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
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

      <section className="flex flex-col p-10 mt-4 rounded-md bg-card">
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
            <div className="flex flex-row justify-between flex-wrap gap-2">
              {paymentMethodOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={`flex items-center p-4 rounded cursor-pointer active:bg-purple-300 transition duration-200
                  ${field.value === option.value ? 'bg-purple-200 shadow shadow-purple-500' : 'bg-light'}`}
                >
                  {option.value === 'Cartão de Crédito' && <CreditCard className="text-purple-500" size={16} style={{ marginRight: '12px' }} />}
                  {option.value === 'Cartão de Débito' && <Bank className="text-purple-500" size={16} style={{ marginRight: '12px' }} />}
                  {option.value === 'Dinheiro' && <Money className="text-purple-500" size={16} style={{ marginRight: '12px' }} />}
                  <p className="text-xs">{option.label}</p>
                </button>
              ))}
            </div>
          )}
        />
        {errors.paymentMethod && <p className="text-red-500 text-sm mt-2 text-center">{errors.paymentMethod.message}</p>}
      </section>
    </form>
  );
}