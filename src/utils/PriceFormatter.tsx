interface PriceFormatterProps {
  value: number;
}

export function PriceFormatter({ value }: PriceFormatterProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return <span className="font-semibold text-xl">{formattedPrice}</span>;
}
