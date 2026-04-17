import HomePageClient from '@/components/HomePageClient';
import { supabase } from '@/lib/supabase';

// Disables caching for fresh DB reads:
export const revalidate = 0;

export default async function Page() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return <HomePageClient blogs={blogs || []} />;
}
