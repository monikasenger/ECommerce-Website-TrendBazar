import { useState } from "react";
import { FaThLarge } from "react-icons/fa";
import Banner from "../components/Banner";
import CategoryFilter from "../components/CategoryFilter";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      {/* Banner */}
      <Banner />

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-700 flex items-center gap-2">
          <FaThLarge /> Shop by Category
        </h2>
        <CategoryFilter
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

      {/* Items */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <CategorySection selected={selectedCategory} />
      </div>
    </div>
  );
};

export default Home;
