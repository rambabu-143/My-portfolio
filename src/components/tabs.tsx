import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import Projects from "./projects";
import Experience from "./experience";
import Contact from "./contact";
import Skills from "./skills"; 


const CustomTabs = () => {
  return (
    <div className="w-full bg-black   ">
      <Tabs defaultValue="projects" className="bg-black flex justify-center items-center flex-col">
      <TabsList className="grid w-full grid-cols-4 bg-black py-4 px-4 font-semibold">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <Projects/>
      </TabsContent>
      <TabsContent value="experience">
        <Experience/>
      </TabsContent>
      <TabsContent value="skills">
        <Skills/>
      </TabsContent>
      <TabsContent value="contact" className='p-4'>
        <Contact/>
      </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
