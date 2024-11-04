import cappuccinoImg from "../assets/products/cappucino.png";
import coffeeIceCreamImg from "../assets/products/coffee-ice-cream.png";
import espressoImg from "../assets/products/espresso.png";
import hazelnutLatteImg from "../assets/products/hazelnut-latte.png";
import moccacinnoImg from "../assets/products/moccacinno.png";
import vanillaLatteImg from "../assets/products/vanilla-latte.png";
import waffleIceCreamImg from "../assets/products/waffle-ice-crem.png";
import { Product } from "../types/cart";


export const products: Product[] = [
  {
    id: 1,
    name: "Vanilla Latte",
    rating: 4.8,
    price: 2.1,
    image: vanillaLatteImg,
    available_temperature: ["COM LEITE", "ESPECIAL"],
  },
  {
    id: 2,
    name: "Cappuccino",
    rating: 4.9,
    price: 1.9,
    image: cappuccinoImg,
    available_temperature: ["COM LEITE", "TRADICIONAL"],
  },
  {
    id: 3,
    name: "Coffee Ice Cream",
    rating: 4.7,
    price: 2.4,
    image: coffeeIceCreamImg,
    available_temperature: ["GELADO", "ESPECIAL"],
  },
  {
    id: 4,
    name: "Espresso",
    rating: 4.6,
    price: 1.5,
    image: espressoImg,
    available_temperature: ["TRADICIONAL"],
  },
  {
    id: 5,
    name: "Hazelnut Latte",
    rating: 4.8,
    price: 2.3,
    image: hazelnutLatteImg,
    available_temperature: ["COM LEITE", "ESPECIAL"],
  },
  {
    id: 6,
    name: "Moccacino",
    rating: 4.7,
    price: 2.2,
    image: moccacinnoImg,
    available_temperature: ["COM LEITE", "ESPECIAL"],
  },
  {
    id: 7,
    name: "Waffle Ice Cream",
    rating: 4.9,
    price: 2.6,
    image: waffleIceCreamImg,
    available_temperature: ["GELADO", "ESPECIAL"],
  },
];
