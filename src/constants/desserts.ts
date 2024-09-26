import WaffleImg from "/assets/images/image-waffle-desktop.jpg";
import CremeBruleeImg from "/assets/images/image-creme-brulee-desktop.jpg";
import MacaronImg from "/assets/images/image-macaron-desktop.jpg";
import TiramisuImg from "/assets/images/image-tiramisu-desktop.jpg";
import BaklavaImg from "/assets/images/image-baklava-desktop.jpg";
import PieImg from "/assets/images/image-meringue-desktop.jpg";
import CakeImg from "/assets/images/image-cake-desktop.jpg";
import BrownieImg from "/assets/images/image-brownie-desktop.jpg";
import PannaCottaImg from "/assets/images/image-panna-cotta-desktop.jpg";

export const DESSERTS: {
  img: string;
  name: string;
  fullname: string;
  price: number;
}[] = [
  {
    img: WaffleImg,
    name: "Waffle",
    fullname: "Waffle with Berries",
    price: 6.5,
  },
  {
    img: CremeBruleeImg,
    name: "Crème brûlée",
    fullname: "Vanilla Bean Crème Brûlée",
    price: 7.0,
  },
  {
    img: MacaronImg,
    name: "Macaron",
    fullname: "Macaron Mix of Five",
    price: 8.0,
  },
  {
    img: TiramisuImg,
    name: "Tiramisu",
    fullname: "Classic Tiramisu",
    price: 5.5,
  },
  {
    img: BaklavaImg,
    name: "Baklava",
    fullname: "Pistachio Baklava",
    price: 4.0,
  },
  { img: PieImg, name: "Pie", fullname: "Lemon Meringue Pie", price: 5.0 },
  { img: CakeImg, name: "Cake", fullname: "Red Velvet Cake", price: 4.5 },
  {
    img: BrownieImg,
    name: "Brownie",
    fullname: "Salted Caramel Brownie",
    price: 5.5,
  },
  {
    img: PannaCottaImg,
    name: "Panna Cotta",
    fullname: "Vanilla Panna Cotta",
    price: 6.5,
  },
];
