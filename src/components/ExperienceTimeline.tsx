"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, GraduationCap, Globe, X, Hexagon } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Highlight {
    label: string;
    value: string;
}

interface LocalizedString {
    tr: string;
    en: string;
}

interface LocalizedHighlights {
    tr: Highlight[];
    en: Highlight[];
}

interface LocalizedTags {
    tr: string[];
    en: string[];
}

interface TimelineItem {
    id: number;
    type: "experience" | "education" | "personal";
    icon: React.ReactNode;
    date: LocalizedString;
    title: LocalizedString;
    organization: LocalizedString;
    image: string;
    description: LocalizedString;
    badges: LocalizedTags;
    highlights: LocalizedHighlights;
}

const timelineData: TimelineItem[] = [
    {
        id: 4,
        type: "experience",
        icon: <Briefcase className="w-5 h-5" />,
        date: { tr: "Nisan 2026 - Günümüz", en: "April 2026 - Present" },
        title: { tr: "Satış & Pazarlama Stajyeri", en: "Sales & Marketing Intern" },
        organization: { tr: "k12 Bilişim", en: "k12 Bilisim" },
        image: "/204408_258650.jpeg",
        description: {
            tr: "k12 Bilişim bünyesinde pazar araştırmaları, müşteri ilişkileri yönetimi ve B2B satış stratejileri üzerine çalışıyorum.",
            en: "Working at k12 Bilisim focusing on market research, customer relationship management, and B2B sales strategies."
        },
        badges: {
            tr: ["Satış", "Pazarlama", "B2B"],
            en: ["Sales", "Marketing", "B2B"]
        },
        highlights: { tr: [], en: [] }
    },
    {
        id: 5,
        type: "experience",
        icon: <Briefcase className="w-5 h-5" />,
        date: { tr: "Nisan 2026 - Günümüz", en: "April 2026 - Present" },
        title: { tr: "Eğitim Teknolojileri Pazarlama Stajyeri", en: "EdTech Marketing Intern" },
        organization: { tr: "EduPage Türkiye", en: "EduPage Turkey" },
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
        description: {
            tr: "EduPage Türkiye platformunun eğitim kurumlarına tanıtımı, dijital pazarlama kampanyalarının yönetimi ve ürün stratejisi üzerine görev alıyorum.",
            en: "Promoting the EduPage Turkey platform to educational institutions, managing digital marketing campaigns, and working on product strategy."
        },
        badges: {
            tr: ["EduPage", "Eğitim Teknolojileri", "Dijital Pazarlama"],
            en: ["EduPage", "EdTech", "Digital Marketing"]
        },
        highlights: { tr: [], en: [] }
    },
    {
        id: 1,
        type: "experience",
        icon: <Briefcase className="w-5 h-5" />,
        date: { tr: "2024 - Günümüz", en: "2024 - Present" },
        title: { tr: "YBS Uzmanı & Full-Stack", en: "MIS Specialist & Full-Stack" },
        organization: { tr: "Freelance", en: "Freelance" },
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
        description: {
            tr: "Node.js ve JavaScript ile ölçeklenebilir backend sistemleri kuruyorum.",
            en: "Building scalable backend systems with Node.js and JavaScript."
        },
        badges: {
            tr: ["Node.js", "MySQL", "System Analysis"],
            en: ["Node.js", "MySQL", "System Analysis"]
        },
        highlights: { tr: [], en: [] }
    },
    {
        id: 2,
        type: "education",
        icon: <GraduationCap className="w-5 h-5" />,
        date: { tr: "2022 - Günümüz", en: "2022 - Present" },
        title: { tr: "Yönetim Bilişim Sistemleri (YBS)", en: "Management Information Systems (MIS)" },
        organization: { tr: "Dokuz Eylül Üniversitesi", en: "Dokuz Eylul University" },
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
        description: {
            tr: "Yönetim Bilişim Sistemleri (YBS) eğitimi ile işletme, bilişim ve analitik karar alma disiplinlerini harmanlayan disiplinlerarası bir eğitim alıyorum. Program kapsamında veri odaklı iş stratejileri geliştirme, sistem tasarımı ve kurumsal kaynak yönetimi üzerine uzmanlaşmış dersler almaktayım.",
            en: "I am receiving an interdisciplinary education that blends business, information technology, and analytical decision-making. Within the program, I take specialized courses on developing data-driven business strategies, system design, and enterprise resource management."
        },
        badges: {
            tr: ["YBS", "DEÜ İşletme Fakültesi", "İşletme - Bilişim - Analiz"],
            en: ["MIS", "DEU Faculty of Business", "Business - IT - Analysis"]
        },
        highlights: {
            tr: [
                { label: "Bilişim & Yazılım", value: "Algoritma · Veritabanı · Sistem Analizi · Nesneye Yönelik Programlama" },
                { label: "Analitik & Karar", value: "İstatistik I-II · Yöneylem Araştırması · Veri Madenciliği" },
                { label: "İşletme & Strateji", value: "Ekonomi · Pazarlama · Finans · İşletme Hukuku" }
            ],
            en: [
                { label: "IT & Software", value: "Algorithms · Database · System Analysis · OOP" },
                { label: "Analytics & Decision", value: "Statistics I-II · Operations Research · Data Mining" },
                { label: "Business & Strategy", value: "Economics · Marketing · Finance · Business Law" }
            ]
        }
    },
    {
        id: 3,
        type: "personal",
        icon: <Globe className="w-5 h-5" />,
        date: { tr: "Kişisel Profil", en: "Personal Profile" },
        title: { tr: "Sosyal Profil & Kişisel Disiplin", en: "Social Profile & Personal Discipline" },
        organization: { tr: "Karakter Analizi", en: "Character Analysis" },
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1000",
        description: {
            tr: "Teknik yetkinliğimin yanında kişisel disiplin ve yaratıcılıkla kendimi geliştiriyorum.",
            en: "Alongside my technical competence, I develop myself with personal discipline and creativity."
        },
        badges: {
            tr: ["İngilizce", "İspanyolca", "AFDOS"],
            en: ["English", "Spanish", "AFDOS"]
        },
        highlights: {
            tr: [
                { label: "Dil & İletişim", value: "İleri Seviye İngilizce · Gelişmekte Olan İspanyolca" },
                { label: "Doğa & Macera", value: "AFDOS bünyesinde doğa sporları ve kampçılık" },
                { label: "Müzik", value: "Bas gitar ile ritim ve takım içi uyum becerisi" }
            ],
            en: [
                { label: "Language & Comms", value: "Advanced English · Developing Spanish" },
                { label: "Nature & Adventure", value: "Outdoor sports and camping at AFDOS" },
                { label: "Music", value: "Rhythm and teamwork skills via bass guitar" }
            ]
        }
    }
];

export function ExperienceTimeline() {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 35, stiffness: 300, mass: 0.5 });
    const springY = useSpring(mouseY, { damping: 35, stiffness: 300, mass: 0.5 });
    
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { language } = useLanguage();

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseEnter = (item: TimelineItem) => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setSelectedItem(item);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setSelectedItem(null);
            setIsVisible(false);
        }, 100);
    };

    const t = {
        tr: { highlightsTitle: "Öne Çıkanlar", keywordsTitle: "Anahtar Kelimeler" },
        en: { highlightsTitle: "Highlights", keywordsTitle: "Keywords" }
    }[language];

    // Group items by their localized date string so identical dates share the same timeline dot
    const groupedData: Record<string, typeof timelineData> = {};
    timelineData.forEach((item) => {
        const dateStr = item.date[language];
        if (!groupedData[dateStr]) groupedData[dateStr] = [];
        groupedData[dateStr].push(item);
    });

    const convertedData = Object.entries(groupedData).map(([dateStr, items]) => ({
        title: dateStr,
        content: (
            <div className="flex flex-col gap-6 mb-12">
                {items.map((item) => (
                    <div key={item.id}>
                        <motion.div
                            layoutId={`timeline-card-${item.id}`}
                            onMouseEnter={() => handleMouseEnter(item)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setSelectedItem(item)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer group relative rounded-2xl overflow-hidden shadow-lg"
                        >
                            <div
                                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />

                            <GlassCard className="p-6 relative z-10 border-transparent hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative p-2 rounded-lg bg-primary/10 text-primary">
                                        <Hexagon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-12" />
                                        <div className="relative z-10">{item.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{item.title[language]}</h3>
                                        <p className="text-sm text-primary font-medium">{item.organization[language]}</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                    {item.description[language]}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {item.badges[language].slice(0, 3).map((badge, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                                            {badge}
                                        </span>
                                    ))}
                                    {item.badges[language].length > 3 && (
                                        <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                                            +{item.badges[language].length - 3}
                                        </span>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                ))}
            </div>
        )
    }));

    return (
        <section 
            id="experience" 
            onMouseMove={handleMouseMove}
            className="py-24 bg-muted/30 relative overflow-visible"
        >
            <Timeline data={convertedData} />

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: isVisible ? 1 : 0, 
                            scale: isVisible ? 1 : 0.8 
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="pointer-events-none fixed z-[100] overflow-hidden rounded-3xl shadow-2xl border border-border hidden lg:block"
                        style={{
                            width: "450px",
                            left: 40,
                            top: -150,
                            x: springX,
                            y: springY,
                        }}
                    >
                        <div className="w-full bg-card flex flex-col relative">
                            {/* Reusing the design as requested */}
                            <div className="h-40 relative w-full overflow-hidden shrink-0">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title[language]}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                                
                                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
                                    <div className="relative p-2 rounded-lg bg-primary/20 text-primary backdrop-blur-md border border-primary/30">
                                        <Hexagon className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 -rotate-12" />
                                        <div className="relative z-10">{selectedItem.icon}</div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-foreground leading-tight">
                                            {selectedItem.title[language]}
                                        </h2>
                                        <p className="text-primary text-xs font-medium">{selectedItem.organization[language]}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <p className="text-foreground/80 text-xs leading-relaxed mb-4 line-clamp-3">
                                    {selectedItem.description[language]}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {selectedItem.badges[language].map((badge, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-primary/10 rounded-md text-[10px] font-bold text-primary">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Modal (Existing Design) */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 cursor-pointer"
                        />
                        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
                            <motion.div
                                layoutId={`timeline-card-${selectedItem.id}`}
                                className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-card rounded-3xl shadow-2xl pointer-events-auto flex flex-col relative border border-border"
                            >
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-red-500 hover:text-white backdrop-blur-md transition-colors z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="h-48 sm:h-64 relative w-full overflow-hidden shrink-0">
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.title[language]}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
                                    <div className="relative p-3 rounded-xl bg-primary/20 text-primary backdrop-blur-md border border-primary/30 hidden sm:block">
                                        <Hexagon className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 -rotate-12" />
                                        <div className="relative z-10">{selectedItem.icon}</div>
                                    </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold backdrop-blur-md">
                                                    {selectedItem.date[language]}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                                                {selectedItem.title[language]}
                                            </h2>
                                            <p className="text-primary font-medium">{selectedItem.organization[language]}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 flex-1">
                                    <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-8">
                                        {selectedItem.description[language]}
                                    </p>

                                    {selectedItem.highlights[language] && selectedItem.highlights[language].length > 0 && (
                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">
                                                {t.highlightsTitle}
                                            </h4>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {selectedItem.highlights[language].map((highlight, idx) => (
                                                    <div key={idx} className="bg-muted/50 p-4 rounded-xl">
                                                        <span className="block text-primary text-xs font-bold mb-1">
                                                            {highlight.label}
                                                        </span>
                                                        <span className="text-sm font-medium text-foreground/80">
                                                            {highlight.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">
                                            {t.keywordsTitle}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItem.badges[language].map((badge, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
