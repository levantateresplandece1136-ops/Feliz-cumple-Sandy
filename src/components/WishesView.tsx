import React, { useState } from 'react';
import { BirthdayWish } from '../types';
import { getStoredWishes, saveWish } from '../data/wishesData';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, Flame, User, MessageSquare } from 'lucide-react';

export const WishesView: React.FC = () => {
  const [wishes, setWishes] = useState<BirthdayWish[]>(getStoredWishes());
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#c9a86a');
  const [showForm, setShowForm] = useState(false);

  const candleColors = [
    { label: 'Oro Dorado', hex: '#c9a86a' },
    { label: 'Rosa Cálido', hex: '#b98a95' },
    { label: 'Plata Luna', hex: '#f2ecd8' },
    { label: 'Azul Noche', hex: '#6366f1' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    soundEngine.playCandleBlow();
    const updated = saveWish({
      author: author.trim(),
      relationship: relationship.trim() || 'Amigo / Familia',
      text: message.trim(),
      candleColor: selectedColor
    });

    setWishes(updated);
    setAuthor('');
    setRelationship('');
    setMessage('');
    setShowForm(false);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: [selectedColor, '#f2ecd8', '#ffffff']
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 text-[#b98a95] fill-[#b98a95]" />
          Muro de Amor
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ecd8]">
          Deseos y Bendiciones para <span className="italic text-[#c9a86a]">Sandy</span>
        </h2>
        <p className="font-sans text-xs text-[#d8d3c1]/70 max-w-md mx-auto">
          Enciende una vela de bendición y escribe tu mensaje especial para celebrar su cumpleaños.
        </p>
      </div>

      {/* Button to show write form */}
      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => {
              setShowForm(true);
              soundEngine.playChime();
            }}
            className="px-6 py-3 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#f2ecd8] transition-all flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(201,168,106,0.3)] active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Escribir deseo de cumpleaños</span>
          </button>
        </div>
      ) : (
        /* Write Wish Form Card */
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-5 rounded-3xl border border-[#c9a86a] space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#c9a86a]/20">
            <h3 className="font-serif text-lg text-[#f2ecd8] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c9a86a]" />
              Escribe tu mensaje para Sandy
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-[#b98a95] hover:underline"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-[11px] text-[#c9a86a] uppercase mb-1">
                Tu Nombre *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#f2ecd8]/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Ej. María o Carlos"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#0a0e1f]/80 border border-[#c9a86a]/30 rounded-xl pl-9 pr-3 py-2 text-sm text-[#f2ecd8] focus:border-[#c9a86a] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] text-[#c9a86a] uppercase mb-1">
                Relación o Parentesco
              </label>
              <input
                type="text"
                placeholder="Ej. Hermano, Amigo, Alumno"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-[#0a0e1f]/80 border border-[#c9a86a]/30 rounded-xl px-3 py-2 text-sm text-[#f2ecd8] focus:border-[#c9a86a] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[11px] text-[#c9a86a] uppercase mb-1">
              Tu Mensaje de Bendición *
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#f2ecd8]/40 absolute left-3 top-3" />
              <textarea
                required
                rows={3}
                placeholder="Escribe tus palabras con todo el cariño..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0a0e1f]/80 border border-[#c9a86a]/30 rounded-xl pl-9 pr-3 py-2 text-sm text-[#f2ecd8] focus:border-[#c9a86a] outline-none resize-none"
              />
            </div>
          </div>

          {/* Candle color selector */}
          <div>
            <label className="block font-sans text-[11px] text-[#c9a86a] uppercase mb-1.5">
              Color de tu Vela de Bendición
            </label>
            <div className="flex items-center gap-3">
              {candleColors.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center ${
                    selectedColor === color.hex ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-70'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                >
                  {selectedColor === color.hex && <Flame className="w-4 h-4 text-[#0a0e1f]" />}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#f2ecd8] transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Encender Vela & Enviar Mensaje</span>
          </button>
        </form>
      )}

      {/* Wishes List */}
      <div className="space-y-4">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="glass-panel p-5 rounded-2xl border border-[#c9a86a]/20 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#f2ecd8]/10">
              <div className="flex items-center gap-2">
                {/* Lit Candle Badge */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-md shrink-0"
                  style={{ backgroundColor: wish.candleColor + '30', border: `1px solid ${wish.candleColor}` }}
                >
                  <Flame className="w-4 h-4 animate-flicker" style={{ color: wish.candleColor }} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#f2ecd8] leading-tight">
                    {wish.author}
                  </h4>
                  <span className="font-sans text-[10px] text-[#c9a86a] uppercase tracking-wider">
                    {wish.relationship}
                  </span>
                </div>
              </div>

              <span className="font-sans text-[10px] text-[#f2ecd8]/40">
                {wish.createdAt}
              </span>
            </div>

            <p className="font-serif italic text-base text-[#f2ecd8]/90 leading-relaxed">
              "{wish.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
