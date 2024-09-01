'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { db } from '@/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-black ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800  p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold w-full flex justify-start  text-white mb-4">Contact Me</h2>
        <p className='w-full text-white text-start'>Have a question or want to work together? Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          rows={4}
        />
        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
