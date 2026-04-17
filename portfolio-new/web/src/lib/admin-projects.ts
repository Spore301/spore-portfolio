import { createClient } from '@/lib/supabase/server';

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

export async function createProject(projectData: any) {
  const supabase = await createClient();
  // Remove content_blocks entirely as it doesn't exist in the DB schema
  const { content_blocks, ...payload } = projectData;

  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data;
}

export async function updateProject(slug: string, projectData: any) {
  const supabase = await createClient();
  // Remove content_blocks entirely as it doesn't exist in the DB schema
  const { content_blocks, ...payload } = projectData;

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('slug', slug)
    .select();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data;
}

export async function deleteProject(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

export async function toggleProjectVisibility(slug: string, visible: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .update({ visible })
    .eq('slug', slug)
    .select();

  if (error) {
    console.error('Error toggling project visibility:', error);
    throw error;
  }

  return data;
}

export async function updateProjectOrder(order: { slug: string; display_order: number }[]) {
  const supabase = await createClient();
  // Update each project's display_order individually
  for (const item of order) {
    const { error } = await supabase
      .from('projects')
      .update({ display_order: item.display_order })
      .eq('slug', item.slug);

    if (error) {
      console.error(`Error updating order for ${item.slug}:`, error);
      throw error;
    }
  }
}
