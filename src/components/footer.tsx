"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Mountain, 
  Trees, 
  Camera, 
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Download,
  Smartphone,
  Award,
  Globe,
  Users,
  Info,
  FileText,
  HelpCircle,
  Star,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  language: 'en' | 'hi' | 'tribal';
}

export const Footer = ({ language }: FooterProps) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const translations = {
    en: {
      title: "Jharkhand Tourism",
      tagline: "Discover the Land of Forests",
      about: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      help: "Help Center",
      tourism: "Tourism Office",
      emergency: "Emergency Numbers",
      newsletter: "Newsletter Signup",
      newsletterDesc: "Get the latest updates on destinations and offers",
      subscribe: "Subscribe",
      subscribed: "Subscribed!",
      popularDestinations: "Popular Destinations",
      categories: "Tourism Categories",
      adventure: "Adventure",
      culture: "Culture",
      wildlife: "Wildlife",
      heritage: "Heritage",
      partnerships: "Government Partners",
      awards: "Awards & Certifications",
      accessibility: "Accessibility",
      accessibilityDesc: "Tourism for everyone",
      developer: "Developed by TechTeam Jharkhand",
      copyright: "© 2024 Government of Jharkhand. All rights reserved."
    },
    hi: {
      title: "झारखंड पर्यटन",
      tagline: "वनों की भूमि की खोज करें",
      about: "हमारे बारे में",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      contact: "संपर्क करें",
      help: "सहायता केंद्र",
      tourism: "पर्यटन कार्यालय",
      emergency: "आपातकालीन नंबर",
      newsletter: "न्यूज़लेटर साइनअप",
      newsletterDesc: "गंतव्यों और ऑफ़र पर नवीनतम अपडेट प्राप्त करें",
      subscribe: "सब्सक्राइब करें",
      subscribed: "सब्सक्राइब हो गया!",
      popularDestinations: "लोकप्रिय गंतव्य",
      categories: "पर्यटन श्रेणियां",
      adventure: "रोमांच",
      culture: "संस्कृति",
      wildlife: "वन्यजीव",
      heritage: "विरासत",
      partnerships: "सरकारी साझेदार",
      awards: "पुरस्कार और प्रमाणपत्र",
      accessibility: "पहुंच",
      accessibilityDesc: "सभी के लिए पर्यटन",
      developer: "टेकटीम झारखंड द्वारा विकसित",
      copyright: "© 2024 झारखंड सरकार। सभी अधिकार सुरक्षित।"
    },
    tribal: {
      title: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱧᱮᱞᱡᱚᱝ",
      tagline: "ᱵᱤᱨ ᱮᱞᱟᱠᱟ ᱧᱮᱞᱢᱮ",
      about: "ᱟᱞᱮ ᱵᱟᱵᱚᱛ",
      privacy: "ᱩᱠᱩ ᱱᱮᱭᱟᱢ",
      terms: "ᱪᱮᱴᱮᱴ ᱱᱤᱭᱟᱹᱢ",
      contact: "ᱥᱚᱢᱯᱚᱨᱠ",
      help: "ᱜᱚᱲᱚ ᱛᱷᱟᱱ",
      tourism: "ᱧᱮᱞᱡᱚᱝ ᱚᱯᱷᱤᱥ",
      emergency: "ᱨᱟᱹᱯᱩᱫ ᱮᱞ",
      newsletter: "ᱠᱷᱚᱵᱚᱨ ᱥᱟᱦᱤ",
      newsletterDesc: "ᱱᱟᱶᱟ ᱡᱟᱜᱟ ᱟᱨ ᱮᱴᱟᱜ ᱠᱷᱚᱵᱚᱨ ᱧᱟᱢᱢᱮ",
      subscribe: "ᱥᱟᱦᱤ ᱢᱮ",
      subscribed: "ᱥᱟᱦᱤ ᱮᱱᱟ!",
      popularDestinations: "ᱧᱩᱛᱩᱢᱟᱱ ᱡᱟᱜᱟ",
      categories: "ᱧᱮᱞᱡᱚᱝ ᱞᱮᱠᱟᱱ",
      adventure: "ᱫᱷᱤᱯ ᱫᱷᱤᱯ",
      culture: "ᱠᱟᱹᱪᱷᱤ",
      wildlife: "ᱵᱤᱨ ᱡᱤᱭ ᱡᱤᱣᱟᱹᱞᱤ",
      heritage: "ᱯᱟᱹᱦᱤᱞ ᱠᱟᱛᱷᱟ",
      partnerships: "ᱥᱚᱨᱠᱟᱨᱤ ᱥᱟᱞᱟ",
      awards: "ᱥᱤᱨᱯᱷᱟᱹ",
      accessibility: "ᱥᱚᱵᱽ ᱞᱟᱹᱜᱤᱫ",
      accessibilityDesc: "ᱥᱚᱵᱽ ᱞᱟᱹᱜᱤᱫ ᱧᱮᱞᱡᱚᱝ",
      developer: "ᱴᱮᱠᱴᱤᱢ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱛᱮ ᱛᱮᱭᱟᱨ",
      copyright: "© 2024 ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ᱾ ᱢᱚᱬᱮ ᱦᱚᱠ ᱫᱚᱦᱚᱭ ᱠᱟᱱᱟ᱾"
    }
  };

  const t = translations[language];

  const destinations = [
    "Netarhat", "Betla National Park", "Ranchi", "Daltonganj", 
    "Hazaribagh", "Deoghar", "Jamshedpur", "Bokaro"
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t.title}</h3>
                <p className="text-sm text-slate-300">{t.tagline}</p>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* App Download Links */}
            <div className="space-y-2">
              <motion.a 
                href="#"
                className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-slate-300">Download on</p>
                  <p className="text-sm font-medium">App Store</p>
                </div>
              </motion.a>
              
              <motion.a 
                href="#"
                className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-slate-300">Get it on</p>
                  <p className="text-sm font-medium">Google Play</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
            <div className="space-y-2">
              {[
                { icon: Info, text: t.about },
                { icon: FileText, text: t.privacy },
                { icon: FileText, text: t.terms },
                { icon: Mail, text: t.contact },
                { icon: HelpCircle, text: t.help }
              ].map((link, index) => (
                <motion.a
                  key={link.text}
                  href="#"
                  className="flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.text}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.a>
              ))}
            </div>

            {/* Tourism Categories */}
            <h5 className="text-md font-medium mt-6 mb-3 text-slate-200">{t.categories}</h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Mountain, text: t.adventure },
                { icon: Users, text: t.culture },
                { icon: Trees, text: t.wildlife },
                { icon: Camera, text: t.heritage }
              ].map((category) => (
                <motion.a
                  key={category.text}
                  href="#"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-green-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <category.icon className="w-3 h-3" />
                  <span>{category.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Popular Destinations & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-green-400">{t.popularDestinations}</h4>
            <div className="grid grid-cols-2 gap-1 mb-6">
              {destinations.map((destination, index) => (
                <motion.a
                  key={destination}
                  href="#"
                  className="text-sm text-slate-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-1"
                  whileHover={{ x: 2 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-3 h-3" />
                  {destination}
                </motion.a>
              ))}
            </div>

            {/* Contact Information */}
            <h5 className="text-md font-medium mb-3 text-slate-200">{t.tourism}</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+91-651-2446901</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-green-400" />
                <span>tourism@jharkhand.gov.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Shield className="w-4 h-4 text-red-400" />
                <span>{t.emergency}: 112, 108</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-green-400">{t.newsletter}</h4>
            <p className="text-sm text-slate-300 mb-4">{t.newsletterDesc}</p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700/30 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-400"
              />
              <Button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    {t.subscribed}
                  </>
                ) : (
                  t.subscribe
                )}
              </Button>
            </form>

            {/* Awards & Certifications */}
            <div className="mt-6">
              <h5 className="text-md font-medium mb-3 text-slate-200">{t.awards}</h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Best Eco Tourism 2023",
                  "Cultural Heritage Award",
                  "Sustainable Tourism",
                  "Adventure Tourism Excellence"
                ].map((award, index) => (
                  <motion.div
                    key={award}
                    className="flex items-center gap-2 p-2 bg-slate-700/20 rounded text-xs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Award className="w-3 h-3 text-yellow-400" />
                    <span className="text-slate-300">{award}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            <div className="mt-4 p-3 bg-slate-700/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-200">{t.accessibility}</span>
              </div>
              <p className="text-xs text-slate-400">{t.accessibilityDesc}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Bottom Bar */}
      <motion.div 
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{t.copyright}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Government Partnership Logos */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-xs text-slate-400">Govt. of India</span>
            </div>
            
            <Separator orientation="vertical" className="h-4 bg-slate-700" />
            
            <div className="text-xs text-slate-500">
              {t.developer}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};