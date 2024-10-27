import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import aboutUsBg from "../../assets/about-us/bg-about-us.png";
import coffeeAbout from "../../assets/about-us/coffee-about.png";
import chooseYourCoffee from "../../assets/how-to-use/choose-your-coffee.png";
import coffeeCup from "../../assets/how-to-use/coffee-cup.png";
import foodTruck from "../../assets/how-to-use/food-truck.png";
import introImg from "../../assets/intro.png";
import { Header } from "../../components/Header";
import { ProductItem } from "../../components/ProductItem";


export interface Product {
  id: number;
  name: string;
  rating: number;
  price: number;
  image: string;
  available_temperature: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vanilla Latte",
    rating: 4.8,
    price: 21000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
  {
    id: 2,
    name: "Espresso",
    rating: 4.8,
    price: 12000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
  {
    id: 3,
    name: "Hazelnut Latte",
    rating: 4.8,
    price: 23000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
  {
    id: 4,
    name: "Hazelnut Latte",
    rating: 4.8,
    price: 23000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
  {
    id: 5,
    name: "Hazelnut Latte",
    rating: 4.8,
    price: 23000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
  {
    id: 6,
    name: "Hazelnut Latte",
    rating: 4.8,
    price: 23000,
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWXTp19C3OwoGMoiMBsC1jrvVWj5mQOfO7XJKoJ62M1SSiC79W", // Replace with the actual image URL
    available_temperature: ["Hot", "Cold"],
  },
];
export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const filteredProducts = searchInput.length > 0
    ? products.filter((product) =>
      Object.values(product).join('').toLowerCase().includes(searchInput.toLowerCase())
    )
    : products;

  return (
    <>
      <Header />
      <div className="bg-background">
        <img className="m-auto object-cover mt-[-104px]"
          src={introImg}
          alt="Intro Image" />
      </div>
      <main className="mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row mt-[-120px] sm:mt-[-130px] md:mt-[-200px] lg:mt-[-300px] items-center justify-between gap-8">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap">Nossos Cafés</h1>
          <div className="w-full sm:flex-1 relative items-center">
            <MagnifyingGlass size={22} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Buscar produto" className="w-full h-[40px] pl-10 pr-3 rounded-lg shadow-lg 
             border-2 focus:outline-none focus:border-orange-500 transition duration-100"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className=" mt-10 mb-[300px]">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8  md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col mb-[300px]">
          <section id="delivery">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">Como utilizar o serviço de entrega</h2>
            <div className="flex justify-around mt-7 flex-wrap">
              <div className="flex flex-col gap-4 items-center">
                <img src={chooseYourCoffee} alt="Escolha seu café" />
                <h3 className="font-semibold text-xl">Escolha seu café</h3>
                <p>Temos mais de 20 tipos de café para você</p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <img src={foodTruck} alt="Nós entregamos para você" />
                <h3 className="font-semibold text-xl">Nós entregamos para você</h3>
                <p>Escolha o serviço de entrega</p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <img src={coffeeCup} alt="Aprecie seu café" />
                <h3 className="font-semibold text-xl">Aprecie seu café</h3>
                <p>Escolha o serviço de entrega</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer id="about-us" className="relative bg-[#FDF6EC]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={aboutUsBg} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl py-12">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={coffeeAbout}
                alt="Coffee"
                className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[450px] object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Sobre Nós</h2>
              <h3 className="font-semibold text-lg sm:text-xl">Fornecemos café de qualidade e pronto para entregar.</h3>
              <p className="text-sm sm:text-base">Somos uma empresa que fabrica e distribui deliciosas bebidas. Nosso principal produto é feito com uma receita secreta e está disponível em lojas de todo o mundo.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}