import { BirthdayWish } from '../types';

export const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: 'w1',
    author: 'Tu Esposo',
    relationship: 'Compañero de vida',
    text: 'Sandy, gracias por ser la melodía más dulce de mi vida. Le pido a Dios que este nuevo año te llene de risas, salud y sorpresas hermosas. Te amo profundamente.',
    createdAt: 'Hoy',
    candleColor: '#c9a86a',
    isPreloaded: true
  },
  {
    id: 'w2',
    author: 'Tus Hijos',
    relationship: 'Familia',
    text: '¡Feliz Cumpleaños, Mamá! Gracias por tus lonches, tus abrazos reconfortantes y por ser nuestro lugar seguro siempre. Eres la mejor mamá del mundo.',
    createdAt: 'Hoy',
    candleColor: '#b98a95',
    isPreloaded: true
  },
  {
    id: 'w3',
    author: 'Tus Alumnos y Amigos',
    relationship: 'Comunidad',
    text: 'Maestra Sandy, su paciencia y su luz nos inspiran todos los días. ¡Que Dios bendiga abundantly este nuevo ciclo!',
    createdAt: 'Hoy',
    candleColor: '#f2ecd8',
    isPreloaded: true
  }
];

const LOCAL_STORAGE_KEY = 'sandy_birthday_wishes_v1';

export function getStoredWishes(): BirthdayWish[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_WISHES;
    const parsed = JSON.parse(raw) as BirthdayWish[];
    return parsed.length ? parsed : INITIAL_WISHES;
  } catch {
    return INITIAL_WISHES;
  }
}

export function saveWish(newWish: Omit<BirthdayWish, 'id' | 'createdAt'>): BirthdayWish[] {
  const current = getStoredWishes();
  const wish: BirthdayWish = {
    ...newWish,
    id: 'w_' + Date.now(),
    createdAt: new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  };
  const updated = [wish, ...current];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }
  return updated;
}
