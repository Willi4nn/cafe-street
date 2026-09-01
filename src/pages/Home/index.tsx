import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';
import aboutUsBg from '../../assets/about-us/bg-about-us.png';
import coffeeAbout from '../../assets/about-us/coffee-about.png';
import chooseYourCoffee from '../../assets/how-to-use/choose-your-coffee.png';
import coffeeCup from '../../assets/how-to-use/coffee-cup.png';
import foodTruck from '../../assets/how-to-use/food-truck.png';
import imgHeroBeans from '../../assets/img-hero-coffee-beans.png';
import imgHeroCoffee from '../../assets/img-hero-coffee.png';
import { ProductItem } from '../../components/ProductItem';
import { products } from '../../data/products';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const filteredProducts =
    searchInput.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchInput.trim().toLowerCase())
        )
      : products;

  return (
    <>
      <div className="relative w-full bg-background mt-[-104px] pt-[150px] lg:pt-[180px] pb-[220px] lg:pb-[280px] overflow-hidden">
        <img
          src={imgHeroBeans}
          alt="Grãos de Café"
          className="absolute top-0 right-0 w-[200px] sm:w-[350px] lg:w-[450px] object-contain opacity-90 pointer-events-none z-0"
        />

        <img
          src={imgHeroBeans}
          alt="Grãos de Café"
          className="absolute bottom-0 left-0 w-[180px] sm:w-[300px] lg:w-[400px] object-contain opacity-90 pointer-events-none z-0 rotate-180"
        />

        <section className="relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 w-full mb-16 lg:mb-24">
          <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-secondary leading-[1.1] tracking-tight">
              Aproveite seu <span className="text-primary">café</span>
              <br />
              antes da sua atividade
            </h1>
            <p className="text-secondary/70 text-lg lg:text-xl font-medium leading-relaxed max-w-[90%] mx-auto md:mx-0">
              Aumente sua produtividade e melhore seu humor com um copo de café
              pela manhã
            </p>
          </div>

          <div className="relative flex justify-center items-center w-full md:w-1/2">
            <img
              src={imgHeroCoffee}
              alt="Xícara de Cappuccino"
              className="relative z-10 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        <div
          id="menu"
          className="relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl w-full scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary drop-shadow-sm whitespace-nowrap">
              Popular{' '}
              <span className="border-b-4 border-primary pb-1">Agora</span>
            </h2>
            <div className="w-full sm:max-w-md relative flex items-center">
              <MagnifyingGlass
                size={24}
                weight="bold"
                className="absolute left-4 text-primary"
              />
              <input
                type="text"
                placeholder="Buscar produto..."
                className="w-full py-4 pl-12 pr-6 rounded-[2rem] shadow-sm border border-light bg-white text-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all placeholder:text-secondary/50 text-base"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-20 mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl -mt-[160px] lg:-mt-[220px] pb-24">
        <div className="mb-24">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-3xl border border-light border-dashed">
              <p className="text-lg text-secondary/70 font-medium">
                Nenhum produto encontrado para a sua busca.
              </p>
            </div>
          )}
        </div>

        <section id="delivery" className="flex flex-col mb-24 scroll-mt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary text-center mb-12">
            Como utilizar o serviço de entrega
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col gap-4 items-center group">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <img
                  src={chooseYourCoffee}
                  alt="Escolha seu café"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="font-bold text-xl text-secondary">
                Escolha seu café
              </h3>
              <p className="text-secondary/70 font-medium">
                Temos mais de 20 tipos de café para você
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center group">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <img
                  src={foodTruck}
                  alt="Nós entregamos para você"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="font-bold text-xl text-secondary">
                Nós entregamos
              </h3>
              <p className="text-secondary/70 font-medium">
                Serviço de entrega rápido e seguro
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center group">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <img
                  src={coffeeCup}
                  alt="Aprecie seu café"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="font-bold text-xl text-secondary">
                Aprecie seu café
              </h3>
              <p className="text-secondary/70 font-medium">
                Relaxe e aproveite sua bebida quente
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="about-us" className="relative scroll-mt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={aboutUsBg}
            alt="Fundo sobre nós"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={coffeeAbout}
                alt="Xícara de café ilustrativa"
                className="w-full max-w-[280px] lg:max-w-[400px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
                Sobre Nós
              </h2>
              <h3 className="font-bold text-xl sm:text-2xl text-secondary/90 leading-snug">
                Fornecemos café de qualidade,
                <br className="hidden md:block" /> pronto para entregar.
              </h3>
              <p className="text-base sm:text-lg text-secondary/70 leading-relaxed max-w-lg mx-auto md:mx-0">
                Somos uma empresa que fabrica e distribui deliciosas bebidas.
                Nosso principal produto é feito com uma receita secreta e está
                disponível em lojas de todo o mundo.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
