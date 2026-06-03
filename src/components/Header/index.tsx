import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo-coffee.svg';
import { CartContext } from '../../context/CartProvider';
import CartIcon from '../CartIcon';
import LocationTag from '../LocationTag';

export function Header() {
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (hash: string): void => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.location.hash = hash;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-md border-b border-light/40 shadow-sm transition-colors">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <nav className="flex h-[104px] items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <img src={logoImg} alt="Logo Cafe Street" />
          </Link>

          <ul className="hidden md:flex flex-wrap space-x-4 lg:space-x-8 text-sm font-bold text-secondary uppercase tracking-wider">
            <li>
              <button
                onClick={() => handleNavigation('#about-us')}
                className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Sobre Nós
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('#delivery')}
                className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Entrega
              </button>
            </li>
          </ul>

          <div className="flex gap-3 items-center relative">
            <LocationTag city="Patos de Minas" state="MG" />

            <Link
              to="/shopping-cart"
              className="relative p-1 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border border-white/80">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
