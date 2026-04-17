import { createClient } from '@/lib/supabase/server';

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data;
}

export async function getTestimonialById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }

  return data;
}

export async function createTestimonial(testimonialData: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData])
    .select();

  if (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }

  return data;
}

export async function updateTestimonial(id: string, testimonialData: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }

  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

export async function updateTestimonialOrder(order: { id: string; display_order: number }[]) {
  const supabase = await createClient();
  // Update each testimonial's display_order individually
  for (const item of order) {
    const { error } = await supabase
      .from('testimonials')
      .update({ display_order: item.display_order })
      .eq('id', item.id);

    if (error) {
      console.error(`Error updating order for ${item.id}:`, error);
      throw error;
    }
  }
}
