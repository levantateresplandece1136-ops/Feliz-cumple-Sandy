import { GameLevel } from '../types';

export const GAME_LEVELS_DATA: GameLevel[] = [
  {
    id: 1,
    stageName: 'Nivel 1 — Infancia en Villahermosa',
    title: 'Los Sueños de la Niñez',
    subtitle: 'Atrapa las 5 estrellas de la inocencia y los valores para formar tu luz inicial.',
    iconName: 'Sparkles',
    themeColor: '#c9a86a',
    recognitionTitle: 'Reconocimiento a la Inocencia y Alegría',
    recognitionText: 'Desde tus primeros pasos en Villahermosa, aprendiste a soñar en grande. Cada sonrisa de tu infancia sembró la nobleza y la sencillez que hoy cautivan a todos.',
    quoteVerse: {
      text: 'Antes que te formase en el vientre te conocí.',
      reference: 'Jeremías 1:5'
    },
    badgeUnlocked: 'Estrella de los Sueños',
    badgeDescription: 'Guarda la pureza del corazón y la alegría de empezar.',
    badgeIcon: 'Star',
    mechanicType: 'collect_stars',
    instructions: 'Toca o haz clic en las 5 estrellas resplandecientes antes de que desaparezcan para iluminar tu camino.'
  },
  {
    id: 2,
    stageName: 'Nivel 2 — El Canto del Alma',
    title: 'La Melodía de la Fe',
    subtitle: 'Reproduce la secuencia de notas armónicas para elevar una alabanza celestial.',
    iconName: 'Music',
    themeColor: '#14b8a6',
    recognitionTitle: 'Reconocimiento al Talento y la Voz de Bendición',
    recognitionText: 'Incluso cuando el camino se tornó difícil, tu voz encontró la nota perfecta para elevar oraciones y dar paz. Tu canto consuela y transforma corazones.',
    quoteVerse: {
      text: 'Puso luego en mi boca cántico nuevo, alabanza a nuestro Dios.',
      reference: 'Salmo 40:3'
    },
    badgeUnlocked: 'Lira Harmoniosa',
    badgeDescription: 'Voz que restaura, inspira y alaba con devoción.',
    badgeIcon: 'Music',
    mechanicType: 'melody_sequence',
    instructions: 'Escucha y presiona las notas musicales en el orden correcto para completar la melodía.'
  },
  {
    id: 3,
    stageName: 'Nivel 3 — Valentía y Nuevos Horizontes',
    title: 'El Viaje de la Fe',
    subtitle: 'Navega a través de las nubes de incertidumbre para llegar al destino preparado por Dios.',
    iconName: 'Compass',
    themeColor: '#eab308',
    recognitionTitle: 'Reconocimiento a la Valentía y Coraje',
    recognitionText: 'Dejar el hogar natal requiere un valor inmenso. Demostraste que la fe es más fuerte que cualquier distancia y que Dios prepara cada encuentro con propósito.',
    quoteVerse: {
      text: 'Yo sé los pensamientos que tengo acerca de vosotros... pensamientos de paz.',
      reference: 'Jeremías 29:11'
    },
    badgeUnlocked: 'Brújula del Destino',
    badgeDescription: 'Determinación para caminar guiada por la mano de Dios.',
    badgeIcon: 'Compass',
    mechanicType: 'courage_path',
    instructions: 'Guía la estrella encendida tocando los portales de luz dorada para despejar la niebla del camino.'
  },
  {
    id: 4,
    stageName: 'Nivel 4 — Maternidad y el Hogar',
    title: 'Cosecha de Amor Incondicional',
    subtitle: 'Recibe los corazones de amor, ternura y cuidados de madre.',
    iconName: 'Heart',
    themeColor: '#b98a95',
    recognitionTitle: 'Reconocimiento a la Maternidad Abnegada',
    recognitionText: 'Lonches de madrugada, noches de desvelo, oraciones protectoras y abrazos que sanan cualquier dolor. Tu entrega como mamá es un legado eterno.',
    quoteVerse: {
      text: 'Sus hijos se levantan y la llaman bienaventurada.',
      reference: 'Proverbios 31:28'
    },
    badgeUnlocked: 'Corazón Dulce Hogar',
    badgeDescription: 'Amor incondicional que protege, nutre y abraza.',
    badgeIcon: 'Heart',
    mechanicType: 'love_rain',
    instructions: 'Toca todos los corazones de amor que caen suavemente para llenar el frasco del hogar.'
  },
  {
    id: 5,
    stageName: 'Nivel 5 — La Maestra de Corazón',
    title: 'Sembrando Luz de Sabiduría',
    subtitle: 'Conecta los puntos del conocimiento para encender las mentes de tus alumnos.',
    iconName: 'BookOpen',
    themeColor: '#34d399',
    recognitionTitle: 'Reconocimiento a la Docencia y Sabiduría',
    recognitionText: 'Explicar con paciencia, creer en el potencial de cada niño y enseñar con amor. Tu impacto no se queda en las aulas, se graba para siempre en la eternidad.',
    quoteVerse: {
      text: 'Los que enseñan la justicia resplandecerán como las estrellas.',
      reference: 'Daniel 12:3'
    },
    badgeUnlocked: 'Antorcha del Maestro',
    badgeDescription: 'Luz de conocimiento que ilumina el futuro de generaciones.',
    badgeIcon: 'BookOpen',
    mechanicType: 'wisdom_connect',
    instructions: 'Toca las 4 constelaciones de la sabiduría en orden numerado para formar la insignia de la enseñanza.'
  },
  {
    id: 6,
    stageName: 'Nivel 6 — Gran Final de Vida',
    title: 'Reconocimiento Cumpleaños — Corona de Gracia',
    subtitle: 'Un homenaje a tu vida completa: Sostenida, Amada, Nueva, Dádiva.',
    iconName: 'Award',
    themeColor: '#f2ecd8',
    recognitionTitle: 'Gran Reconocimiento de Vida para Sandy',
    recognitionText: '¡Felicidades! Has completado el viaje por los capítulos de tu vida. Dios ha estado en cada paso y el mejor capítulo aún está por escribirse.',
    quoteVerse: {
      text: 'Con amor eterno te he amado; por tanto, te prolongué mi misericordia.',
      reference: 'Jeremías 31:3'
    },
    badgeUnlocked: 'Corona Celestial de la Victoria',
    badgeDescription: 'Sostenida, Amada, Nueva, Dádiva. ¡Siempre estuviste siendo amada!',
    badgeIcon: 'Trophy',
    mechanicType: 'final_trophy',
    instructions: '¡Presiona la gran Corona de Cumpleaños para desbloquear la celebración final con confeti y música!'
  }
];
