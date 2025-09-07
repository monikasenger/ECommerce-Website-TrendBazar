import { useApp } from "../context/AppContext";
import ItemCard from "./ItemCard";
import { FaStar, FaFire, FaGem, FaGift } from "react-icons/fa";

const TopItems = () => {
  const { items } = useApp();
  const top = items.slice(0, 4);

  // Icons for top items (you can rotate or assign dynamically)
  const icons = [<FaStar className="text-orange-500" />, <FaFire className="text-orange-500" />, <FaGem className="text-orange-500" />, <FaGift className="text-orange-500" />];

  return (
    <section className="py-10 px-6 bg-orange-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 flex justify-center items-center gap-2">
        <FaStar /> Top Items <FaFire />
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {top.map((item, index) => (
          <div
            key={item._id}
            className="relative group border rounded-lg p-2 shadow hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            {/* Top item icon */}
            <div className="absolute top-2 right-2 text-lg">
              {icons[index] || <FaStar className="text-orange-500" />}
            </div>

            {/* ItemCard */}
            <ItemCard item={item} />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopItems;
