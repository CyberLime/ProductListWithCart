import { DESSERTS } from "../constants/desserts";
import DessertItem from "./DessertItem";

const Desserts = () => {
  return (
    <ul className="flex items-center justify-center flex-wrap gap-7 px-7">
      {DESSERTS.map((dessert) => (
        <DessertItem key={dessert.name} {...dessert} />
      ))}
    </ul>
  );
};

export default Desserts;
