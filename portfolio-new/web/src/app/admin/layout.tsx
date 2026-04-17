import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, MessageSquare, Layout, Mail } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="border-b bg-muted/20">
        <div className="container mx-auto px-4 h-16 flex items-center gap-6">
          <Link href="/admin" className="font-bold tracking-tight text-lg mr-4">
            CMS Admin
          </Link>
          
          <Link href="/admin">
            <Button variant="ghost" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Projects
            </Button>
          </Link>
          <Link href="/admin/testimonials">
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Testimonials
            </Button>
          </Link>
          <Link href="/admin/blogs">
            <Button variant="ghost" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blogs
            </Button>
          </Link>
          <Link href="/admin/sections">
            <Button variant="ghost" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Homepage Sections
            </Button>
          </Link>
          <Link href="/admin/inbox">
            <Button variant="ghost" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Inbox
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
