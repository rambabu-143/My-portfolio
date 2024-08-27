import Image from "next/image";

const Herosection = () => {
  return (
    <div className="lg:flex justify-center lg:flex-row items-center sm:flex sm:flex-col-reverse max-sm:flex max-sm:flex-col-reverse lg:h-screen sm:h-fit gap-16 bg-black p-8">
      <div className="bg-slate-700 text-gray-300 rounded-3xl lg:w-1/2 sm:w-full flex flex-col justify-center items-center text-start p-8">
        <p>
          I’m <span className="font-bold text-red-600">Rambabu</span>, a
          Full-Stack Developer, UI/UX Designer, and Hardware Enthusiast. With a
          passion for innovation, I specialize in building seamless web
          applications using Next.js, TypeScript, and Tailwind CSS. Whether it’s
          front-end flair or back-end robustness, I bring ideas to life with
          precision and creativity.
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
      <div className="relative w-96 h-96 p-4">
        {/* Image container with shadow */}
        <div className="w-full h-full rounded-full overflow-hidden relative ">
          {/* Added shadow-2xl here */}
          <Image src="./hero.png" alt="Rambabu" fill className="object-cover" />
        </div>

        {/* SVG container */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          {/* Define SVG filter for shadow */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* First animated path with shadow */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100 A 90 90 0 0 1 10 100 Z"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="10, 10"
            transform="rotate(90 100 100)"
            filter="url(#shadow)" // Apply the shadow filter here
          />

          {/* Second animated path with shadow */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100 A 90 90 0 0 1 10 100 Z"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="10, 10"
            transform="rotate(-30 100 100)"
            filter="url(#shadow)" 
          />
        </svg>
      </div>
    </div>
  );
};

export default Herosection;
