import { zodResolver } from '@hookform/resolvers/zod';
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
} from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect } from 'react';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { z } from 'zod';

const orderFormSchema = z.object({
  cep: z
    .string()
    .min(8, 'CEP é obrigatório (8 caracteres)')
    .max(9, 'CEP inválido'),
  street: z.string().min(3, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, 'Bairro é obrigatório'),
  city: z.string().min(3, 'Cidade é obrigatória'),
  state: z.string().min(2, 'UF é obrigatória').max(2, 'UF inválida'),
  paymentMethod: z.enum(['Cartão de Crédito', 'Cartão de Débito'], {
    errorMap: () => ({ message: 'Selecione um método de pagamento' }),
  }),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  onOrderSubmit: (data: OrderFormData) => void;
  formRef?: React.MutableRefObject<UseFormReturn<OrderFormData> | undefined>;
  disabled?: boolean; // Nova propriedade adicionada
}

export default function OrderForm({
  onOrderSubmit,
  formRef,
  disabled = false,
}: OrderFormProps) {
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      paymentMethod: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = methods;
  const cep = watch('cep');

  useEffect(() => {
    if (formRef) formRef.current = methods;
  }, [formRef, methods]);

  useEffect(() => {
    const cleanedCep = cep?.replace(/\D/g, '');
    if (cleanedCep?.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        .then(({ data }) => {
          if (data.erro) return toast.error('CEP não encontrado.');
          setValue('street', data.logradouro || '');
          setValue('neighborhood', data.bairro || '');
          setValue('city', data.localidade || '');
          setValue('state', data.uf || '');
        })
        .catch(() => toast.error('Erro ao buscar o CEP.'));
    }
  }, [cep, setValue]);

  return (
    <form
      id="order-form"
      onSubmit={handleSubmit(onOrderSubmit)}
      className="flex flex-col gap-8 w-full"
    >
      {/* Endereço Section */}
      <section
        aria-labelledby="shipping-address-title"
        className="flex flex-col gap-8 p-8 rounded-xl bg-card shadow-sm"
      >
        <header className="flex gap-4 items-start">
          <MapPin className="text-primary mt-1" size={24} aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h2
              id="shipping-address-title"
              className="text-lg font-semibold text-secondary"
            >
              Endereço de Entrega
            </h2>
            <p className="text-sm text-secondary/80 leading-relaxed">
              Informe o endereço onde deseja receber seu pedido
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 max-w-[200px]">
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="99999-999"
                  placeholder="CEP"
                  aria-invalid={!!errors.cep}
                  disabled={disabled}
                  className="w-full p-3 rounded-lg bg-light text-secondary border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              )}
            />
            {errors.cep && (
              <span className="text-xs text-red-500 font-medium" role="alert">
                {errors.cep.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Rua"
              aria-invalid={!!errors.street}
              disabled={disabled}
              {...register('street')}
              className="w-full p-3 rounded-lg bg-light text-secondary border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {errors.street && (
              <span className="text-xs text-red-500 font-medium" role="alert">
                {errors.street.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="number"
                placeholder="Número"
                aria-invalid={!!errors.number}
                disabled={disabled}
                {...register('number')}
                className="w-full p-3 rounded-lg bg-light text-secondary border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {errors.number && (
                <span className="text-xs text-red-500 font-medium" role="alert">
                  {errors.number.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <input
                type="text"
                placeholder="Complemento"
                disabled={disabled}
                {...register('complement')}
                className="w-full p-3 pr-20 rounded-lg bg-light text-secondary border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <span className="absolute right-4 top-3.5 text-xs text-secondary/50 italic pointer-events-none hidden sm:block">
                Opcional
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_80px] gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Bairro"
                aria-invalid={!!errors.neighborhood}
                disabled={disabled}
                {...register('neighborhood')}
                className="w-full p-3 rounded-lg bg-light text-secondary focus-visible:ring-2 focus-visible:ring-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {errors.neighborhood && (
                <span className="text-xs text-red-500" role="alert">
                  {errors.neighborhood.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Cidade"
                aria-invalid={!!errors.city}
                disabled={disabled}
                {...register('city')}
                className="w-full p-3 rounded-lg bg-light text-secondary focus-visible:ring-2 focus-visible:ring-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {errors.city && (
                <span className="text-xs text-red-500" role="alert">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="UF"
                aria-invalid={!!errors.state}
                disabled={disabled}
                {...register('state')}
                className="w-full p-3 rounded-lg bg-light text-secondary focus-visible:ring-2 focus-visible:ring-primary outline-none uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                maxLength={2}
              />
              {errors.state && (
                <span className="text-xs text-red-500" role="alert">
                  {errors.state.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pagamento Section */}
      <section
        aria-labelledby="payment-method-title"
        className="flex flex-col gap-8 p-8 rounded-xl bg-card shadow-sm"
      >
        <header className="flex gap-4 items-start">
          <CurrencyDollar
            className="text-primary mt-1"
            size={24}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1">
            <h2
              id="payment-method-title"
              className="text-lg font-semibold text-secondary"
            >
              Pagamento
            </h2>
            <p className="text-sm text-secondary/80 leading-relaxed">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
        </header>

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              role="radiogroup"
              aria-label="Métodos de Pagamento"
            >
              {[
                { id: 'Cartão de Crédito', icon: CreditCard },
                { id: 'Cartão de Débito', icon: Bank },
              ].map(({ id, icon: Icon }) => {
                const isSelected = field.value === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={disabled}
                    onClick={() => field.onChange(id)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border uppercase text-xs tracking-wider font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed
                      ${isSelected ? 'bg-primary/10 border-primary text-secondary' : 'bg-light border-transparent text-secondary/70 hover:bg-light/80 hover:text-secondary'}`}
                  >
                    <Icon size={16} className="text-primary" /> {id}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.paymentMethod && (
          <span className="text-xs text-red-500 font-medium" role="alert">
            {errors.paymentMethod.message}
          </span>
        )}
      </section>

      <button
        type="submit"
        disabled={disabled}
        className="w-full mt-2 py-3 px-4 rounded-lg bg-primary text-white font-bold tracking-wide uppercase transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Confirmar Dados
      </button>
    </form>
  );
}
