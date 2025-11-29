import React, { useState } from "react";
import { Instagram, Twitter, Linkedin, AtSign, X } from "lucide-react";

const SocialSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        {
            name: "Instagram",
            icon: <Instagram size={24} />,
            url: "https://instagram.com",
            color: "hover:text-pink-500"
        },
        {
            name: "Twitter",
            icon: <Twitter size={24} />,
            url: "https://twitter.com",
            color: "hover:text-blue-400"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={24} />,
            url: "https://linkedin.com",
            color: "hover:text-blue-600"
        }
    ];

    return (
        <>
            {/* Desktop View (Right Side) */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-3 backdrop-blur-md bg-black/20 border-l border-y border-white/10 rounded-l-2xl shadow-lg transition-all duration-300 hover:bg-black/40 hover:border-yellow-400/30">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white/70 transition-all duration-300 transform hover:scale-110 ${link.color}`}
                        title={link.name}
                    >
                        {link.icon}
                    </a>
                ))}
                {/* Vertical Line Decoration */}
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Mobile View (Bottom Right) */}
            <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col-reverse items-center gap-4">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                            ? "bg-yellow-400 text-black border-yellow-400 rotate-180"
                            : "bg-black/40 text-yellow-400 border-yellow-400/30 hover:bg-black/60"
                        }`}
                >
                    {isOpen ? <X size={24} /> : <AtSign size={24} />}
                </button>

                {/* Icons (Reveal on Click) */}
                <div
                    className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
                        }`}
                >
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full backdrop-blur-md bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
                            title={link.name}
                        >
                            {React.cloneElement(link.icon, { size: 20 })}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SocialSidebar;
