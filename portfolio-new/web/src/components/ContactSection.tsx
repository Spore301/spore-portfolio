import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION_SLOW = 0.8;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden" id="contact">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <style>{`
          @keyframes slowFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes slowFloatReverse {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-30px, 50px) scale(0.9); }
            66% { transform: translate(20px, -20px) scale(1.1); }
          }
        `}</style>
        <img src="/assets/hero_bg.png" alt="Background Texture" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-[120px]" style={{ animation: 'slowFloat 15s ease-in-out infinite' }} />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-[120px]" style={{ animation: 'slowFloatReverse 15s ease-in-out infinite' }} />
        <img src="/assets/abstract_shape.png" alt="Decorative Shape" className="absolute -top-10 -right-20 md:top-20 md:right-10 w-64 md:w-96 opacity-20 mix-blend-screen" style={{ animation: 'slowFloat 20s ease-in-out infinite' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION_SLOW, ease: EASE_OUT_EXPO }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest font-medium mb-8 text-white/70">
              Get in Touch
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight mb-8">
              Let's build<br />
              <span className="text-white">something<br />extraordinary</span>
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed mb-12">
              Whether you have a vision, a project in mind, or just want to say hello, my inbox is always open.
            </p>

            <div className="space-y-6 text-white/80">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white/50 font-mono uppercase tracking-widest">Email</span>
                <a href="mailto:hello@debargha.com" className="text-xl hover:text-white transition-colors w-fit">
                  hello@debargha.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white/50 font-mono uppercase tracking-widest">Location</span>
                <span className="text-xl">Available Worldwide</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION_SLOW, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 lg:p-12 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70">Name</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-black/40 border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 transition-all disabled:opacity-50"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-black/40 border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 transition-all disabled:opacity-50"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white/70">Subject</Label>
                <Input
                  {...register("subject")}
                  id="subject"
                  placeholder="How can I help you?"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-black/40 border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 transition-all disabled:opacity-50"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/70">Message</Label>
                <Textarea
                  {...register("message")}
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 transition-all resize-none disabled:opacity-50 min-h-[120px]"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-white hover:bg-white/90 text-black font-semibold rounded-xl text-md flex items-center justify-center gap-3 transition-colors disabled:opacity-70 group"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> }
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
