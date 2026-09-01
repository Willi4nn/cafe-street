import { ShoppingCart, Spinner } from '@phosphor-icons/react';
import { useState } from 'react';

interface CartIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export default function CartIcon({
  onConfirm,
  isLoading = false,
  ...rest
}: CartIconProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsClicked(true);
      await onConfirm();
    } finally {
      setTimeout(() => setIsClicked(false), 300);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative flex items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all duration-300 outline-none
        focus-visible:ring-4 focus-visible:ring-primary/50 active:scale-90 disabled:opacity-60 disabled:cursor-not-allowed
        bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg
      `}
      {...rest}
    >
      {isLoading ? (
        <Spinner size={22} className="animate-spin text-white" weight="bold" />
      ) : (
        <ShoppingCart
          size={22}
          weight="fill"
          className={`transition-transform duration-300 ${isClicked ? 'scale-125' : 'scale-100'}`}
        />
      )}
    </button>
  );
}
