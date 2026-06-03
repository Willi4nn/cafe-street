import { ShoppingCart, Spinner } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onConfirm?: () => Promise<void>;
  toShoppingCart?: boolean;
  isLoading?: boolean;
}

export default function CartIcon({
  toShoppingCart = false,
  onConfirm,
  isLoading = false,
  ...rest
}: CartIconProps) {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isLoading) return;

    if (toShoppingCart) {
      return navigate('/shopping-cart');
    }

    try {
      setIsClicked(true);
      await onConfirm?.();
    } finally {
      setTimeout(() => setIsClicked(false), 300);
    }
  };

  const isPrimaryStyle = !!onConfirm;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative flex items-center justify-center p-2 rounded-lg cursor-pointer transition-all duration-200 outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
        active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
        ${
          isPrimaryStyle
            ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-md'
            : 'bg-transparent text-primary hover:bg-primary/10'
        }
      `}
      {...rest}
    >
      {isLoading ? (
        <Spinner size={24} className="animate-spin text-white" />
      ) : (
        <ShoppingCart
          size={24}
          weight="fill"
          className={`transition-transform ${isClicked ? 'scale-110' : 'scale-100'}`}
        />
      )}
    </button>
  );
}
