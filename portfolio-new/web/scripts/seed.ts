import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const dummyData = [
    {
        slug: "ux-crawler",
        title: "Website Intelligence & UX Audit Crawler",
        category: "TECHNICAL AUTOMATION",
        hero: {
            shortDescription: "Automated system that maps enterprise websites and generates UX flow diagrams in minutes.",
            image: "/placeholder-hero.jpg",
            role: "Product Design • Automation Engineering",
            duration: "2 days prototype",
            tools: "Playwright, JavaScript, Web scraping",
            context: "Side Project"
        },
        problem: {
            context: "Manual UX audits for enterprise websites are incredibly slow and error-prone.",
            painPoints: [
                "Manual UX audit takes ~1 week",
                "Large enterprise sites are difficult to map accurately without missing edge cases",
                "Designers waste valuable time building flow diagrams manually instead of solving real problems"
            ]
        },
        idea: {
            description: "I built an automated crawler that recursively maps entire websites, extracts navigation structures, and converts them into standardized UX flow diagrams.",
            diagramImage: "/placeholder-diagram.jpg"
        },
        architecture: {
            input: "CSV domains list",
            processing: [
                "Playwright headless crawler",
                "Link graph extraction",
                "CTA detection",
                "Document scanning"
            ],
            output: [
                "Sitemap structure",
                "User flow diagrams (SVG)",
                "Documentation exports"
            ]
        },
        design_decisions: {
            decisions: [
                { title: "Headless crawling instead of HTML scraping", description: "To ensure JavaScript-rendered links and single-page application routes are captured accurately." },
                { title: "Recursive navigation discovery", description: "To map deep hierarchical structures without getting stuck in infinite loops." },
                { title: "SVG export compatible with Figma", description: "Allowing designers to immediately import and modify the generated flows." }
            ]
        },
        interface: {
             heroImage: "/placeholder-ui-full.jpg",
             sitemapImage: "/placeholder-ui-split-1.jpg",
             flowImage: "/placeholder-ui-split-2.jpg"
        },
        prototype: {
             githubLink: "https://github.com",
             demoLink: "https://demo.com",
             architectureLink: "https://docs.com"
        },
        impact: {
            metrics: [
                { label: "Reduced manual UX audit time", value: "5 minutes", subValue: "Down from 1 week" },
                { label: "Processed", value: "3000+", subValue: "Domains automatically" },
                { label: "Generated", value: "Structured datasets", subValue: "For outreach workflows" }
            ]
        },
        learnings: [
            "Automating UX research pipelines drastically improves design speed and consistency.",
            "Visualization tools help designers understand site architecture faster and spot dead ends.",
            "Combining design thinking with scripting unlocks entirely new programmatic workflows."
        ],
        next_steps: [
            "Visual site heatmap generation",
            "Automated UX issue detection",
            "AI-based journey optimization"
        ],
        next_project_slug: "email-engine"
    },
    {
        slug: "email-engine",
        title: "Email Discovery & Verification Engine",
        category: "TECHNICAL AUTOMATION",
        hero: {
            shortDescription: "A high-throughput backend service that discovers, validates, and enriches contact data.",
            image: "/placeholder-hero.jpg",
            role: "Backend Engineer",
            duration: "3 weeks",
            tools: "Python, BeautifulSoup, Playwright",
            context: "Internal Tooling"
        },
        problem: {
            context: "Finding accurate B2B contact info was bottlenecking the sales process.",
            painPoints: [
                "Manual discovery is too slow",
                "High bounce rates penalize domain reputation",
                "Lack of verification leads to wasted outreach efforts"
            ]
        },
        idea: {
            description: "An automated pipeline that scrapes targeted domains, extracts potential email patterns, and verifies them via SMTP handshake without sending an actual email."
        },
        architecture: {
            input: "Target company domains",
            processing: [
                "Pattern generation",
                "SMTP verification check",
                "Catch-all domain filtering"
            ],
            output: [
                "Verified email list",
                "Enrichment data"
            ]
        },
        design_decisions: {
            decisions: [
                { title: "Async processing", description: "Used asyncio to handle thousands of verifications concurrently." },
                { title: "Proxy rotation", description: "To prevent IP bans during extensive scraping runs." }
            ]
        },
        interface: {
             heroImage: "/placeholder-ui-full.jpg"
        },
        prototype: {
             githubLink: "https://github.com"
        },
        impact: {
            metrics: [
                { label: "Verification Accuracy", value: "98%" },
                { label: "Time Saved", value: "40 hours/week" }
            ]
        },
        learnings: [
            "SMTP protocols have many edge cases.",
            "Rate limiting is the hardest part of external API integration."
        ],
        next_steps: [
            "LinkedIn integration",
            "CRM auto-sync"
        ],
        next_project_slug: "aurorabyte"
    }
];

async function seed() {
    console.log("Seeding Supabase Database...");
    
    for (const data of dummyData) {
        const { error } = await supabase.from('projects').upsert(data);
        if (error) {
            console.error(`Failed to seed ${data.slug}:`, error);
        } else {
            console.log(`Successfully seeded ${data.slug}`);
        }
    }
    
    console.log("Seeding complete!");
}

seed();
