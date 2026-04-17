import { createClient } from '@/lib/supabase/server';

export async function getContactMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }

  return data;
}

export async function deleteContactMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
}
