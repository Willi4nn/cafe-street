import { useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartProvider';
import { Product } from '../../types/cart';
import { PriceFormatter } from '../../utils/PriceFormatter';
import CartIcon from '../CartIcon';
import QuantitySelector from '../QuantitySelector';

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (quantity <= 0) return;

    setIsAdding(true);
    try {
      await addToCart(product, quantity);
      toast.success(`${product.name} adicionado ao carrinho!`);
      setQuantity(1);
    } catch {
      toast.error('Houve um erro ao adicionar seu produto.');
    } finally {
      setIsAdding(false);
    }
  }, [addToCart, product, quantity]);

  return (
    <article
      className="flex flex-col bg-card rounded-2xl shadow-sm p-4 gap-4 min-w-[250px] border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Imagem do Produto com aspect-ratio nativo em vez de heights hardcoded */}
      <figure className="relative aspect-square w-full rounded-xl overflow-hidden bg-light group">
        <img
          src={product.image}
          alt={`Foto ilustrativa de ${product.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full flex items-center px-3 py-1 shadow-sm"
          aria-label={`Avaliação de ${product.rating} estrelas`}
          title={`Avaliação de ${product.rating} estrelas`}
        >
          <span className="text-sm font-bold text-secondary mr-1">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-sm text-primary" aria-hidden="true">
            ★
          </span>
        </div>
      </figure>

      <div className="flex flex-col flex-1 justify-between gap-5">
        <header className="flex justify-between items-start gap-4">
          <h3
            id={`product-title-${product.id}`}
            className="font-bold text-xl text-secondary leading-tight line-clamp-2"
          >
            {product.name}
          </h3>
          <div className="text-primary font-bold text-lg whitespace-nowrap">
            <PriceFormatter value={product.price} />
          </div>
        </header>

        <section
          aria-label="Opções de temperatura"
          className="flex flex-wrap gap-2"
        >
          {product.available_temperature.map((temp) => (
            <span
              key={temp}
              className="text-[10px] border-2 border-primary/20 px-2.5 py-1.5 bg-primary/10 text-primary rounded-md uppercase tracking-widest font-bold"
            >
              {temp}
            </span>
          ))}
        </section>

        <footer className="flex items-center justify-between gap-3 mt-auto pt-5 border-t border-light/60">
          <QuantitySelector
            quantityInCart={quantity}
            onChange={setQuantity}
            min={1}
            max={99}
            aria-label="Selecionar quantidade"
          />
          <CartIcon
            onConfirm={handleAddToCart}
            isLoading={isAdding}
            aria-label={`Adicionar ${quantity} ${product.name} ao carrinho`}
          />
        </footer>
      </div>
    </article>
  );
}
