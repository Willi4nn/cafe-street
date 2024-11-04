import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo-coffee.svg';
import { useCart } from '../../hooks/useCart';
import CartIcon from '../CartIcon';
import LocationTag from '../LocationTag';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <nav className="flex h-[104px] items-center justify-between">
          <Link to="/"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <img src={logoImg} alt="logo" />
          </Link>
          <ul className="hidden md:flex flex-wrap space-x-4 lg:space-x-8 text-sm font-semibold md:text-base">
            <li><a href="#about-us" className="hover:text-primary">
              Sobre Nós
            </a></li>
            <li><a href="#delivery" className="hover:text-primary">Entrega</a></li>
          </ul>
          <div className="flex gap-3 items-center relative">
            <LocationTag city="Patos de Minas" state="MG" />
            <Link to="/shopping-cart" className="relative">
              <CartIcon />
              {totalItems > 0 && (
                <span
                  className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}