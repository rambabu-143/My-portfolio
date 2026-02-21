import Herosection from "@/components/herosection";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import ContactForm from "@/components/contact";
import Footer from "@/components/footer";
import Tabs from "@/components/tabs";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden noise">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent" />
      </div>

      {/* Navigation Tabs */}
      <Tabs />

      {/* Hero Section */}
      <section id="hero">
        <Herosection />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <Skills />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Projects
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Featured projects showcasing my work in GenAI and full-stack development
          </p>
        </div>
        <Projects />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <Experience />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <ContactForm />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}