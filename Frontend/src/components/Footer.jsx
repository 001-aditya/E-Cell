// const Footer = () => {
//     return(
//        <div className="bg-neutral-600 text-white">

//         <h3>© 2025 E-Cell REC Azamgarh. All rights reserved.</h3>
//         <h3>Designed & Developed by Aditya Shukla</h3>
//         <h3>Stay connected with us on social media:</h3>
//         <p>E-Mail us : ecell.reca@gmail.com</p>
//         <p>Mobile No.: +91 83185 92993</p>

//        </div>
//     )
// }


import React from "react";
import { Separator } from "@/components/ui/separator";

 function Footer() {
  return (
    <footer className="w-full border-b bg-gray-900/40 text-white mt-20 border-t border-white-700">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center justify-center gap-4">

        {/* Club Name */}
        <h2 className="text-lg font-semibold">
          E-Cell • REC Azamgarh
        </h2>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-200">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Events</a>
          <a href="#" className="hover:text-white">Team</a>
          <a href="#" className="hover:text-white">Join Us</a>
        </div>

        <Separator className="bg-white/20 w-full" />

        {/* Bottom text */}
         <p>
            <span>Design and Developed by </span>
            <span className="text-yellow-700">Aditya Shukla</span>
        </p>
        <p className="text-xs text-gray-200 text-center">
          © {new Date().getFullYear()} E-Cell • Rajkiya Engineering College Azamgarh — All Rights Reserved
        </p>
       
      </div>
    </footer>
  );
}


export default Footer;