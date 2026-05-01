"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
    const { language } = useLanguage();

    const t = {
        tr: "Dokuz Eylül Üniversitesi YBS Öğrencisi. Next.js & Framer Motion ile geliştirildi.",
        en: "Dokuz Eylül University MIS Student. Built with Next.js & Framer Motion."
    }[language];

    return (
        <footer className="py-12 px-6 border-t border-border/50 bg-background/50 backdrop-blur-md relative overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-semibold text-foreground mb-1">
                        Mehmet Zeycan Şener
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        {t}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/mzeycansener"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 hover:scale-110 group"
                        title="GitHub"
                    >
                        <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mehmet-zeycan-şener/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 hover:scale-110 group"
                        title="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6 group-hover:-rotate-12 transition-transform" />
                    </a>
                </div>

                <div className="text-sm text-muted-foreground md:text-right">
                    © {new Date().getFullYear()}
                </div>
            </div>

            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </footer>
    );
}
