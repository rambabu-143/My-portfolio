import Image from "next/image";

const Contact = () => {
  return (
    <div
      id="contact"
      className="p-8 w-full h-fit flex flex-col justify-center items-center"
    >
      <h1 className="text-3xl text-white mb-8">Contact Me</h1>
      <p className="text-gray-300 text-center mb-6">
        I'd love to hear from you! Feel free to reach out through any of the platforms below.
      </p>
      
      <div className="flex space-x-6">
        {/* Email Link */}
        <a
          href="mailto:rambabuarabandi2001@gmail.com"
          className="text-gray-300 hover:text-white transition"
          aria-label="Email"
        >
          <Image
              src="./gmaillogo.svg" 
              alt="Gmail"
              width={24} 
              height={24} 
              className="object-contain" 
            />
        </a>

        {/* Social Media Links */}
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition"
          aria-label="Twitter"
        >
          <Image
              src="./x.svg" 
              alt="x"
              width={24} 
              height={24} 
              className="object-contain" 
            />
        </a>

        <a
          href="https://www.linkedin.com/in/rambabuarabandi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition"
          aria-label="LinkedIn"
        >
           <Image
              src="./linkedin.svg" 
              alt="linkedin"
              width={24} 
              height={24} 
              className="object-contain" 
            />
        </a>

        <a
          href="https://github.com/rambabu-143"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition"
          aria-label="GitHub"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.28 9.4 7.8 10.9.57.1.78-.26.78-.57v-2.04c-3.17.7-3.84-1.4-3.84-1.4-.52-1.3-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.7 1.25 3.36.95.1-.73.4-1.25.73-1.54-2.52-.29-5.17-1.26-5.17-5.6 0-1.23.44-2.22 1.17-3.01-.12-.29-.51-1.46.11-3.04 0 0 .95-.3 3.1 1.16a10.5 10.5 0 015.65 0c2.16-1.46 3.1-1.16 3.1-1.16.62 1.58.23 2.75.11 3.04.72.79 1.17 1.78 1.17 3.01 0 4.35-2.66 5.3-5.19 5.59.41.35.78 1.04.78 2.1v3.12c0 .3.21.67.79.56C20.72 21.4 24 17.1 24 12 24 5.65 18.85.5 12 .5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Contact;
