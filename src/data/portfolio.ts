export type CaseDomain = 'Data & BI' | 'Producto' | 'Growth' | 'IA & ETL';

export interface CaseStudy {
  slug: string;
  order: string;
  domains: CaseDomain[];
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  headlineMetric: string;
  headlineLabel: string;
  summary: string;
  context: string;
  challenge: string;
  approach: string[];
  tradeoffs: string[];
  outcome: string;
  stack: string[];
  flow: { step: string; detail: string }[];
  snippet: {
    title: string;
    language: string;
    note: string;
    code: string;
  };
}

export const siteMeta = {
  name: 'Lucas Vargas',
  handle: 'lucasvargas.site',
  location: 'Santiago, Chile',
  email: 'lucasdamian.vb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucasdvb/',
  cvUrl:
    'https://docs.google.com/document/d/1pxzhSdwJtZu6oXfSiP-ZUwfRGImtrxEHDwWzOVJ9hUo/edit',
  tagline: 'Datos, Producto & Automatización con IA',
  bio: 'Analista de datos con foco en negocio (+2 años en seguros, e-commerce y marketing digital). Convierto datos fragmentados en decisiones de producto, métricas accionables y flujos automatizados.',
};

export const impactMetrics = [
  {
    value: '$6M CLP/mes',
    label: 'Ahorro en pauta digital',
    detail: 'Detección de canibalización SEM/SEO cruzando GA4, GSC, Google Ads y Meta Ads.',
  },
  {
    value: '25 h/mes',
    label: 'Tiempo operativo ahorrado',
    detail: 'ETL en Python + Claude Code (10h) y automatizaciones con n8n, Apps Script e IA (15h).',
  },
  {
    value: '+15% YoY',
    label: 'Crecimiento en cuentas retail',
    detail: 'Estrategia basada en datos con márgenes brutos >55% en grandes marcas de Chile y Colombia.',
  },
  {
    value: '+$4M CLP',
    label: 'Ventas año 1 producto 0→1',
    detail: 'Diseño e investigación de mercado para el servicio de posicionamiento en LLMs (GEO/AEO).',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cohortes-retencion-seguros',
    order: '01',
    domains: ['Data & BI', 'Producto'],
    title: 'Analítica de Cohortes, Churn, CLV y Modelado BI en Seguros',
    subtitle:
      'Cómo estructurar visibilidad de retención, usabilidad y siniestralidad para evolucionar productos en una alianza masiva.',
    organization: 'Corredora de Seguros la Cámara (Caja Los Andes × BNP Paribas Cardif)',
    period: 'Marzo 2026 – Presente',
    headlineMetric: '10 h/mes',
    headlineLabel: 'ahorradas con ETL automatizado',
    summary:
      'Análisis de retención, churn, CLV y usabilidad mediante cohortes y segmentación; dashboards en Power BI (DAX y Power Query) y consolidación ETL en Python con Claude Code.',
    context:
      'En una alianza de seguros entre canal masivo (Caja Los Andes) y aseguradora (BNP Paribas Cardif), las decisiones de evolución de producto y control operativo dependen de cruzar múltiples fuentes: ventas, bajas (churn), siniestros, reclamos y uso.',
    challenge:
      'La reportería y consolidación de bases provenientes de distintas fuentes consumía tiempo manual recurrente, mientras que analizar promedios globales ocultaba qué segmentos retenían mejor a lo largo del tiempo y dónde existía fricción de producto.',
    approach: [
      'Construcción de análisis de cohortes y segmentación de cartera para aislar patrones de retención, churn temprano y Customer Lifetime Value (CLV).',
      'Modelamiento de datos en Power BI con Power Query y medidas en DAX para monitorear KPIs de ventas, siniestros y reclamos en vistas ejecutivas.',
      'Desarrollo de flujos ETL en Python asistidos por Claude Code para automatizar la extracción, limpieza y consolidación de bases multi-fuente.',
    ],
    tradeoffs: [
      'Priorizar un modelo de datos limpio y reproducible antes que sumar decenas de gráficos ad-hoc difíciles de mantener ante cambios de fuente.',
      'Separar indicadores operativos (siniestros/reclamos) de indicadores de ciclo de vida (retención/CLV) para evitar ruido en las reuniones de producto y alianza.',
    ],
    outcome:
      'Automatización del flujo de consolidación de datos con un ahorro de 10 horas mensuales y generación continua de insights accionables para la estrategia y evolución de los productos de la alianza.',
    stack: ['Power BI', 'DAX', 'Power Query', 'Python', 'Claude Code', 'SQL', 'Cohortes & CLV'],
    flow: [
      { step: 'Ingesta Multi-Fuente', detail: 'Bases de ventas, bajas, siniestros y reclamos' },
      { step: 'ETL Python', detail: 'Limpieza, normalización de llaves y validación automática' },
      { step: 'Modelo BI (DAX)', detail: 'Tablas de hechos, calendario y cohortes de permanencia' },
      { step: 'Decisión Producto', detail: 'Insights de retención, usabilidad y valor de vida' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Matriz de retención por cohorte mensual (SQL)',
      language: 'sql',
      note: 'Ejemplo genérico de lógica analítica (sin datos ni esquemas reales de empresa).',
      code: `WITH cohortes AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', start_date) AS cohort_month,
    DATE_TRUNC('month', active_month) AS activity_month
  FROM subscriptions_activity
),
retencion AS (
  SELECT
    cohort_month,
    (EXTRACT(YEAR FROM activity_month) - EXTRACT(YEAR FROM cohort_month)) * 12
      + (EXTRACT(MONTH FROM activity_month) - EXTRACT(MONTH FROM cohort_month)) AS month_n,
    COUNT(DISTINCT customer_id) AS active_users
  FROM cohortes
  GROUP BY 1, 2
)
SELECT
  cohort_month,
  month_n,
  active_users,
  ROUND(
    active_users * 100.0 / FIRST_VALUE(active_users) OVER (
      PARTITION BY cohort_month ORDER BY month_n
    ), 1
  ) AS retention_pct
FROM retencion
ORDER BY 1, 2;`,
    },
  },
  {
    slug: 'canibalizacion-paid-organic',
    order: '02',
    domains: ['Growth', 'Data & BI'],
    title: 'Atribución Cross-Channel y Detección de Canibalización SEM/SEO',
    subtitle:
      'Cruce de analítica web, búsqueda orgánica y pauta pagada para eliminar gasto redundante sin sacrificar demanda.',
    organization: 'Agencia SEO Austral (Galgo, TOCTOC, COFAR, Acenor, Dando la Hora)',
    period: 'Mayo 2024 – Febrero 2025',
    headlineMetric: '$6M CLP/mes',
    headlineLabel: 'ahorro mensual detectado',
    summary:
      'Diseño de 5 dashboards en Looker Studio integrando GA4, Search Console, Google Ads y Meta Ads, más extracción automatizada con Screaming Frog y Python.',
    context:
      'Equipos comerciales y de performance solían evaluar sus canales en silos: Paid Search reportaba conversiones sobre búsquedas donde el sitio ya rankeaba en primeras posiciones orgánicas, inflando el costo de adquisición agregado.',
    challenge:
      'Unificar métricas heterogéneas entre GA4, Google Search Console, Google Ads y Meta Ads para distinguir cuándo la pauta capturaba demanda incremental y cuándo simplemente pagaba por clics que ya eran orgánicos.',
    approach: [
      'Implementación de 5 dashboards integrados en Looker Studio conectando GA4, GSC, Google Ads y Meta Ads con foco en eficiencia de inversión.',
      'Extracción y análisis técnico de datos mediante web scraping con Screaming Frog y Python para detectar brechas de cobertura y oportunidades de demanda orgánica.',
      'Cruce a nivel de intención y términos de búsqueda para identificar solapamiento directo entre campañas SEM y posiciones SEO consolidadas.',
    ],
    tradeoffs: [
      'Se optó por reglas claras de diagnóstico por intención/ranking en Looker Studio en vez de modelos complejos de atribución opacos que el equipo comercial no pudiera auditar.',
      'Mantener pauta defensiva solo en términos con alta presión competitiva en subasta, liberando presupuesto en consultas dominadas orgánicamente.',
    ],
    outcome:
      'Detección de canibalización SEM/SEO que permitió ahorrar $6M CLP mensuales al cliente y estandarizó la toma de decisiones entre canales pagados y orgánicos.',
    stack: ['Looker Studio', 'GA4', 'Search Console', 'Google Ads', 'Meta Ads', 'Python', 'Screaming Frog'],
    flow: [
      { step: 'Fuentes Conectadas', detail: 'GA4 + GSC + Google Ads + Meta Ads + Scraping' },
      { step: 'Cruce Paid/Organic', detail: 'Comparación de CTR, posición orgánica y CPC por query' },
      { step: 'Diagnóstico', detail: 'Identificación de pujas redundantes vs. demanda incremental' },
      { step: 'Reasignación', detail: 'Ahorro directo de $6M CLP/mes sin caída de captación' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Detección de solapamiento SEM vs. SEO (Python)',
      language: 'python',
      note: 'Ejemplo conceptual del criterio de cruce entre ranking orgánico y gasto SEM.',
      code: `def flag_cannibalization(df):
    """Marca términos con posición orgánica top-3 y gasto SEM relevante."""
    condition = (
        (df["seo_avg_position"] <= 3.0)
        & (df["seo_impressions"] >= 500)
        & (df["sem_cost_clp"] > 0)
        & (df["competitor_ads_density"] < 0.3)
    )
    df["cannibalization_risk"] = condition
    df["recoverable_clp"] = df["sem_cost_clp"].where(condition, 0)
    return df.sort_values("recoverable_clp", ascending=False)`,
    },
  },
  {
    slug: 'producto-geo-aeo-retail',
    order: '03',
    domains: ['Producto', 'Growth'],
    title: 'Producto 0→1 en LLMs (GEO/AEO) y Estrategia Data-Driven en Retail',
    subtitle:
      'Lanzamiento de una nueva línea de servicio desde la investigación de mercado hasta la facturación, junto con crecimiento orgánico en grandes cuentas.',
    organization: 'Agencia Making Of (Paris, Easy, Jumbo, Santa Isabel, Hites)',
    period: 'Febrero 2025 – Presente',
    headlineMetric: '+$4M CLP · +15% YoY',
    headlineLabel: 'ventas nuevo producto & crecimiento cuentas',
    summary:
      'Definición completa del servicio de posicionamiento en LLMs (GEO/AEO) y dirección basada en datos de estrategia para grandes retailers con márgenes brutos >55%.',
    context:
      'Con la transición de usuarios desde buscadores tradicionales hacia respuestas generadas por LLMs (ChatGPT, Gemini, Perplexity), el mercado necesitaba un enfoque medible más allá del SEO clásico. Paralelamente, las grandes cuentas retail exigían crecimiento rentable.',
    challenge:
      'Convertir una tendencia emergente (Generative Engine Optimization / Answer Engine Optimization) en un producto comercializable con entregables claros, precios sostenibles y métricas defendibles ante gerencias.',
    approach: [
      'Investigación de mercado, diseño de propuesta de valor, empaquetamiento y definición de producto para lanzar el servicio de posicionamiento en LLMs (GEO/AEO).',
      'Auditorías SEO personalizadas basadas en datos para priorizar iniciativas de linkbuilding en cuentas retail de Chile y Colombia (Paris, Easy, Jumbo Chile/Colombia, Santa Isabel, Hites).',
      'Control de rentabilidad por cuenta asegurando márgenes brutos superiores al 55% mientras se escalaba el volumen anual.',
    ],
    tradeoffs: [
      'Acotar el alcance inicial del servicio GEO/AEO a diagnósticos y acciones accionables de alto impacto, evitando prometer "caja negra" sobre algoritmos de LLMs.',
      'Rechazar volumen de bajo margen en cuentas grandes para sostener márgenes >55% con entregas de mayor valor analítico.',
    ],
    outcome:
      '+$4M CLP en ventas durante el primer año del nuevo servicio GEO/AEO y +15% de crecimiento interanual (YoY) en facturación de linkbuilding manteniendo márgenes brutos >55%.',
    stack: ['Product Discovery', 'GEO / AEO', 'LLMs', 'E-commerce Retail', 'Unit Economics', 'Data Storytelling'],
    flow: [
      { step: 'Market Research', detail: 'Detección de cambio de hábito hacia motores de respuesta IA' },
      { step: 'Value Prop & Scope', detail: 'Definición de auditoría, KPIs de citación y entregables' },
      { step: 'Go-to-Market', detail: 'Validación comercial y primeros clientes (+$4M CLP año 1)' },
      { step: 'Escala Rentable', detail: 'Cuentas retail con +15% YoY y margen bruto >55%' },
    ],
    snippet: {
      title: 'Framework ilustrativo: Matriz de evaluación GEO / Visibilidad en LLMs',
      language: 'text',
      note: 'Estructura conceptual de auditoría para evaluar presencia de marca en motores generativos.',
      code: `1. Cobertura de Prompts (Top-of-funnel / Comparación / Transaccional)
2. Tasa de Citación vs. Competidores (Share of Model)
3. Consistencia de Entidad y Atributos (Precio, Disponibilidad, Propuesta)
4. Sentimiento y Precisión de Fuentes Citadas (Medios, Reviews, Docs propios)
5. Plan de Acción: Datos Estructurados + Autoridad Externa + Contenido Citable`,
    },
  },
  {
    slug: 'automatizacion-etl-ia',
    order: '04',
    domains: ['IA & ETL', 'Data & BI'],
    title: 'Automatización de Flujos ETL, APIs y Herramientas Internas con IA',
    subtitle:
      'Diseño de pipelines y soluciones internas con Python, n8n, Apps Script y LLMs para eliminar trabajo manual repetitivo.',
    organization: 'Making Of & Corredora de Seguros la Cámara',
    period: '2025 – Presente',
    headlineMetric: '25 h/mes',
    headlineLabel: 'recuperadas entre ambos contextos',
    summary:
      'Construcción de pipelines ETL con Python + Claude Code (10 h/mes) y herramientas internas con ChatGPT, Gemini, Apps Script, n8n y APIs (15 h/mes).',
    context:
      'Tanto en agencia como en seguros, buena parte del cuello de botella analítico no está en pensar el análisis sino en extraer, cruzar, limpiar y formatear planillas o reportes entre múltiples APIs y archivos.',
    challenge:
      'Reducir el tiempo invertido en tareas mecánicas sin introducir fragilidad ni depender de cajas negras imposibles de mantener por el resto del equipo.',
    approach: [
      'Desarrollo de flujos ETL en Python junto a Claude Code para consolidar bases heterogéneas con reglas explícitas de validación y limpieza.',
      'Orquestación de workflows en n8n y Google Apps Script conectados a APIs y modelos de lenguaje (ChatGPT / Gemini) para acelerar clasificación y análisis de métricas.',
      'Versionamiento con Git y documentación clara para que cada automatización sea auditable y reutilizable.',
    ],
    tradeoffs: [
      'Usar código determinista (Python / Apps Script) para cálculos y transformaciones numéricas, reservando los LLMs únicamente para clasificación semántica, síntesis o asistencia de desarrollo.',
      'Elegir herramientas accesibles para negocio (Google Sheets + Apps Script / n8n) cuando el equipo necesita operar el output diariamente.',
    ],
    outcome:
      'Ahorro acumulado de 25 horas mensuales (15 h/mes en agencia + 10 h/mes en seguros), acelerando ciclos de reporte y liberando capacidad para análisis de mayor impacto.',
    stack: ['Python', 'Claude Code', 'n8n', 'Apps Script', 'APIs REST', 'ChatGPT / Gemini', 'Git'],
    flow: [
      { step: 'Fuentes & APIs', detail: 'Extracción programada desde múltiples orígenes' },
      { step: 'Orquestación', detail: 'n8n / Apps Script / Python según necesidad de equipo' },
      { step: 'Validación', detail: 'Chequeos de esquema, duplicados y consistencia numérica' },
      { step: 'Output Accionable', detail: 'Tablas limpias listas para BI, Sheets o alertas' },
    ],
    snippet: {
      title: 'Patrón ilustrativo: Pipeline ETL reproducible con validaciones (Python)',
      language: 'python',
      note: 'Separación entre transformación determinista y chequeos de integridad antes de publicar.',
      code: `def run_etl(sources: list[str]) -> pd.DataFrame:
    frames = [load_and_normalize(path) for path in sources]
    df = pd.concat(frames, ignore_index=True)

    # Reglas deterministas: sin duplicados ni llaves nulas
    assert df["record_id"].notna().all(), "Llave primaria nula detectada"
    df = df.drop_duplicates(subset=["record_id"], keep="last")
    df["processed_at"] = pd.Timestamp.utcnow()
    return df`,
    },
  },
];

export const stackLayers = [
  {
    stage: '01 · Captura & Datos',
    description: 'Extracción, limpieza y consolidación reproducible desde múltiples fuentes.',
    items: ['Python', 'SQL', 'Power Query', 'Web Scraping', 'Screaming Frog', 'APIs REST'],
  },
  {
    stage: '02 · BI & Diagnóstico',
    description: 'Modelamiento relacional, métricas de negocio y visualización ejecutiva.',
    items: ['Power BI (DAX)', 'Looker Studio', 'Google Analytics 4', 'Google Sheets', 'Excel', 'Cohortes & CLV'],
  },
  {
    stage: '03 · Producto & Growth',
    description: 'Del insight cuantitativo a hipótesis, diseño de oferta y crecimiento rentable.',
    items: ['Retención & Churn', 'Usabilidad', 'Atribución Paid/SEO', 'GEO / AEO (LLMs)', 'Storytelling', 'Unit Economics'],
  },
  {
    stage: '04 · Automatización & IA',
    description: 'Multiplicación de capacidad operativa manteniendo rigor y trazabilidad.',
    items: ['Claude Code', 'n8n', 'Google Apps Script', 'ChatGPT / Gemini', 'Git', 'Flujos ETL'],
  },
];

export const experienceTimeline = [
  {
    role: 'Analista de Datos',
    company: 'Corredora de Seguros la Cámara',
    context: 'Alianza Caja Los Andes × BNP Paribas Cardif',
    period: 'Marzo 2026 – Presente',
    highlights: [
      'Análisis de retención, churn, CLV y usabilidad con cohortes y segmentación.',
      'Dashboards en Power BI (DAX, Power Query) para ventas, siniestros y reclamos.',
      'Flujos ETL en Python con Claude Code ahorrando 10 horas mensuales.',
    ],
  },
  {
    role: 'Product Manager SEO',
    company: 'Agencia Making Of',
    context: 'Freelance desde Marzo 2026 · Retail Chile y Colombia',
    period: 'Febrero 2025 – Presente',
    highlights: [
      'Estrategia data-driven de linkbuilding (+15% YoY en facturación, márgenes >55%).',
      'Soluciones internas con IA, Python, Apps Script, n8n y APIs ahorrando 15 h/mes.',
      'Creación del servicio de posicionamiento en LLMs (GEO/AEO): +$4M CLP año 1.',
    ],
  },
  {
    role: 'Analista de Datos SEO',
    company: 'Agencia SEO Austral',
    context: 'Galgo, TOCTOC, COFAR, Acenor, Dando la Hora',
    period: 'Mayo 2024 – Febrero 2025',
    highlights: [
      '5 dashboards en Looker Studio integrando GA4, Search Console, Google Ads y Meta Ads.',
      'Detección de canibalización SEM/SEO ahorrando $6M CLP mensuales al cliente.',
      'Web scraping con Screaming Frog y Python para oportunidades estratégicas.',
    ],
  },
  {
    role: 'Prácticas Profesionales (SEO & Marketing)',
    company: 'Falabella & Edify',
    context: 'E-commerce y Tecnología Educativa',
    period: '2023 – Mayo 2024',
    highlights: [
      'Practicante SEO en Falabella (Enero – Mayo 2024).',
      'Practicante de Marketing en Edify (2023).',
    ],
  },
];

export const educationAndCerts = {
  degree: 'Licenciatura en Ciencias Sociales',
  university: 'Pontificia Universidad Católica de Chile',
  period: 'Marzo 2021 – Julio 2025',
  details: 'Major en Comunicaciones · Minor en Gestión del Emprendimiento · Aprobado con 1 voto de Distinción',
  activities: [
    'Facilitador Red de Mentores — Centro de Innovación UC (2023)',
    'Ayudante “Habilidades Comunicativas Escritas” — Facultad de Letras UC (2023)',
  ],
  certifications: [
    { name: 'Claude Code 101', issuer: 'Anthropic' },
    { name: 'Data Analytics with AI', issuer: 'Sololearn' },
    { name: 'Google Analytics Certification', issuer: 'Google Skillshop' },
    { name: 'English B2 Upper Intermediate', issuer: 'EF SET' },
  ],
};
