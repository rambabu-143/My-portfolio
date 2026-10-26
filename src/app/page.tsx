import Herosection from "@/components/herosection";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import ProjectsExplained from "@/components/projects-explained";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Tabs from "@/components/tabs";
import AmbientBackground from "@/components/ambient-background";

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <div className="bg-ambient" aria-hidden="true" />
      <div className="scroll-edge" aria-hidden="true" />

      <AmbientBackground />
      <Tabs />

      <section id="hero" className="relative lg:h-[320vh]">
        <Herosection />
      </section>

      <div className="container-page">
        {/* Keep experience readable and directly accessible on every screen. */}
        <section id="experience" className="relative py-16 scroll-mt-20">
          <div className="exp-blobs" aria-hidden="true"><i /><i /><i /></div>
          <div className="relative z-10"><Experience /></div>
        </section>

        <section id="work" className="py-16 scroll-mt-20">
          <ProjectsExplained />
        </section>

        <section id="skills" className="py-16 scroll-mt-20">
          <Skills />
        </section>

        <section id="education" className="py-16 scroll-mt-20">
          <Education />
        </section>

        <section id="contact" className="py-16 scroll-mt-20">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  );
}
