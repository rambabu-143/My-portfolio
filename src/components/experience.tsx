const Experience = () => {
    const experiences = [
      {
        company: "Ordermatic Technologies",
        role: "Software Development Engineer",
        duration: "April 2024 - Present",
        description:
          "As a Software Development Engineer at Ordermatic Technologies, I specialize in building efficient, scalable web applications using Next.js. My work focuses on integrating Framer Motion animations and leveraging server-side rendering to optimize performance and user experience, particularly for our showcase product, Menumamu, a QR-based ordering system for restaurants.",
      },
      {
        company: "Fitpaa",
        role: "Intern",
        duration: "January 2024 - March 2024",
        description:
          "During my internship at Fitpaa, I contributed to the development of a fitness web application using Next.js. This role allowed me to enhance my skills in front-end development, working on user interfaces, and learning best practices in web development. The project, though still in progress, showcases my foundational understanding of building responsive and interactive web applications.",
      },
    ];
  
    return (
      <div className=" p-8 w-full h-fit flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white mb-8">Experience</h1>
        <div className="space-y-8 w-full max-w-3xl">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-3xl p-6 shadow-lg text-gray-300"
            >
              <h2 className="text-xl font-bold text-white">{experience.company}</h2>
              <h3 className="text-lg text-red-600">{experience.role}</h3>
              <p className="text-sm text-gray-400">{experience.duration}</p>
              <p className="mt-4">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Experience;
  