import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-black flex justify-center items-center text-gray-300 py-6">
      <div className="flex flex-col justify-center text-center items-center">
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Rambabu. All rights reserved.
        </p>
        <div className="flex space-x-6"> 
          <Link
            href="https://www.linkedin.com/in/rambabuarabandi"
            className="hover:text-red-600 transition relative w-12 h-12 rounded-full flex justify-center items-center bg-red-600"
          >
            <Image
              src="./linkedin.svg" 
              alt="linkedin"
              width={24} 
              height={24} 
              className="object-contain" 
            />
          </Link>
          <Link
            href="https://github.com/rambabu-143"
            className="hover:text-red-600 transition relative w-12 h-12 rounded-full flex justify-center items-center bg-red-600"
          >
            <Image
              src="./GitHub.svg" 
              alt="Github"
              width={24} 
              height={24} 
              className="object-contain" 
            />
          </Link>
          <Link
            href="mailto:rambabuarabandi2001@gmail.com"
            className="hover:text-red-600 transition relative w-12 h-12 rounded-full flex justify-center items-center bg-red-600"
          >
            <Image
              src="./gmaillogo.svg" 
              alt="Gmail"
              width={24} 
              height={24} 
              className="object-contain" 
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
