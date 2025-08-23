import React from "react";
import aboutImg from '../assets/takethis.jpg';
import { Link } from "react-router-dom";


const AboutUs = () => {
  return (
    <div className="font-inter w-full">
  {/* Hero Section */}
  {/* Hero Section */}
<header
  className="relative w-full min-h-[25em] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
  style={{ backgroundImage: `url(${aboutImg})` }}
>
  <div className="relative z-10 max-w-2xl px-4">
    <h1 className="text-4xl md:text-7xl font-bold mb-4">About Us</h1>
    <p className="text-lg md:text-xl mb-3">
      We care to cure – A platform created by passionate Engineering IT students,
      dedicated to helping India in various domains through our CareKaro services.
    </p>

    {/* Back Button */}
    <Link 
      to="/" 
      className="inline-block mt-4 bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
    >
      Go Back
    </Link>
  </div>
</header>




      {/* Gradient Section */}
      <div className="bg-gradient-to-b from-transparent to-blue-900 text-black">
<section className="text-center py-12 px-4 max-w-3xl mx-auto">
  <h2 className="text-4xl font-bold mb-2">Need for CareKaro</h2>
  <p className="text-black">
    CareKaro was created with a vision to provide an all-in-one digital healthcare platform that bridges key gaps in India’s medical ecosystem. 
    It features an AI-powered health assistant that analyzes your symptoms and offers instant guidance, along with multilingual report analysis 
    so users can understand their medical data in their preferred language. Our smart services include medicine delivery by searching across 
    multiple platforms, real-time ambulance tracking with traffic insights for faster routes, and urgent care support. 
    We also provide an interactive map to locate nearby hospitals with detailed specifications and deliver dynamic health updates, 
    ensuring people stay informed about vital news and ongoing trends in the healthcare space.
  </p>
</section>





        {/* Who We Are */}
 <section className="text-center pt-6 pb-10 px-4 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
    <p className="text-black">
    We are second-year Information Technology students at 
    <strong> Thakur College of Engineering, Mumbai (Kandivali)</strong>. 
    With expertise in Web 2.0 and Web 3.0 technologies, our mission is to leverage our skills to 
    build impactful solutions that contribute to a healthier future for India.
  </p>
  <p className="text-black mb-4">
    We are a team of passionate student developers dedicated to revolutionizing healthcare access through 
    digital innovation.
  </p>

</section>


        {/* Team */}
        <header className="text-center py-10">
          <span className="uppercase text-black tracking-wider">CareKaro Developers</span>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            Meet our team of developers and designers
          </h1>
        </header>

        <section className="flex flex-wrap justify-center gap-6 pb-16 px-4">
  {[
    { 
      name: "Nikhil Shukla", 
      role: "Team Leader & Full Stack Developer", 
      img: "/nik.jpg", 
      linkedin: "https://www.linkedin.com/in/nikhil-shukla-962b41317" 
    },
    { 
      name: "Vinit Kaple", 
      role: "UI/UX Designer & Website Manager", 
      img: "/vin.png", 
      linkedin: "https://www.linkedin.com/in/vinitkaple" 
    },
    { 
      name: "Shalin Singh", 
      role: "AI Chat Bot Developer", 
      img: "/shalin.jpg", 
      linkedin: "https://www.linkedin.com/in/shalin17" 
    }
  ].map((dev, idx) => (
    <div 
      key={idx} 
      className="p-6 max-w-xs w-80 text-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-700"
    >
      <img 
        src={dev.img} 
        alt={dev.name} 
        className="w-28 h-28 object-cover rounded-full mx-auto" 
      />
      <h2 className="text-white text-lg font-semibold mt-3">{dev.name}</h2>
      <p className="text-gray-300 text-sm">{dev.role}</p>
      
      {/* LinkedIn Icon */}
<a 
  href={dev.linkedin} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-1 mt-3 text-blue-400 hover:text-blue-500 font-semibold"
>
  <span>LinkedIn</span>
  <span className="text-xl ml-1">↗️</span>
</a>



    </div>
  ))}
</section>

        {/* Professional Ending */}
        <footer className="text-center py-4 bg-blue-900">
           <p>© {new Date().getFullYear()} All Rights Reserved | Team Name Webugbusters</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;

