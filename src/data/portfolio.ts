export interface CraftProject {
  slug: string;
  index: string;
  category: string;
  title: string;
  hook: string;
  story: string;
  metricBadge: string;
  tags: string[];
  sandboxId?: 'cohort' | 'cannibal' | 'geo' | 'etl';
  // Deep-dive page fields
  context: string;
  challenge: string;
  approach: string[];
  tradeoffs: string[];
  outcome: string;
  flow: { step: string; detail: string }[];
  snippet: {
    title: string;
    language: string;
    note: string;
    code: string;
  };
}

export interface IdeaNote {
  id: string;
  tag: string;
  readTime: string;
  title: string;
  teaser: string;
  body: string[];
  promptTopic: string;
}

export const siteMeta = {
  name: 'Lucas Vargas',
  handle: 'lucasvargas.site',
  location: 'Santiago, Chile',
  email: 'lucasdamian.vb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucasdvb/',
  cvUrl:
    'https://docs.google.com/document/d/1pxzhSdwJtZu6oXfSiP-ZUwfRGImtrxEHDwWzOVJ9hUo/edit',
  heroThesis:
    'Armo sistemas donde los datos, el criterio de producto y la automatización con IA conversan para resolver problemas reales.',
};

export const nowParagraphs = [
  'Vengo de Ciencias Sociales en la UC (Comunicaciones + Emprendimiento) y terminé metido de cabeza en datos, producto y automatización. Esa mezcla rara hace que me importe mucho más entender la pregunta de negocio y el comportamiento humano detrás de una caída de retención que llenar pantallas de gráficos bonitos.',
  'Hoy mi tiempo se reparte entre modelar cohortes, churn y CLV en seguros masivos, experimentar con posicionamiento de marcas dentro de respuestas de LLMs (GEO/AEO) y construir pipelines en Python, n8n y Claude Code que eliminen planillas manuales.',
  'Esta página no es mi currículum (para eso ya existe el PDF). Es un lugar vivo para mostrar cómo pienso, dejar un par de juguetes analíticos probables directo en el navegador y abrir buenas conversaciones.',
];

export const craftProjects: CraftProject[] = [
  {
    slug: 'cohortes-retencion-seguros',
    index: '01',
    category: 'Data & Product Analytics',
    title: 'Curvas de supervivencia, Churn & CLV en alianzas masivas',
    hook: 'Mirar el promedio mensual miente: la verdad vive en cómo envejece cada cohorte.',
    story:
      'En seguros masivos, cruzar ventas, siniestros, reclamos y bajas cambia por completo qué mejoras priorizar en producto. Dejé abajo un simulador vivo para jugar con la sensibilidad entre churn mensual y valor de vida.',
    metricBadge: 'Cohortes · Power BI · -10 h/mes ETL',
    tags: ['Power BI / DAX', 'Python ETL', 'Claude Code', 'Cohortes', 'CLV'],
    sandboxId: 'cohort',
    context:
      'En productos financieros y seguros distribuidos en alianzas de alto volumen, el promedio agregado oculta si el abandono ocurre en los primeros 60 días (fricción de onboarding o promesa) o tras un siniestro/reclamo.',
    challenge:
      'Consolidar fuentes heterogéneas sin trabajo manual repetitivo y transformar tablas dispersas en una lectura clara de permanencia por segmento.',
    approach: [
      'Modelamiento de cohortes mensuales y segmentación de cartera para seguir retención, churn y CLV real.',
      'Modelo tabular en Power BI con Power Query y DAX separando métricas operativas (siniestros/reclamos) de salud de ciclo de vida.',
      'Flujos ETL reproducibles en Python asistidos con Claude Code para extraer, normalizar llaves y consolidar bases multi-fuente.',
    ],
    tradeoffs: [
      'Priorizar un esquema estrella auditable antes que visualizaciones complejas difíciles de sostener cuando cambian los archivos de origen.',
      'Mantener reglas deterministas en Python para limpieza y cálculo numérico, evitando transformaciones frágiles a mano.',
    ],
    outcome:
      '10 horas mensuales recuperadas en consolidación de datos y visibilidad continua de qué palancas mueven retención y evolución de producto.',
    flow: [
      { step: 'Fuentes', detail: 'Ventas, bajas, siniestros y reclamos' },
      { step: 'ETL Python', detail: 'Limpieza, llaves y validación automática' },
      { step: 'Modelo DAX', detail: 'Cohortes de permanencia y CLV' },
      { step: 'Producto', detail: 'Foco en fricciones reales de uso' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Matriz de retención por cohorte (SQL)',
      language: 'sql',
      note: 'Ejemplo genérico de lógica analítica (sin datos ni esquemas reales).',
      code: `WITH cohortes AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', start_date) AS cohort_month,
    DATE_TRUNC('month', active_month) AS activity_month
  FROM subscriptions_activity
)
SELECT
  cohort_month,
  (EXTRACT(YEAR FROM activity_month) - EXTRACT(YEAR FROM cohort_month)) * 12
    + (EXTRACT(MONTH FROM activity_month) - EXTRACT(MONTH FROM cohort_month)) AS month_n,
  COUNT(DISTINCT customer_id) AS active_users
FROM cohortes
GROUP BY 1, 2
ORDER BY 1, 2;`,
    },
  },
  {
    slug: 'canibalizacion-paid-organic',
    index: '02',
    category: 'Growth & Attribution',
    title: 'Radar de canibalización Paid vs. Organic',
    hook: 'Pagar por clics que tu resultado orgánico Top 3 ya capturaba es quemar margen en silencio.',
    story:
      'Conectando GA4, Search Console, Google Ads y Meta Ads junto a scraping en Python, logramos detectar solapamiento directo y liberar $6M CLP mensuales de pauta redundante sin caer en conversiones.',
    metricBadge: '$6M CLP/mes recuperados',
    tags: ['Looker Studio', 'GA4 + GSC', 'Google & Meta Ads', 'Python Scraping'],
    sandboxId: 'cannibal',
    context:
      'Cuando Paid Search y SEO reportan en planillas separadas, las campañas de búsqueda terminan adjudicándose demanda que ya estaba capturada orgánicamente.',
    challenge:
      'Cruzar intención de búsqueda, posición orgánica y costo publicitario en un mismo tablero auditable por negocio y performance.',
    approach: [
      '5 dashboards integrados en Looker Studio unificando GA4, Search Console, Google Ads y Meta Ads.',
      'Web scraping con Screaming Frog y Python para mapear cobertura y oportunidades de demanda orgánica.',
      'Criterios objetivos para distinguir pujas defensivas necesarias de gasto redundante.',
    ],
    tradeoffs: [
      'Usar reglas transparentes de solapamiento (ranking + presión de subasta) en vez de modelos estadísticos caja negra que nadie en comercial adopta.',
    ],
    outcome:
      'Detección de canibalización SEM/SEO con un ahorro directo de $6M CLP mensuales y mejor coordinación entre canales.',
    flow: [
      { step: 'Integración', detail: 'GA4 + GSC + Google Ads + Meta Ads' },
      { step: 'Scraping', detail: 'Mapeo técnico con Screaming Frog + Python' },
      { step: 'Cruce', detail: 'Ranking orgánico vs. costo por término' },
      { step: 'Reasignación', detail: '$6M CLP/mes liberados a demanda incremental' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Regla de solapamiento SEM/SEO (Python)',
      language: 'python',
      note: 'Ejemplo conceptual del filtro diagnóstico.',
      code: `def flag_cannibalization(df):
    overlap = (
        (df["seo_avg_position"] <= 3.0)
        & (df["seo_impressions"] >= 500)
        & (df["sem_cost_clp"] > 0)
        & (df["competitor_ads_density"] < 0.3)
    )
    df["recoverable_clp"] = df["sem_cost_clp"].where(overlap, 0)
    return df.sort_values("recoverable_clp", ascending=False)`,
    },
  },
  {
    slug: 'producto-geo-aeo-retail',
    index: '03',
    category: '0→1 Product & LLMs',
    title: 'GEO / AEO Lab: cuando la búsqueda ocurre dentro de un LLM',
    hook: 'Diseñé desde cero un producto de posicionamiento en motores generativos (+$4M CLP año 1).',
    story:
      'Además de escalar cuentas retail (+15% YoY con márgenes >55%), investigué cómo citan los LLMs a las marcas y empaqueté ese hallazgo en un servicio real. Abajo puedes probar un mini-evaluador interactivo de señales GEO.',
    metricBadge: '+$4M CLP año 1 · +15% YoY',
    tags: ['GEO / AEO', 'Product Discovery', 'E-commerce Retail', 'Unit Economics'],
    sandboxId: 'geo',
    context:
      'Cada vez más decisiones de compra y comparación ocurren dentro de ChatGPT, Gemini o Perplexity antes de tocar un buscador clásico.',
    challenge:
      'Transformar una tendencia emergente y volátil en un producto comercial con alcance claro, precio rentable y entregables medibles.',
    approach: [
      'Investigación de mercado, propuesta de valor y definición de producto de 0 a 1 para auditoría y posicionamiento en LLMs (GEO/AEO).',
      'Auditorías SEO data-driven y estrategia de linkbuilding para grandes cuentas retail (Chile y Colombia) cuidando márgenes >55%.',
    ],
    tradeoffs: [
      'Evitar promesas mágicas sobre prompts y centrar el producto en señales verificables: entidad, fuentes citadas, datos estructurados y cobertura comparativa.',
    ],
    outcome:
      '+$4M CLP en ventas en su primer año y +15% de crecimiento interanual en cuentas retail manteniendo márgenes brutos >55%.',
    flow: [
      { step: 'Discovery', detail: 'Investigación de citación en ChatGPT / Gemini' },
      { step: 'Producto', detail: 'Scope, pricing y matriz de diagnóstico' },
      { step: 'Tracción', detail: '+$4M CLP primer año desde cero' },
      { step: 'Retail', detail: '+15% YoY con margen >55%' },
    ],
    snippet: {
      title: 'Checklist de auditoría GEO / AEO',
      language: 'text',
      note: 'Ejes evaluados en visibilidad dentro de motores de respuesta.',
      code: `01 · Share of Model en prompts comparativos
02 · Precisión de atributos (precio, despacho, cobertura)
03 · Autoridad en fuentes terceras que alimentan RAG / web search
04 · Datos estructurados y arquitectura semántica citable`,
    },
  },
  {
    slug: 'automatizacion-etl-ia',
    index: '04',
    category: 'AI Engineering & Workflows',
    title: 'Sistemas ETL y herramientas internas con Python, n8n & Claude',
    hook: 'Dejar que el código haga la matemática y la IA resuelva el contexto.',
    story:
      'Entre agencia y seguros armé flujos automatizados con Python, Claude Code, n8n, Apps Script y APIs que hoy ahorran 25 horas al mes de trabajo mecánico. Aquí puedes explorar cómo diseño cada capa sin perder rigor.',
    metricBadge: '25 h/mes automatizadas',
    tags: ['Python', 'n8n', 'Apps Script', 'APIs', 'Claude Code', 'Gemini'],
    sandboxId: 'etl',
    context:
      'El mayor ladrón de tiempo en análisis no es pensar hipótesis, sino bajar CSVs, cruzar IDs rotos y formatear reportes repetitivos.',
    challenge:
      'Construir automatizaciones rápidas pero auditables, donde un error de fuente falle ruidosamente en lugar de propagar datos falsos.',
    approach: [
      'Pipelines ETL en Python junto a Claude Code para consolidar bases multi-fuente (-10 h/mes).',
      'Workflows internos con ChatGPT, Gemini, n8n, Apps Script y APIs para agilizar análisis de métricas (-15 h/mes).',
    ],
    tradeoffs: [
      'Cero aritmética probabilística en LLMs: los cálculos siempre corren en Python o fórmulas explícitas; la IA asiste en código, clasificación o síntesis.',
    ],
    outcome:
      '25 horas mensuales liberadas y flujos reutilizables documentados bajo control de versiones con Git.',
    flow: [
      { step: 'Extract', detail: 'APIs / Sheets / CSVs multi-fuente' },
      { step: 'Transform', detail: 'Python determinista + reglas de negocio' },
      { step: 'Validate', detail: 'Asserts de llaves, nulos y rangos' },
      { step: 'Deliver', detail: 'n8n / BI / alertas listas para decidir' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Guardrails en pipeline ETL (Python)',
      language: 'python',
      note: 'Separación clara entre validación determinista e ingesta.',
      code: `def validate_and_merge(frames):
    df = pd.concat(frames, ignore_index=True)
    assert df["record_id"].notna().all(), "Null primary key detected"
    df = df.drop_duplicates(subset=["record_id"], keep="last")
    return df`,
    },
  },
];

export const ideaNotes: IdeaNote[] = [
  {
    id: 'dashboards-decisiones',
    tag: 'Producto & BI',
    readTime: '1 min',
    title: 'Por qué la mayoría de los dashboards no cambian ninguna decisión',
    teaser:
      'Un tablero lleno de promedios globales sirve para tranquilizar la conciencia, no para operar.',
    body: [
      'Casi todos los equipos piden "un dashboard con todo" y terminan con 18 gráficos que nadie abre después de la tercera semana. El problema rara vez es la herramienta (Power BI, Looker o Sheets): es que nadie definió qué decisión concreta cambia si un número sube o baja.',
      'Cuando pasas de mirar promedios a separar por cohortes, etapa del embudo o motivo de fricción (por ejemplo, reclamos o solapamiento de pauta), los gráficos dejan de ser decorativos y se vuelven incómodos — que es exactamente cuando empiezan a servir.',
    ],
    promptTopic: 'Debatir sobre métricas accionables vs. dashboards decorativos',
  },
  {
    id: 'geo-aeo-discovery',
    tag: 'Growth & LLMs',
    readTime: '1 min',
    title: 'El discovery ya no vive solo en 10 links azules',
    teaser:
      'Cuando un usuario pregunta en ChatGPT o Gemini qué seguro o tienda elegir, tu embudo empieza antes del clic.',
    body: [
      'Durante años optimizar visibilidad significó pelear por posiciones en Google. Hoy gran parte de la investigación previa —comparar marcas, entender coberturas, chequear confianza— ocurre sintetizada dentro de un modelo generativo.',
      'Lo interesante de trabajar en GEO/AEO es que obliga a unir producto, contenido y autoridad externa: si tus atributos son ambiguos o los sitios que los LLMs citan no te respaldan, simplemente desapareces de la conversación aunque tu anuncio siga corriendo.',
    ],
    promptTopic: 'Conversar sobre GEO / AEO y visibilidad en LLMs',
  },
  {
    id: 'ia-con-rigor',
    tag: 'IA & Automatización',
    readTime: '1 min',
    title: 'IA para analistas: código determinista para los números, LLMs para el contexto',
    teaser:
      'Usar Claude Code o n8n multiplica la velocidad, siempre que nunca delegues aritmética ni validaciones a ciegas.',
    body: [
      'El error más común al meter IA en flujos de datos es pedirle al modelo que "analice una tabla" sin pasar por código verificable. Al primer cambio de formato, inventa o redondea mal sin avisar.',
      'Mi regla práctica: uso LLMs para acelerar escritura de scripts ETL en Python, clasificar texto no estructurado o sintetizar hipótesis; pero todo cruce, suma y regla de negocio corre en código determinista con chequeos de integridad.',
    ],
    promptTopic: 'Intercambiar flujos de Python, n8n e IA aplicada a datos',
  },
];

export const conversationStarters = [
  {
    id: 'geo',
    label: 'GEO / AEO y LLMs',
    subject: 'Conversar sobre GEO / visibilidad en LLMs',
    draft: 'Hola Lucas, vi tu experimento de GEO/AEO en lucasvargas.site y me gustaría conversar sobre cómo lo estás midiendo.',
  },
  {
    id: 'data',
    label: 'Cohortes, BI o Datos',
    subject: 'Conversemos sobre datos, cohortes o BI',
    draft: 'Hola Lucas, estuve probando los simuladores de tu web y me interesó conversar sobre cómo modelas retención / atribución.',
  },
  {
    id: 'auto',
    label: 'Automatización & IA',
    subject: 'Flujos con Python, n8n y Claude Code',
    draft: 'Hola Lucas, me llamó la atención cómo armas flujos ETL y automatizaciones con IA sin perder rigor. ¿Conversamos?',
  },
  {
    id: 'coffee',
    label: 'Solo conectar',
    subject: 'Hola Lucas — conectemos',
    draft: 'Hola Lucas, pasé por lucasvargas.site y me gustó el enfoque de tu portafolio. ¡Quedamos en contacto!',
  },
];
