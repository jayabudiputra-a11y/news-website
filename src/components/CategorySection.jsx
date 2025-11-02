import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";

export default function CategorySection() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Kategori Populer</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all text-center font-semibold"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
