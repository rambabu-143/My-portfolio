import Herosection from "@/components/herosection";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import ProjectsExplained from "@/components/projects-explained";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Tabs from "@/components/tabs";
import HardwareBg from "@/components/hardware-bg";
import Stars3D from "@/components/stars-3d";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="bg-ambient" aria-hidden="true" />
      <div className="bg-aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="scroll-edge" aria-hidden="true" />

      <HardwareBg />
      <Stars3D />
      <Tabs />

      <section id="hero" className="relative lg:h-[320vh]">
        <Herosection />
      </section>

      <div className="container-page">
        {/* below lg there is no laptop, so Experience shows as normal cards; on desktop the laptop screen is the Experience section */}
        <section id="experience" className="relative py-16 scroll-mt-20 lg:hidden">
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
