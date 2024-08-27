const Skills = () => {
  return (
    <div className="p-4 text-white">
      {/* Add your skills content here */}
      <h2 className="text-2xl w-full flex justify-center text-center font-bold mb-4">Skills</h2>
      <ul className="list-none  grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 text-center max-sm:grid-cols-2 max-md:grid-cols-3  place-items-center gap-8  p-5">
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">C</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Java</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Python</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">HTML</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">CSS</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">JavaScript</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">TypeScript</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">React.js</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Tailwind CSS</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Next.js</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Framer Motion</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Figma</li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">
          Prototyping in Figma
        </li>
        <li className="bg-gray-700 px-4 py-2 w-fit rounded-xl">Framer</li>
      </ul>
    </div>
  );
};

export default Skills;
