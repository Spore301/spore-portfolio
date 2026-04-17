import { TestimonialForm } from '@/components/admin/TestimonialForm';
import { getTestimonialById } from '@/lib/admin-testimonials';
import { notFound } from 'next/navigation';

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return <TestimonialForm initialData={testimonial} />;
}
