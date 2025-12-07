import React from "react";
import { Github, Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-(--secondary) text-white py-6 px-10 rounded-t-3xl">
            <div className="flex items-center justify-between w-full">
                
                <p className="text-2xl font-semibold">NusaBiz</p>

                <p className="text-sm opacity-70 text-center flex-1">
                    copyright 2025 @NusaBiz
                </p>

                <div className="flex items-center gap-5">
                    <a href="#" className="hover:opacity-80 transition">
                        <Github size={28} />
                    </a>
                    <a href="#" className="hover:opacity-80 transition">
                        <Facebook size={28} />
                    </a>
                    <a href="#" className="hover:opacity-80 transition">
                        <Instagram size={28} />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
