import { useApp } from "../context/AppContext";
import ItemCard from "./ItemCard";
import { FaTshirt, FaMobileAlt, FaLaptop, FaCouch, FaGem } from "react-icons/fa"; // icons

const CategorySection = ({ selected }) => {
  const { items } = useApp();

  const filteredItems =
    selected === "all"
      ? items
      : items.filter((item) => item.category === selected);

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-4">
      {filteredItems.map((item) => (
        <div
          key={item._id}
          >
       
          {/* ItemCard */}
          <ItemCard item={item} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
