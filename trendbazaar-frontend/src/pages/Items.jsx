import { useState } from "react";
import { FaThLarge} from "react-icons/fa";
import CategoryFilter from "../components/CategoryFilter";
import CategorySection from "../components/CategorySection";


const Items = () => {
  const [selected, setSelected] = useState("all");

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Back Button */}
      
      
      {/* Page Title with Icon */}
      <h2 className="text-2xl font-bold px-6 py-4 flex items-center gap-2 text-orange-700">
        <FaThLarge /> Browse Items
      </h2>

      {/* Category Filter */}
      <div className="px-6">
        <CategoryFilter selected={selected} setSelected={setSelected} />
      </div>

      {/* Items Section */}
      <div className="px-6 mt-6">
        <CategorySection selected={selected} />
      </div>
    </div>
  );
};

export default Items;
