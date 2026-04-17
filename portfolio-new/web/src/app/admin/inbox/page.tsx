"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Trash2, MailOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function InboxDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if(!confirm("Are you sure you want to delete this message?")) return;
    setDeletingId(id);
    try {
        const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
        if(!res.ok) throw new Error("Failed to delete");
        setMessages(prev => prev.filter(m => m.id !== id));
    } catch (error) {
        console.error(error);
    } finally {
        setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground mt-1">Manage contact form requests from your website.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center p-12 border rounded-xl bg-muted/50">
          <MailOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Inbox is empty</h3>
          <p className="text-muted-foreground mt-2">When someone uses your contact form, you'll see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <Card key={msg.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{msg.subject}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-foreground/80 mb-4 whitespace-pre-wrap bg-muted/30 p-4 rounded-lg border">
                    {msg.message}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 w-fit px-3 py-1.5 rounded-md border">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium text-foreground">{msg.name}</span>
                    <span>&mdash;</span>
                    <a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 md:mt-2">
                  <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Reply
                    </Button>
                  </a>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    disabled={deletingId === msg.id} 
                    onClick={() => deleteMessage(msg.id)}
                  >
                    {deletingId === msg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
