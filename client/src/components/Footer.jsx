import React from "react";
import { Phone, Mail, Palette, LucideLinkedin } from "lucide-react";
import Flag from "react-world-flags";

const Footer = () => {
  return (
    <footer id="footer" className="bg-blue-700 text-gray-300 font-inter ">
      {/* Top CTA Section */}
      <div className="border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Design By */}
          <div className="flex items-center justify-center sm:justify-start">
            <Palette className="text-orange-500 w-8 h-8" />
       <div className="ml-3">
  <h4 className="text-white text-lg font-semibold">Design by</h4>
  <span className="text-sm flex items-center gap-1">
    @webugbusters <Flag code="IN" className="w-5 h-4" />
  </span>
</div>

          </div>
          {/* Call Us */}
          <div className="flex items-center justify-center">
            <Phone className="text-orange-500 w-8 h-8" />
            <div className="ml-3">
              <h4 className="text-white text-lg font-semibold">Call us</h4>
              <span className="text-sm">
                <a
                  href="tel:91-8652440318"
                  className="text-blue-300 hover:underline"
                >
                  +91-8652440318
                </a>
              </span>
            </div>
          </div>
          {/* Mail Us */}
          <div className="flex items-center justify-center sm:justify-end">
            <Mail className="text-orange-500 w-8 h-8" />
            <div className="ml-3">
              <h4 className="text-white text-lg font-semibold">Mail us</h4>
              <span className="text-sm">webugbusters@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 text-center md:text-left">
        {/* Logo + About */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/navbar.png" alt="Logo" className="w-40 mb-4" />
          <p className="text-sm leading-relaxed text-gray-300">
            We at Webugbusters are committed to building reliable and innovative
            digital solutions. Our mission is to create technology that serves
            humanity.
          </p>
          <div className="mt-4">
     
  <span className="text-white font-semibold block mb-2">Connect us</span>
  <div className="flex gap-3 justify-center md:justify-start">
    <a 
      href="https://www.linkedin.com/in/vinitkaple0718" 
      className="bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold"
      target="_blank" 
      rel="noopener noreferrer"
    >
      V
    </a>
    <a 
      href="https://www.linkedin.com/in/shaleen17" 
      className="bg-gradient-to-r from-pink-500 to-yellow-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold"
      target="_blank" 
      rel="noopener noreferrer"
    >
      S
    </a>
    <a 
      href="https://www.linkedin.com/in/nikhil-shukla-962b41317" 
      className="bg-gradient-to-r from-green-500 to-teal-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold"
      target="_blank" 
      rel="noopener noreferrer"
    >
      N
    </a>
  </div>

          </div>
        </div>

        {/* Emergency Helplines */}
        <div className="flex flex-col items-center md:items-start px-15">
          <h3 className="text-white text-lg font-semibold mb-4">
            Emergency Helplines
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              National Emergency:{" "}
              <a href="tel:112" className="text-blue-300 hover:underline">
                112
              </a>
            </li>
            <li>
              Ambulance:{" "}
              <a href="tel:108" className="text-blue-300 hover:underline">
                108
              </a>{" "}
              or{" "}
              <a href="tel:102" className="text-blue-300 hover:underline">
                102
              </a>
            </li>
            <li>
              Cancer Helpline:{" "}
              <a
                href="tel:1800221951"
                className="text-blue-300 hover:underline"
              >
                1800-22-1951
              </a>
            </li>
            <li>
              Red Cross Blood Bank:{" "}
              <a href="tel:1910" className="text-blue-300 hover:underline">
                1910
              </a>
            </li>
            <li>
              Tele-Manas (Mental Health):{" "}
              <a href="tel:14416" className="text-blue-300 hover:underline">
                14416
              </a>
            </li>
            <li>
              Poison Control:{" "}
              <a
                href="tel:18004251213"
                className="text-blue-300 hover:underline"
              >
                1800-425-1213
              </a>
            </li>
            <li>
              Ayushman Bharat:{" "}
              <a href="tel:14555" className="text-blue-300 hover:underline">
                14555
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white text-lg font-semibold mb-4">Disclaimer</h3>
          <p className="text-sm leading-relaxed text-gray-300">
           This platform was built for ENIGMA 4.0: A Web Development Hackathon (Track 2 – HealthTech) at SIES Graduate School of Technology, Navi Mumbai. All names, data, and content are fictitious and generated during development. No personal sentiments are intended or harmed.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center text-sm text-black text-center">
          <p>© {new Date().getFullYear()} All Rights Reserved | Webugbusters</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
