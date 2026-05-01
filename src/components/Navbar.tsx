"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

const navLinks = {
    tr: [
        { name: "Hakkımda", href: "#about" },
        { name: "Deneyim", href: "#experience" },
        { name: "Projeler", href: "#projects" },
        { name: "Yetkinlikler", href: "#skills" },
        { name: "İletişim", href: "#contact" },
    ],
    en: [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ]
};

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    const sections = ["about", "experience", "projects", "skills", "contact"];
                    for (const section of sections) {
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 100 && rect.bottom >= 100) {
                                setActiveSection(section);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
        if (mobileMenuOpen) {
            const close = () => setMobileMenuOpen(false);
            window.addEventListener("scroll", close, { passive: true, once: true });
            return () => window.removeEventListener("scroll", close);
        }
    }, [mobileMenuOpen]);

    const links = navLinks[language];

    return (
        <>
            <header className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`container mx-auto max-w-3xl pointer-events-auto rounded-full transition-all duration-500 border relative ${
                        scrolled
                            ? "bg-background/40 backdrop-blur-xl border-border/50 py-3 shadow-2xl"
                            : "bg-transparent border-transparent py-5"
                    }`}
                >
                    <div className="flex items-center gap-4 px-4 sm:px-6 md:px-8">
                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:flex items-center gap-1 mx-auto overflow-x-auto no-scrollbar py-1">
                            {links.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="relative whitespace-nowrap px-3 py-1.5 text-sm font-semibold transition-colors duration-300"
                                    >
                                        <span className={isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}>
                                            {link.name}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Mobile: Site name / logo area */}
                        <div className="sm:hidden flex-1">
                            <span className="text-sm font-bold text-foreground/80">MZ Şener</span>
                        </div>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center justify-center gap-1.5 shrink-0 px-3 h-9 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/15 active:scale-95 transition-all duration-200"
                            title={language === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
                        >
                            <Languages className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-black text-primary tracking-wide">
                                {language === "tr" ? "EN" : "TR"}
                            </span>
                        </button>

                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/15 active:scale-95 transition-all duration-200"
                                title={theme === "dark" ? "Light Mode" : "Dark Mode"}
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-4 h-4 text-primary" />
                                ) : (
                                    <Moon className="w-4 h-4 text-primary" />
                                )}
                            </button>
                        )}

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/15 active:scale-95 transition-all duration-200"
                            aria-label="Toggle menu"
                            id="mobile-menu-btn"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-4 h-4 text-primary" />
                            ) : (
                                <Menu className="w-4 h-4 text-primary" />
                            )}
                        </button>
                    </div>
                </motion.nav>
            </header>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm sm:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="fixed top-24 left-4 right-4 z-50 sm:hidden"
                        >
                            <div className="bg-background/95 backdrop-blur-2xl border border-border/60 rounded-3xl shadow-2xl overflow-hidden">
                                <nav className="p-3 flex flex-col gap-1">
                                    {links.map((link, i) => {
                                        const isActive = activeSection === link.href.substring(1);
                                        return (
                                            <motion.a
                                                key={link.name}
                                                href={link.href}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                                                }`}
                                            >
                                                {isActive && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                )}
                                                <span className={isActive ? "" : "pl-[18px]"}>{link.name}</span>
                                            </motion.a>
                                        );
                                    })}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
