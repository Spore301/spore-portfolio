import { createClient } from '@/lib/supabase/server';

export async function getBlogs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return data;
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }

  return data;
}

export async function createBlog(blogData: any) {
  const supabase = await createClient();

  // Ensure content_md satisfies the NOT NULL constraint natively
  const payload = {
    ...blogData,
    content_md: blogData.content_md || "",
  };

  const { data, error } = await supabase
    .from('blogs')
    .insert([payload])
    .select();

  if (error) {
    console.error('Error creating blog:', error);
    throw error;
  }

  return data;
}

export async function updateBlog(slug: string, blogData: any) {
  const supabase = await createClient();

  // Ensure content_md satisfies the NOT NULL constraint natively
  const payload = {
    ...blogData,
    content_md: blogData.content_md || "",
  };

  const { data, error } = await supabase
    .from('blogs')
    .update(payload)
    .eq('slug', slug)
    .select();

  if (error) {
    console.error('Error updating blog:', error);
    throw error;
  }

  return data;
}

export async function deleteBlog(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}
