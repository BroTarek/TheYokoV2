import React from 'react';
import { Linkedin, Instagram, ArrowRight } from 'lucide-react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="bg-[#242B31] text-white py-16 px-6 sm:px-12 md:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Brand, Bio, Newsletter, Socials */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold tracking-tight">TheYoKo</span>
                                <span className="text-kaizen-red text-4xl leading-none ml-0.5">.</span>
                            </div>
                            <p className="text-[10px] tracking-[0.3em] font-bold text-secondary-grey mt-1 uppercase">
                                Automotive Kaizen
                            </p>
                        </div>

                        {/* Bio */}
                        <p className="text-white text-sm font-light leading-relaxed max-w-sm">
                            <span className="font-bold text-white">TheYoKo
                                <span className="text-kaizen-red text-4xl leading-none ml-0.5">.</span>
                            </span> is built upon a foundation of multifaceted strength. Our name, 'YoKo' embodies a vision of both <span className="font-bold text-white">breadth</span> and <span className="font-bold">depth</span>.
                        </p>

                        {/* Newsletter */}
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="relative flex-grow">
                                <input
                                    type="email"
                                    placeholder="Your e-mail address"
                                    className="w-full bg-black/30 border border-white/5 rounded-full py-3 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-kaizen-red/50 transition-all placeholder:text-secondary-grey/60"
                                    suppressHydrationWarning
                                />
                            </div>
                            <button
                                className="bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all rounded-full p-3 group"
                                suppressHydrationWarning
                            >
                                <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="text-white hover:text-kaizen-red transition-colors">
                                <Linkedin className="w-5 h-5 fill-current" />
                            </a>
                            <a href="#" className="text-white hover:text-kaizen-red transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Collaboration */}
                    <div className="md:text-right space-y-2 self-center md:self-end md:mb-12">
                        <p className="text-secondary-grey text-[13px]">Looking for collaboration?</p>
                        <a
                            href="mailto:info@theyoko.com"
                            className="text-xl font-bold hover:text-kaizen-red transition-colors"
                        >
                            info@theyoko.com
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mt-16 mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-secondary-grey font-light">
                    <p>
                        © Copyright 2025 <span className="font-bold text-white">TheYoKo</span><span className="text-kaizen-red font-bold">.</span> LLC. All rights reserved.
                    </p>
                    <a
                        href="#"
                        className="font-bold text-white hover:text-kaizen-red transition-colors"
                    >
                        Careers
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
