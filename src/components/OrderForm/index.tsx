import { zodResolver } from '@hookform/resolvers/zod';
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Spinner,
} from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  disabled?: boolean;
}

export default function OrderForm({
  onOrderSubmit,
  formRef,
  disabled = false,
}: OrderFormProps) {
  const [isFetchingCep, setIsFetchingCep] = useState(false);

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
    setFocus,
    formState: { errors },
  } = methods;
  const cep = watch('cep');

  useEffect(() => {
    if (formRef) formRef.current = methods;
  }, [formRef, methods]);

  useEffect(() => {
    const cleanedCep = cep?.replace(/\D/g, '');
    if (cleanedCep?.length === 8) {
      setIsFetchingCep(true);
      axios
        .get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        .then(({ data }) => {
          if (data.erro) {
            toast.error('CEP não encontrado.', { toastId: 'cep-error' });
            return;
          }
          setValue('street', data.logradouro || '');
          setValue('neighborhood', data.bairro || '');
          setValue('city', data.localidade || '');
          setValue('state', data.uf || '');

          setFocus('number');
        })
        .catch(() =>
          toast.error('Erro ao buscar o CEP.', { toastId: 'cep-fetch-error' })
        )
        .finally(() => setIsFetchingCep(false));
    }
  }, [cep, setValue, setFocus]);

  const inputBaseClass =
    'w-full p-3 rounded-lg bg-light text-secondary border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <form
      id="order-form"
      onSubmit={handleSubmit(onOrderSubmit)}
      className="flex flex-col gap-8 w-full"
    >
      <section className="flex flex-col gap-8 p-6 sm:p-8 rounded-2xl bg-card shadow-sm border border-light/50">
        <header className="flex gap-4 items-start">
          <MapPin className="text-primary mt-1" size={24} weight="fill" />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-secondary">
              Endereço de Entrega
            </h2>
            <p className="text-sm text-secondary/70">
              Informe o endereço onde deseja receber seu pedido
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 max-w-[240px] relative">
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="99999-999"
                  placeholder="CEP"
                  disabled={disabled || isFetchingCep}
                  className={`${inputBaseClass} ${errors.cep ? 'border-red-500' : 'border-transparent'}`}
                />
              )}
            />
            {isFetchingCep && (
              <Spinner
                className="absolute right-3 top-3.5 animate-spin text-primary"
                size={20}
              />
            )}
            {errors.cep && (
              <span className="text-xs text-red-500 font-medium">
                {errors.cep.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Rua"
              disabled={disabled}
              {...register('street')}
              className={`${inputBaseClass} ${errors.street ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.street && (
              <span className="text-xs text-red-500 font-medium">
                {errors.street.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="number"
                placeholder="Número"
                disabled={disabled}
                {...register('number')}
                className={`${inputBaseClass} ${errors.number ? 'border-red-500' : 'border-transparent'}`}
              />
              {errors.number && (
                <span className="text-xs text-red-500 font-medium">
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
                className={`${inputBaseClass} border-transparent pr-24`}
              />
              <span className="absolute right-4 top-3.5 text-xs font-semibold text-secondary/40 pointer-events-none">
                Opcional
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_80px] gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Bairro"
                disabled={disabled}
                {...register('neighborhood')}
                className={`${inputBaseClass} ${errors.neighborhood ? 'border-red-500' : 'border-transparent'}`}
              />
              {errors.neighborhood && (
                <span className="text-xs text-red-500">
                  {errors.neighborhood.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Cidade"
                disabled={disabled}
                {...register('city')}
                className={`${inputBaseClass} ${errors.city ? 'border-red-500' : 'border-transparent'}`}
              />
              {errors.city && (
                <span className="text-xs text-red-500">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="UF"
                maxLength={2}
                disabled={disabled}
                {...register('state')}
                className={`${inputBaseClass} uppercase ${errors.state ? 'border-red-500' : 'border-transparent'}`}
              />
              {errors.state && (
                <span className="text-xs text-red-500">
                  {errors.state.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 p-6 sm:p-8 rounded-2xl bg-card shadow-sm border border-light/50">
        <header className="flex gap-4 items-start">
          <CurrencyDollar
            className="text-primary mt-1"
            size={24}
            weight="regular"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-secondary">Pagamento</h2>
            <p className="text-sm text-secondary/70">
              O pagamento é feito na entrega. Escolha a forma de pagamento.
            </p>
          </div>
        </header>

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'Cartão de Crédito', icon: CreditCard },
                { id: 'Cartão de Débito', icon: Bank },
              ].map(({ id, icon: Icon }) => {
                const isSelected = field.value === id;
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={disabled}
                    onClick={() => field.onChange(id)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 uppercase text-xs tracking-wider font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed
                      ${isSelected ? 'bg-primary/10 border-primary text-secondary' : 'bg-light border-transparent text-secondary/60 hover:bg-light/80 hover:text-secondary'}`}
                  >
                    <Icon
                      size={20}
                      className={
                        isSelected ? 'text-primary' : 'text-secondary/60'
                      }
                    />{' '}
                    {id}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.paymentMethod && (
          <span className="text-xs text-red-500 font-medium -mt-4">
            {errors.paymentMethod.message}
          </span>
        )}
      </section>

      <button
        type="submit"
        disabled={disabled}
        className="w-full py-4 px-4 rounded-xl bg-primary text-white font-bold tracking-wide uppercase transition-all duration-300 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        Confirmar Dados
      </button>
    </form>
  );
}
