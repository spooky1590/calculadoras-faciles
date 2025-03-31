import type { APIRoute } from 'astro';

const categories = [
  {
    title: 'Matemáticas y Educación',
    id: 'matematicas',
    calculators: [
      {
        title: 'Calculadora de Descuentos',
        description: 'Calcula fácilmente el precio final después de aplicar descuentos en tus compras. Ideal para rebajas y promociones.',
        href: '/calculadora-de-descuentos'
      },
      {
        title: 'Calculadora de Porcentaje de Descuento',
        description: 'Calcula qué porcentaje de descuento se ha aplicado entre el precio original y el precio rebajado.',
        href: '/calculadora-de-porcentaje-descuento'
      },
      {
        title: 'Calculadora de Divisiones',
        description: 'Divide fácilmente dos números y obtén el cociente y el residuo en segundos.',
        href: '/calculadora-de-divisiones'
      },
      {
        title: 'Calculadora de Redondeo',
        description: 'Redondea números fácilmente al entero más cercano o al número de decimales que elijas.',
        href: '/calculadora-de-redondeo'
      },
      {
        title: 'Calculadora de Años, Meses y Días',
        description: 'Calcula el tiempo exacto entre dos fechas en años, meses y días. Ideal para edad o duración entre eventos.',
        href: '/calculadora-de-anos-meses-y-dias'
      },
      {
        title: 'Calculadora de Notas',
        description: 'Calcula el promedio de tus calificaciones e interpreta tus resultados con un gráfico de barras.',
        href: '/calculadora-de-notas'
      }
    ]
  },
  {
    title: 'Trabajo y Finanzas',
    id: 'finanzas',
    calculators: [
      {
        title: 'Calculadora de Horas Trabajadas',
        description: 'Calcula el total de horas trabajadas por día o semana ingresando tus horarios de entrada y salida.',
        href: '/calculadora-de-horas-trabajadas'
      },
      {
        title: 'Calculadora de Interés Compuesto',
        description: 'Simula el crecimiento de tus inversiones con interés compuesto. Incluye aportes mensuales, inflación, gráficos y tabla detallada.',
        href: '/calculadora-de-interes-compuesto'
      },
      {
        title: 'Calculadora de Finiquito',
        description: 'Estima el monto de tu finiquito laboral considerando días trabajados, vacaciones y aguinaldo proporcional.',
        href: '/calculadora-de-finiquito'
      },
      {
        title: 'Calculadora ISR',
        description: 'Calcula el impuesto sobre la renta estimado según tu ingreso mensual y deducciones.',
        href: '/calculadora-isr'
      },
      {
        title: 'Calculadora Salarial (Costa Rica y Colombia)',
        description: 'Calcula tu salario neto mensual estimado en Costa Rica o Colombia según deducciones locales.',
        href: '/calculadora-salarial'
      }
    ]
  },
  {
    title: 'Embarazo y Fertilidad',
    id: 'embarazo',
    calculators: [
      {
        title: 'Calculadora de Embarazo',
        description: 'Calcula tu fecha probable de parto y semanas de embarazo basadas en tu última menstruación.',
        href: '/calculadora-de-embarazo'
      }
    ]
  },
  {
    title: 'Salud y Bienestar',
    id: 'salud',
    calculators: [
      {
        title: 'Calculadora de Sueño',
        description: 'Descubre la hora ideal para despertar según tus ciclos de sueño y mejora tu descanso nocturno.',
        href: '/calculadora-de-sueno'
      }
    ]
  }
];

// Additional static pages
const staticPages = [
  '/politica-de-privacidad',
  '/politica-de-cookies',
  '/terminos-y-condiciones'
];

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString();
  const baseUrl = 'https://calculadorasfaciles.com';

  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Add calculator pages
  categories.forEach(category => {
    category.calculators.forEach(calculator => {
      sitemap += `
  <url>
    <loc>${baseUrl}${calculator.href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  });

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  });

  // Close XML
  sitemap += '\n</urlset>';

  // Return response with correct content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};