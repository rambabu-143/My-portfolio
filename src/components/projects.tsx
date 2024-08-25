import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  const projects = [
    {
      title: "OrderMatic Technologies",
      description:
        "Ordermatic Technologies is a showcase website for Menumamu, a QR-based ordering system for restaurants. Customers can easily place orders by scanning QR codes at their tables. Built with Next.js, the site features Framer Motion animations and leverages server-side rendering for fast load times, demonstrating the effectiveness of QR-based solutions in the restaurant industry.",
      imageUrl: "./ordermatic.png",
      url: "https://www.ordermatic.in/",
    },
    {
      title: "Fitpaa",
      description:
        "Fitpaa is a practice project from my training period using Next.js, focused on building a functional fitness web application. Although it still needs some enhancements, Fitpaa showcases my foundational skills in developing web applications with Next.js.",
      imageUrl: "./fitpaa.png",
      url: "https://fitppa-web-next-q17cu643f-rams-projects-979d24be.vercel.app",
    },
  ];

  return (
    <div className="bg-gray-900 flex flex-col justify-evenly items-center  p-8 gap-8 w-full lg:h-screen sm:h-fit">
      <h1 className="text-3xl text-white flex justify-center items-center">
        Projects
      </h1>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 w-full max-w-5xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="h-full w-full bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={320}
              height={240}
              className="object-cover w-full h-40"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
              <p className="text-sm text-gray-300">{project.description}</p>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
