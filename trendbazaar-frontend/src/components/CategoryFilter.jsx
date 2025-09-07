import { useApp } from "../context/AppContext";
import { FaTshirt, FaMobileAlt, FaLaptop, FaCouch, FaGem } from "react-icons/fa"; // example icons

const CategoryFilter = ({ selected, setSelected }) => {
  const { items } = useApp();
  const categories = [...new Set(items.map((item) => item.category))];

  // Map category to an icon (add more if you have more categories)
  const categoryIcons = {
    Clothing: <FaTshirt />,
    Electronics: <FaMobileAlt />,
    Laptops: <FaLaptop />,
    Furniture: <FaCouch />,
    Accessories: <FaGem />,
  };

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-6 scrollbar-hide">
      {/* All Button */}
      <button
        onClick={() => setSelected("all")}
        className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 ${
          selected === "all"
            ? "bg-orange-600 text-white shadow-lg"
            : "bg-orange-100 text-orange-700 hover:bg-orange-200"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 ${
            selected === cat
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          {categoryIcons[cat] || <FaGem />}
          <span className="whitespace-nowrap">{cat}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
