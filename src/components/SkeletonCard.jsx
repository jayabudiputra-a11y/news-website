// src/components/SkeletonCard.jsx
import React from "react";

export default function SkeletonCard({ featured = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden animate-pulse ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className={`${featured ? 'h-96' : 'h-48'} bg-gray-200`}></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}
