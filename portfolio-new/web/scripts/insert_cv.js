require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const cvProjectData = {
  slug: 'debargha-cv',
  title: 'Debargha Bandyopadhyay - Resume',
  category: 'Profile',
  hero: {
    shortDescription: 'AI-focused Product Designer and Technical Prototyper with 3+ years of experience.',
    image: '/images/placeholder.jpg',
    role: 'Product Designer',
    duration: '2021 - Present',
    tools: 'Figma, HTML/CSS/JS, Python, Playwright',
    context: 'Translating complex workflows into intuitive experiences.',
  },
  problem: {
    context: 'Professional Experience Summary',
    painPoints: [
      'Abacus Digital: UI/UX for enterprise digital transformation (June 2025 - Present)',
      'ProCodeOne: AI Product Designer Intern (March 2025 - May 2025)',
      'Aurorabyte: UI/UX Designer redefining flagship application (May 2024 - June 2025)',
      'Freelance: Delivering brand/UI designs for multiple clients (Dec 2021 - Present)'
    ],
  },
  idea: {
    description: 'Technical Prototyping & Automation: Capable of building rapid technical solutions using web technologies and automation frameworks.',
    diagramImage: '',
  },
  architecture: {
    input: 'Business Requirements',
    processing: ['UX Audit & Workflow Analysis', 'Figma Prototyping', 'Playwright/Python Data Automation'],
    output: ['Intuitive Digital Products', 'Structured Automation Pipelines'],
  },
  design_decisions: {
    decisions: [
      { title: 'Education', description: 'B.Tech in CS and IoT, UEM Kolkata (2021-2025) - GPA: 8.24' },
      { title: 'Leadership', description: 'President, Design Society of UEMK (June 2024 - Present)' },
    ],
  },
  interface: {
    heroImage: '/images/placeholder.jpg',
    dashboardImage: '',
    sitemapImage: '',
    flowImage: '',
  },
  prototype: {
    githubLink: 'https://github.com/Spore301',
    demoLink: 'https://behance.net/debarghaofficial',
    architectureLink: '',
  },
  impact: {
    metrics: [
      { label: 'Behance Views', value: '450+' },
      { label: 'Appreciations', value: '13' },
      { label: 'Prototypes built', value: '25+' },
    ],
  },
  learnings: ['Product Thinking', 'Design Leadership', 'Cross-Team Collaboration'],
  next_steps: ['Available for Product Design and Automation roles'],
  next_project_slug: 'email-engine',
};

async function insertCV() {
  const { data, error } = await supabase
    .from('projects')
    .upsert(cvProjectData, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error inserting CV:', error);
  } else {
    console.log('CV successfully inserted/updated:', data[0].slug);
  }
}

insertCV();
