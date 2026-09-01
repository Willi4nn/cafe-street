import { List, Package, ShoppingCart, X } from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo-coffee.svg';
import { CartContext } from '../../context/CartProvider';

export function Header() {
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (hash: string): void => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      window.location.hash = hash;
    }, 100);
  };

  const navItems = [
    { label: 'Sobre Nós', hash: '#about-us' },
    { label: 'Entrega', hash: '#delivery' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-light/50 shadow-sm transition-all">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <nav className="flex h-[104px] items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform active:scale-95 z-50"
            aria-label="Voltar para a página inicial"
          >
            <img
              src={logoImg}
              alt="Logo Cafe Street"
              className="w-[120px] sm:w-[150px]"
            />
          </Link>

          <ul className="hidden md:flex items-center space-x-8 text-sm font-bold text-secondary uppercase tracking-wider">
            {navItems.map((item) => (
              <li key={item.hash}>
                <button
                  onClick={() => handleNavigation(item.hash)}
                  className="relative py-2 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5 sm:gap-6 z-50">
            <Link
              to="/orders"
              className="text-primary hover:scale-110 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label="Meus Pedidos"
              title="Meus Pedidos"
            >
              <Package size={26} weight="fill" />
            </Link>

            <Link
              to="/shopping-cart"
              className="relative text-primary hover:scale-110 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label={`Carrinho de compras com ${totalItems} itens`}
            >
              <ShoppingCart size={26} weight="fill" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-sm">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Alternar menu de navegação"
              className="md:hidden text-primary hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-sm"
            >
              {isMenuOpen ? (
                <X size={28} weight="bold" />
              ) : (
                <List size={28} weight="bold" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`md:hidden absolute top-[104px] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-light/50 transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? 'max-h-[200px] opacity-100 shadow-xl'
            : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-4 sm:px-6 gap-2">
          {navItems.map((item) => (
            <li key={item.hash}>
              <button
                onClick={() => handleNavigation(item.hash)}
                className="w-full text-left py-3 px-4 font-bold text-secondary uppercase tracking-wider rounded-xl hover:bg-primary/10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
