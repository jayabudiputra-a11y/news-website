// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../utils/constants';
import { formatDateISOToId } from '../utils/formatDate';

export default function Hero({ article }) {
  if (!article) return null;
  const img = article.image_url || DEFAULT_PLACEHOLDER_IMAGE;
  return (
    <section className="rounded-xl overflow-hidden shadow-md">
      <div className="relative h-72 md:h-96">
        <img src={img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white max-w-2xl">
          <span className="bg-blue-600 px-3 py-1 rounded text-xs">{article.categories?.[0]}</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3">{article.title}</h2>
          <p className="mt-2 text-sm">{article.description}</p>
          <div className="mt-3 text-xs">{formatDateISOToId(article.published_at)} • {article.source || ''}</div>
          <Link to={`/news/${article.uuid || article.id}`} className="inline-block mt-4 px-4 py-2 bg-white text-black rounded">Baca selengkapnya</Link>
        </div>
      </div>
    </section>
  );
}
