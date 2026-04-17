import { supabase } from '@/lib/supabase';

export interface ProjectData {
    slug: string;
    title: string;
    category: string;
    hero: {
        shortDescription: string;
        image: string;
        role: string;
        duration: string;
        tools: string;
        context: string;
    };
    problem: {
        context: string;
        painPoints: string[];
    };
    idea: {
        description: string;
        diagramImage?: string;
    };
    architecture: {
        input: string;
        processing: string[];
        output: string[];
    };
    designDecisions: {
        decisions: { title: string; description?: string }[];
    };
    interface: {
        heroImage: string;
        dashboardImage?: string;
        sitemapImage?: string;
        flowImage?: string;
    };
    prototype: {
        githubLink?: string;
        demoLink?: string;
        architectureLink?: string;
    };
    impact: {
        metrics: { label: string; value: string; subValue?: string }[];
    };
    learnings: string[];
    nextSteps: string[];
    nextProjectSlug?: string;
    contentBlocks?: any[];
}

export const getProjects = async (): Promise<ProjectData[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }

    // Map `next_project_slug` and `next_steps` back to camelCase for the frontend schema
    return (data || []).map(project => ({
        ...project,
        nextProjectSlug: project.next_project_slug,
        nextSteps: project.next_steps,
        designDecisions: project.design_decisions,
        contentBlocks: project.content_blocks,
    }));
};

export const getProjectBySlug = async (slug: string): Promise<ProjectData | undefined> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
        
    if (error || !data) {
         if (error?.code !== 'PGRST116') { // PGRST116 is "no rows returned", which is fine for a 404
             console.error(`Error fetching project ${slug}:`, error);
         }
         return undefined;
    }

    return {
        ...data,
        nextProjectSlug: data.next_project_slug,
        nextSteps: data.next_steps,
        designDecisions: data.design_decisions,
        contentBlocks: data.content_blocks,
    };
};

export const getNextProject = async (currentSlug: string): Promise<ProjectData | undefined> => {
    const currentProject = await getProjectBySlug(currentSlug);
    
    if (!currentProject || !currentProject.nextProjectSlug) return undefined;
    
    return getProjectBySlug(currentProject.nextProjectSlug);
};
