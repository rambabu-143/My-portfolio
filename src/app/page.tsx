import Herosection from "@/components/herosection";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Tabs from "@/components/tabs";
import Stars3D from "@/components/stars-3d";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="bg-ambient" aria-hidden="true" />
      <div className="bg-aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="scroll-edge" aria-hidden="true" />

      <Stars3D />
      <Tabs />

      <section id="hero" className="relative lg:h-[320vh]">
        <Herosection />
      </section>

      <div className="container-page">
        <section id="work" className="py-16">
          <Projects />
        </section>

        <section id="skills" className="py-16">
          <Skills />
        </section>

        <section id="education" className="py-16">
          <Education />
        </section>

        <section id="contact" className="py-16">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  );
}
