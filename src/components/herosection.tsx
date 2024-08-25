import Image from "next/image";

const Herosection = () => {
  return (
    <div className="lg:flex justify-center lg:flex-row items-center sm:flex sm:flex-col-reverse max-sm:flex max-sm:flex-col-reverse  lg:h-screen sm:h-fit gap-16 bg-gray-900 p-8 ">
      <div className="bg-gray-800 text-gray-300 rounded-3xl lg:w-1/2  sm:w-full flex flex-col justify-center items-center text-start p-8">
        <p>
          I’m <span className="font-bold text-red-600">Rambabu</span>, a Full-Stack
          Developer, UI/UX Designer, and Hardware Enthusiast. With a passion for
          innovation, I specialize in building seamless web applications using
          Next.js, TypeScript, and Tailwind CSS. Whether it’s front-end flair or
          back-end robustness, I bring ideas to life with precision and
          creativity.
        </p>
        <p className="my-6">Let’s create something amazing together!</p>
        <div className="flex space-x-4">
          <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition">
            Get in Touch
          </button>
          <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition">
            View My Work
          </button>
        </div>
      </div>
      <div className="w-96 h-96 rounded-full overflow-hidden relative">
        <Image src="/hero.png" alt="Rambabu" fill className="object-cover" />
      </div>
    </div>
  );
};

export default Herosection;
