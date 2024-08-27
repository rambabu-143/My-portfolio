const Contact = () => {
    return (
      <div id="contact" className=" p-8 w-full h-fit flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white mb-8">Contact Me</h1>
        <form
          action="/api/contact" 
          method="POST"
          className="w-full max-w-lg bg-gray-800 p-6 rounded-3xl shadow-lg"
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-700 text-gray-300 p-3 rounded-lg border border-gray-600"
            />
          </div>
          
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-gray-700 text-gray-300 p-3 rounded-lg border border-gray-600"
            />
          </div>
          
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="bg-gray-700 text-gray-300 p-3 rounded-lg border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 my-4 rounded-full hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default Contact;
  