import { createClient } from '@/lib/supabase/server';

export async function getSections() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching sections:', error);
    return [];
  }

  return data;
}

export async function updateSection(id: string, updates: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('homepage_sections')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating section:', error);
    throw error;
  }

  return data;
}

export async function updateSectionsOrder(orderUpdates: { id: string; display_order: number }[]) {
  const supabase = await createClient();
  // Supabase doesn't have a built-in "bulk update" that is simple via the JS client without an RPC function.
  // We will do individual updates in parallel since there are only a few sections.
  const promises = orderUpdates.map(({ id, display_order }) => 
    supabase.from('homepage_sections').update({ display_order }).eq('id', id)
  );

  await Promise.all(promises);
}
