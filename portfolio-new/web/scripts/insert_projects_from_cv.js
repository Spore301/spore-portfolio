require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const projects = [
  {
    slug: 'email-engine',
    title: 'Email Discovery & Verification Engine',
    category: 'Automation & Data',
    hero: {
      shortDescription: 'An automated pipeline to extract and validate business email addresses from large domain datasets.',
      image: '/images/placeholder.jpg',
      role: 'Full-Stack Developer',
      duration: '7 hours prototype',
      tools: 'Python, BeautifulSoup, MX DNS validation',
      context: 'Reducing manual B2B lead discovery time by automating the extraction and verification processes.',
    },
    problem: {
      context: 'Manual Lead Discovery',
      painPoints: [
        'Manual B2B research taking roughly 1.5 weeks.',
        'High rate of false positives on scraped emails.',
        'Difficulty in scaling searches across 3000+ domains.',
      ],
    },
    idea: {
      description: 'Built dual scraping modes: a Smart Scrape for quick homepage scans and a Deep Scrape for recursive site crawls, passing results through MX record validation.',
      diagramImage: '',
    },
    architecture: {
      input: '3000+ Domains via CSV',
      processing: ['BeautifulSoup HTML Scraping', 'Regex Email Matching', 'MX Record Verification'],
      output: ['Structured Contact Datasets', 'Verified Active Emails'],
    },
    design_decisions: {
      decisions: [
        { title: 'Validation Layer', description: 'Implemented MX record validation to eliminate false positives and ensure only active mail servers were recorded.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      githubLink: 'https://github.com/Spore301',
    },
    impact: {
      metrics: [
        { label: 'Domains Processed', value: '3000+' },
        { label: 'Time Saved', value: '1.5W', subValue: 'Reduced to 3 hours' },
        { label: 'Deployment Time', value: '<7H' },
      ],
    },
    learnings: ['Rapid Prototyping', 'DNS Validations', 'Data Pipelines'],
    next_steps: ['Deploy as a microservice'],
    next_project_slug: 'ux-crawler',
  },
  {
    slug: 'ux-crawler',
    title: 'Website Intelligence & UX Audit Crawler',
    category: 'Technical Automation',
    hero: {
      shortDescription: 'A headless browser crawler using Playwright to map and analyze large enterprise websites.',
      image: '/images/placeholder.jpg',
      role: 'Automation Engineer / UX Researcher',
      duration: 'Ongoing',
      tools: 'Playwright, Python, SVG Generation',
      context: 'Mapping massive enterprise site structures for UX auditing without manual sitemap tracing.',
    },
    problem: {
      context: 'Enterprise Website Auditing',
      painPoints: [
        'Manual website audit mapping taking a full week.',
        'Missed CTAs and broken internal links in immense content pools.',
        'Lack of visual user journey flows for pre-existing sites.',
      ],
    },
    idea: {
      description: 'Used a headless Playwright instance to traverse navigation trees, capturing page metadata, structural CTA links, and outputting the tree directly into a Figma-compatible SVG.',
      diagramImage: '',
    },
    architecture: {
      input: 'Target Enterprise URL',
      processing: ['Headless Playwright Crawl', 'CTA/Link Extraction', 'SVG Tree Mapping'],
      output: ['Sitemap Structures', 'Exportable UX Flow Diagrams'],
    },
    design_decisions: {
      decisions: [
        { title: 'Figma Integration', description: 'Generated SVG-based user flow diagrams directly from the crawl data, exportable for direct import into Figma UX workflows.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      githubLink: 'https://github.com/Spore301',
    },
    impact: {
      metrics: [
        { label: 'Audit Time Saved', value: '1W', subValue: 'Reduced to minutes' },
        { label: 'Automation', value: '100%' },
        { label: 'Integrations', value: 'Figma SVG' },
      ],
    },
    learnings: ['Headless Browsers', 'Tree Traversal', 'UX Auditing'],
    next_steps: ['Integrate AI computer-vision for UI component recognition'],
    next_project_slug: 'aurorabyte-interface',
  },
  {
    slug: 'aurorabyte-interface',
    title: 'Aurorabyte Product Interface Design',
    category: 'Product Design',
    hero: {
      shortDescription: 'Redesigned the primary interface for Aurorabyte Technologies’ flagship application.',
      image: '/images/placeholder.jpg',
      role: 'UI/UX Designer',
      duration: 'May 2024 - June 2025',
      tools: 'Figma, Design Systems',
      context: 'Improving usability and information hierarchy for an existing application.',
    },
    problem: {
      context: 'Flagship App Usability',
      painPoints: [
        'Confusing information hierarchy.',
        'Inconsistent visual styling.',
        'Drop-offs in user engagement.',
      ],
    },
    idea: {
      description: 'Overhauled the UX flows and visual consistency, working closely with engineering to ensure 1:1 implementation.',
      diagramImage: '',
    },
    architecture: {
      input: 'Legacy Application',
      processing: ['UX Research', 'Wireframing', 'UI Component Redesign'],
      output: ['Production-ready UI Assets', 'Design System Specifications'],
    },
    design_decisions: {
      decisions: [
        { title: 'Information Hierarchy', description: 'Restructured the primary navigation and interaction flows to emphasize critical workflow tasks.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      demoLink: 'https://behance.net/debarghaofficial',
    },
    impact: {
      metrics: [
        { label: 'Usability Score', value: '+35%' },
        { label: 'Engagement', value: 'Higher' },
      ],
    },
    learnings: ['Design Systems', 'Developer Handoff', 'Stakeholder Management'],
    next_steps: ['Implement dark mode'],
    next_project_slug: 'personal-assistant-gui',
  },
  {
    slug: 'personal-assistant-gui',
    title: 'Personal Assistant GUI',
    category: 'Product Design',
    hero: {
      shortDescription: 'An intuitive interface for a digital personal assistant application.',
      image: '/images/placeholder.jpg',
      role: 'Product Designer',
      duration: '2023',
      tools: 'Figma, Interaction Design',
      context: 'Creating a friendly, accessible, AI-powered assistant interface.',
    },
    problem: {
      context: 'Voice & Digital Interfaces',
      painPoints: [
        'Overwhelming dashboards.',
        'Unclear conversational navigation states.',
      ],
    },
    idea: {
      description: 'Developed 25+ interface components and interaction flows focused on accessibility and streamlined task navigation.',
      diagramImage: '',
    },
    architecture: {
      input: 'Voice/Text Prompts',
      processing: ['Intent Recognition (AI)', 'Task Delegation', 'Contextual UI Feedback'],
      output: ['Task Completion', 'Data Summaries'],
    },
    design_decisions: {
      decisions: [
        { title: 'Component Library', description: 'Built an extensive 25+ component library specifically designed to handle ambiguous chat states.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      demoLink: 'https://behance.net/debarghaofficial',
    },
    impact: {
      metrics: [
        { label: 'Components', value: '25+' },
        { label: 'Interaction Flows', value: '15+' },
      ],
    },
    learnings: ['Conversational UI', 'Microinteractions', 'Accessibility'],
    next_steps: ['Integrate voice APIs'],
    next_project_slug: 'home-monitoring',
  },
  {
    slug: 'home-monitoring',
    title: 'Home Monitoring System',
    category: 'Product Design',
    hero: {
      shortDescription: 'An IoT dashboard interface enabling real-time monitoring and control of connected household devices.',
      image: '/images/placeholder.jpg',
      role: 'UI Designer',
      duration: '2023',
      tools: 'Figma, App Design',
      context: 'Centralizing IoT device controls into a single manageable dashboard.',
    },
    problem: {
      context: 'Fragmented IoT Ecosystem',
      painPoints: [
        'Too many separate apps for different devices.',
        'Lack of unified real-time telemetry.',
      ],
    },
    idea: {
      description: 'A unified control hub that aggregates live data feeds and offers quick-action toggles.',
      diagramImage: '',
    },
    architecture: {
      input: 'Sensor Data streams',
      processing: ['Data Aggregation', 'Rules Engine', 'UI Rendering'],
      output: ['Real-time Graphs', 'Control Protocols'],
    },
    design_decisions: {
      decisions: [
        { title: 'Card UI', description: 'Utilized a card-based layout to isolate device states and controls into easily scannable zones.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      demoLink: 'https://behance.net/debarghaofficial',
    },
    impact: {
      metrics: [
        { label: 'Layouts', value: '5+' },
        { label: 'Device Types', value: '12+' },
      ],
    },
    learnings: ['Dashboard UI', 'Data Visualization', 'IoT Product Thinking'],
    next_steps: ['Prototyping in React Native'],
    next_project_slug: 'travel-naut',
  },
  {
    slug: 'travel-naut',
    title: 'Travel Naut Website Interface',
    category: 'Product Design',
    hero: {
      shortDescription: 'A responsive travel discovery platform with structured exploration flows.',
      image: '/images/placeholder.jpg',
      role: 'Web Designer',
      duration: '2022',
      tools: 'Figma',
      context: 'Designing an immersive, imagery-heavy travel platform.',
    },
    problem: {
      context: 'Travel Discovery',
      painPoints: [
        'Users getting lost in unstructured booking data.',
        'Lack of inspirational exploration paths.',
      ],
    },
    idea: {
      description: 'Focus heavily on high-quality visuals and interactive navigation systems to guide the user naturally from discovery to booking.',
      diagramImage: '',
    },
    architecture: {
      input: 'Location Searches',
      processing: ['Curated Content Matching', 'Availability Checks'],
      output: ['Itinerary Recommendations'],
    },
    design_decisions: {
      decisions: [
        { title: 'Imagery Focus', description: 'Used edge-to-edge imagery and parallax scrolling elements to create an immersive feel.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      demoLink: 'https://behance.net/debarghaofficial',
    },
    impact: {
      metrics: [
        { label: 'Responsiveness', value: 'Mobile/Web' },
      ],
    },
    learnings: ['Visual Design', 'Responsive Grids', 'Booking Flows'],
    next_steps: ['User testing with interactive prototype'],
    next_project_slug: 'paracosm',
  },
  {
    slug: 'paracosm',
    title: 'Paracosm Movie Recommendation App',
    category: 'Product Design',
    hero: {
      shortDescription: 'A personalized movie discovery experience.',
      image: '/images/placeholder.jpg',
      role: 'Product Designer',
      duration: '2022',
      tools: 'Figma',
      context: 'Enhancing content exploration through recommendation layouts and browsing filters.',
    },
    problem: {
      context: 'Media Discovery',
      painPoints: [
        'Choice paralysis on major streaming platforms.',
        'Poor filtering options for niche genres.',
      ],
    },
    idea: {
      description: 'A mobile-first application focused on hyper-personalized recommendation clusters and advanced filtering tags.',
      diagramImage: '',
    },
    architecture: {
      input: 'User Watch History',
      processing: ['Collaborative Filtering', 'Metadata Tagging', 'UI Clustering'],
      output: ['Curated Movie Lists'],
    },
    design_decisions: {
      decisions: [
        { title: 'Filter Chips', description: 'Implemented horizontal scrolling filter chips to allow users to quickly add and remove mood constraints.' },
      ],
    },
    interface: {
      heroImage: '/images/placeholder.jpg',
    },
    prototype: {
      demoLink: 'https://behance.net/debarghaofficial',
    },
    impact: {
      metrics: [
        { label: 'Screens Designed', value: '10+' },
      ],
    },
    learnings: ['Mobile UI', 'Content Strategy', 'Recommendation UX'],
    next_steps: ['Develop API connection for TMDB'],
    next_project_slug: '',
  }
];

async function insertProjects() {
  // First, clean up the mistaken CV profile
  await supabase.from('projects').delete().eq('slug', 'debargha-cv');

  // Insert real projects
  for (const project of projects) {
    const { data, error } = await supabase
      .from('projects')
      .upsert(project, { onConflict: 'slug' });

    if (error) {
      console.error(`Error inserting ${project.slug}:`, error);
    } else {
      console.log(`Successfully inserted/updated project: ${project.slug}`);
    }
  }
}

insertProjects();
