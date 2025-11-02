// src/components/Newsletter.jsx
import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return alert('Masukkan email valid');
    // Simpan di localStorage sebagai demo
    const list = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    localStorage.setItem('newsletter_emails', JSON.stringify([...list, email]));
    setSent(true);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
      <h3 className="text-xl font-bold">Langganan Newsletter</h3>
      <p className="text-sm mt-1">Dapatkan ringkasan berita tiap hari.</p>
      <form onSubmit={submit} className="mt-4 flex gap-2 max-w-md">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Anda" className="flex-1 px-3 py-2 rounded text-black" required />
        <button className="px-4 py-2 bg-white text-blue-600 rounded">Subscribe</button>
      </form>
      {sent && <div className="mt-2 text-sm text-white/90">Terima kasih! Email tersimpan.</div>}
    </div>
  );
}
