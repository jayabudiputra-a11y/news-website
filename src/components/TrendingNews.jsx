import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateISOToId } from '../utils/formatDate';

export default function TrendingNews({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h4 className="font-bold mb-3">Trending</h4>
      <ul className="space-y-3">
        {items.slice(0,6).map(it => (
          <li key={it.uuid || it.id} className="flex items-start">
            <img src={it.image_url} alt="" className="w-16 h-10 object-cover rounded mr-3" onError={(e)=>e.target.src='https://via.placeholder.com/150'} />
            <div>
              <Link to={`/news/${it.uuid || it.id}`} className="block font-medium line-clamp-2">{it.title}</Link>
              <div className="text-xs text-gray-500">{formatDateISOToId(it.published_at)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
