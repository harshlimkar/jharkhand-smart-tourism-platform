"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IndianRupee, Search, MapPin, Calendar, Users, MessageCircle, Mic, MicOff, Volume2, Heart, Star, Eye, Camera, Play, Brain, Sparkles, Loader2, Navigation, Compass, Shield, Phone, Hospital, Zap, Mountain, Sun, Utensils } from "lucide-react";
import { ARVRPreviewComponent } from "./ar-vr-preview";

interface ExploreAndBookProps {
  language: 'en' | 'hi' | 'tribal';
}

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  duration: string;
  coordinates: { lat: number; lng: number };
  culturalSignificance?: string;
  tribalCommunity?: string;
  bestVisitTime?: string;
  arAvailable?: boolean;
  vrTours?: number;
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
  aiConfidence?: number;
  hasAudio?: boolean;
}

interface AIItinerary {
  id: string;
  title: string;
  duration: number;
  destinations: string[];
  totalCost: number;
  culturalExperiences: string[];
  tribalInteractions: string[];
  confidence: number;
  personalizedFeatures: string[];
}

const destinations = [
  {
    id: 1,
    name: "Netarhat Hill Station",
    location: "Latehar District",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/stunning-landscape-of-netarhat-hill-stat-9704a391-20250901064237.jpg",
    priceRange: "₹15,000-25,000",
    rating: 4.8,
    description: "Queen of Chotanagpur",
    highlights: ["Sunrise Views", "Pleasant Climate", "Trekking Trails"],
    culturalSignificance: "Known as the 'Queen of Chotanagpur', sacred sunset viewing spot for local tribes"
  },
  {
    id: 2,
    name: "Hundru Falls",
    location: "Ranchi District", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/hundru-falls-waterfall-in-jharkhand%2c-i-198b4482-20250901064252.jpg",
    priceRange: "₹8,000-15,000",
    rating: 4.6,
    description: "320 feet waterfall majesty",
    highlights: ["Monsoon Beauty", "Photography", "Natural Pool"],
    culturalSignificance: "Sacred water source for Munda tribes, traditional purification ceremonies held here"
  },
  {
    id: 3,
    name: "Betla National Park",
    location: "Latehar & Gumla Districts",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/betla-national-park-wildlife-sanctuary-i-d7669a94-20250901064313.jpg",
    priceRange: "₹12,000-20,000", 
    rating: 4.5,
    description: "Wildlife sanctuary paradise",
    highlights: ["Tiger Safari", "Elephant Spotting", "Tribal Villages"],
    culturalSignificance: "Ancient hunting grounds of tribal kings, traditional wildlife conservation practices"
  },
  {
    id: 4,
    name: "Deoghar Temple Complex",
    location: "Deoghar District",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/deoghar-temple-complex-in-jharkhand---sa-0a342bc3-20250901064348.jpg",
    priceRange: "₹10,000-18,000",
    rating: 4.7,
    description: "Spiritual pilgrimage destination",
    highlights: ["Baidyanath Temple", "Kanwar Yatra", "Sacred Rituals"],
    culturalSignificance: "One of 12 Jyotirlingas, major pilgrimage site blending Hindu and tribal traditions"
  },
  {
    id: 5,
    name: "Tribal Heritage Village",
    location: "Santhal Parganas",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/traditional-santhal-tribal-village-in-jh-de523568-20250901064303.jpg",
    priceRange: "₹6,000-12,000",
    rating: 4.9,
    description: "Authentic tribal culture experience",
    highlights: ["Traditional Dances", "Handicraft Workshops", "Community Meals"],
    culturalSignificance: "Living heritage village showcasing Santhal tribal customs and sustainable practices"
  }
];

export function ExploreAndBook({ language }: ExploreAndBookProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState([50000]);
  const [duration, setDuration] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [accommodationType, setAccommodationType] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [savedTrips, setSavedTrips] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState<AIItinerary | null>(null);
  const [showARVRModal, setShowARVRModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [weatherData, setWeatherData] = useState({
    location: 'Ranchi, Jharkhand',
    temperature: 26,
    condition: 'Sunny',
    forecast: [
      { day: 'Tomorrow', condition: 'Cloudy', temp: 24 },
      { day: 'Friday', condition: 'Rainy', temp: 22 }
    ]
  });

  const filteredDestinations = destinations.filter(d => {
    // Filter based on interests, budget, and location proximity
    const budgetMatch = parseInt(d.priceRange.split('-')[0].replace('₹', '').replace(',', '')) <= budget[0];
    const interestMatch = interests.length === 0 || interests.some(interest => {
      if (interest === 'wildlife') return d.name.includes('National Park') || d.name.includes('Falls');
      if (interest === 'temples') return d.name.includes('Deoghar');
      if (interest === 'nature') return d.name.includes('Valley') || d.name.includes('Netarhat');
      return true;
    });
    return budgetMatch && interestMatch;
  });

  const interestOptions = [
    { id: 'wildlife', label: 'Wildlife', icon: Camera },
    { id: 'temples', label: 'Temples', icon: Mountain },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'nature', label: 'Nature', icon: Sun },
    { id: 'culture', label: 'Culture', icon: Users },
    { id: 'food', label: 'Food', icon: Utensils }
  ];

  // Multilingual content
  const translations = {
    en: {
      searchPlaceholder: "Search destinations in Jharkhand...",
      preferences: "Travel Preferences",
      budget: "Budget",
      duration: "Duration",
      interests: "Interests",
      transport: "Transport Mode",
      accommodation: "Accommodation",
      generateItinerary: "Generate Smart Itinerary",
      emergency: "Emergency & Safety",
      weather: "Weather",
      map: "Interactive Map",
      destinations: "Popular Destinations",
      chatbot: "Travel Assistant"
    },
    hi: {
      searchPlaceholder: "झारखंड में गंतव्य खोजें...",
      preferences: "यात्रा प्राथमिकताएं",
      budget: "बजट",
      duration: "अवधि",
      interests: "रुचियां",
      transport: "परिवहन मोड",
      accommodation: "आवास",
      generateItinerary: "स्मार्ट यात्रा योजना बनाएं",
      emergency: "आपातकाल और सुरक्षा",
      weather: "मौसम",
      map: "इंटरैक्टिव मैप",
      destinations: "लोकप्रिय गंतव्य",
      chatbot: "यात्रा सहायक"
    },
    tribal: {
      searchPlaceholder: "Jharkhand re thana khoj...",
      preferences: "Yatra pasand",
      budget: "Paisa",
      duration: "Samay",
      interests: "Pasand",
      transport: "Gadi",
      accommodation: "Rahne jagah",
      generateItinerary: "Yatra plan banao",
      emergency: "Musibat aur suraksha",
      weather: "Mausam",
      map: "Naksha",
      destinations: "Mashhur jagah",
      chatbot: "Yatra sahayak"
    }
  };

  const t = translations[language];

  // Geolocation functions
  const getCurrentLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });
      
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      setUserLocation(location);
      
      // Update weather based on location
      if (location.lat >= 22 && location.lat <= 25 && location.lng >= 83 && location.lng <= 87) {
        setWeatherData(prev => ({
          ...prev,
          location: 'Your Location, Jharkhand'
        }));
      }
      
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  // Enhanced AI functions
  const generatePersonalizedItinerary = useCallback(async () => {
    setIsGeneratingItinerary(true);
    
    try {
      // Simulate advanced AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const selectedDestinations = destinations
        .filter(d => {
          // Filter based on interests, budget, and location proximity
          const budgetMatch = parseInt(d.priceRange.split('-')[0].replace('₹', '').replace(',', '')) <= budget[0];
          const interestMatch = interests.length === 0 || interests.some(interest => {
            if (interest === 'wildlife') return d.name.includes('National Park') || d.name.includes('Falls');
            if (interest === 'temples') return d.name.includes('Deoghar');
            if (interest === 'nature') return d.name.includes('Valley') || d.name.includes('Netarhat');
            return true;
          });
          return budgetMatch && interestMatch;
        })
        .slice(0, 3);

      const newItinerary: AIItinerary = {
        id: `itinerary_${Date.now()}`,
        title: `Jharkhand Cultural Discovery - ${selectedDestinations.length} Destinations`,
        duration: parseInt(duration.split('-')[0]) || 3,
        destinations: selectedDestinations.map(d => d.name),
        totalCost: selectedDestinations.reduce((acc, d) => {
          const cost = parseInt(d.priceRange.split('-')[0].replace('₹', '').replace(',', ''));
          return acc + cost;
        }, 0),
        culturalExperiences: [
          'Tribal village interactions',
          'Traditional craft workshops',
          'Sacred site visits with local guides',
          'Cultural storytelling sessions'
        ],
        tribalInteractions: [
          'Meet with Munda tribal elders',
          'Learn traditional fishing methods',
          'Participate in tribal festivals',
          'Experience tribal cuisine'
        ],
        confidence: 95,
        personalizedFeatures: [
          `Matched your budget of ₹${budget[0].toLocaleString()}`,
          `Includes ${interests.length} of your interests`,
          'Optimized travel routes',
          'Cultural sensitivity guidelines included'
        ]
      };

      setCurrentItinerary(newItinerary);
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setIsGeneratingItinerary(false);
    }
  }, [budget, interests, duration]);

  // Enhanced chatbot with multilingual support
  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: chatInput,
      isUser: true,
      timestamp: new Date(),
      language
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    
    // Simulate AI response with context awareness
    setTimeout(() => {
      let botResponse = '';
      const input = chatInput.toLowerCase();
      
      if (input.includes('weather') || input.includes('mausam')) {
        botResponse = language === 'hi' 
          ? `आज झारखंड में मौसम अच्छा है। तापमान ${weatherData.temperature}°C है और ${weatherData.condition === 'Sunny' ? 'धूप' : 'बादल'} है। यात्रा के लिए उपयुक्त समय है।`
          : `The weather in Jharkhand is great today! It's ${weatherData.temperature}°C and ${weatherData.condition.toLowerCase()}. Perfect for your trip!`;
      } else if (input.includes('culture') || input.includes('tribal')) {
        botResponse = language === 'hi'
          ? 'झारखंड में समृद्ध आदिवासी संस्कृति है। मुंडा, संथाल, हो और उरांव जनजातियों के साथ बातचीत करें। क्या आप किसी विशेष सांस्कृतिक गतिविधि में रुचि रखते हैं?'
          : 'Jharkhand has a rich tribal culture! You can interact with Munda, Santhal, Ho, and Oraon tribes. Would you like to know about specific cultural activities?';
      } else if (input.includes('book') || input.includes('booking')) {
        botResponse = language === 'hi'
          ? 'मैं आपकी बुकिंग में मदद कर सकता हूं। क्या आप होमस्टे, गाइड या परिवहन बुक करना चाहते हैं? सभी सेवाएं ब्लॉकचेन द्वारा सत्यापित हैं।'
          : 'I can help you with bookings! Would you like to book homestays, guides, or transport? All services are blockchain-verified.';
      } else {
        botResponse = language === 'hi'
          ? 'मैं झारखंड पर्यटन के बारे में आपकी मदद कर सकता हूं। मौसम, संस्कृति, बुकिंग या यात्रा की योजना के बारे में पूछें!'
          : 'I can help you with Jharkhand tourism! Ask me about weather, culture, bookings, or trip planning!';
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        isUser: false,
        timestamp: new Date(),
        language,
        aiConfidence: Math.floor(Math.random() * 20) + 80,
        hasAudio: audioEnabled
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      
      // Play audio response if enabled
      if (audioEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        speechSynthesis.speak(utterance);
      }
    }, 1000);
  }, [chatInput, language, audioEnabled, weatherData]);

  // Voice recognition
  const toggleVoiceRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'tribal' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isListening, language]);

  const handleInterestToggle = useCallback((interestId: string) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  }, []);

  const handleActivityToggle = useCallback((activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(id => id !== activity)
        : [...prev, activity]
    );
  }, []);

  const handleEmergencyCall = useCallback((type: string) => {
    // In a real app, this would make actual calls or open dialer
    console.log(`Emergency call: ${type}`);
  }, []);

  useEffect(() => {
    // Initialize with welcome message
    if (chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        message: language === 'hi' 
          ? 'नमस्ते! मैं आपका झारखंड पर्यटन सहायक हूं। मैं आपकी यात्रा की योजना बनाने में मदद कर सकता हूं।'
          : language === 'tribal'
          ? 'Namaskar! Ham aapka Jharkhand yatra sahayak hain. Yatra plan banane mein madad kar sakte hain.'
          : 'Hello! I\'m your Jharkhand tourism assistant. I can help you plan your perfect trip!',
        isUser: false,
        timestamp: new Date(),
        language,
        aiConfidence: 100
      };
      setChatMessages([welcomeMessage]);
    }
  }, [language, chatMessages.length]);

  return (
    <div className="space-y-6">
      {/* Live Photos Gallery */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            {language === 'hi' ? 'लाइव फोटो गैलरी' : language === 'tribal' ? 'ᱡᱚᱽ ᱞᱟᱦᱟ ᱪᱤᱛᱟᱹᱨ' : 'Live Photo Gallery'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.slice(0, 4).map((destination) => (
              <div key={destination.id} className="relative group cursor-pointer rounded-lg overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-xs font-medium">{destination.name}</div>
                  <div className="text-xs opacity-90 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Live View
                  </div>
                </div>
                <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Controls */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={showARVRModal} onOpenChange={setShowARVRModal}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    AR/VR
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>AR/VR Tourism Experience</DialogTitle>
                  </DialogHeader>
                  <ARVRPreviewComponent />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDestinations.map((destination) => (
          <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <Badge className="absolute top-3 right-3 bg-white/90 text-emerald-600">
                <Star className="w-3 h-3 mr-1 fill-current" />
                {destination.rating}
              </Badge>
              <Button
                size="sm"
                className="absolute bottom-3 right-3 bg-white/90 text-emerald-600 hover:bg-white"
                onClick={() => setSelectedDestination(destination)}
              >
                <Play className="w-4 h-4 mr-1" />
                AR View
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">
                  {destination.name}
                </h3>
                <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {destination.location}
              </p>
              <p className="text-sm mb-3">{destination.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {destination.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-emerald-600">{destination.priceRange}</span>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  {language === 'hi' ? 'देखें' : language === 'tribal' ? 'ᱧᱮᱞ' : 'Explore'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AR/VR Preview Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <ARVRPreviewComponent 
              destination={selectedDestination}
              language={language}
              onClose={() => setSelectedDestination(null)}
            />
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Shield className="w-5 h-5" />
            {t.emergency}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-red-200 text-red-700 hover:bg-red-100"
          >
            <Phone className="w-4 h-4 mr-2" />
            Police: 100
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-red-200 text-red-700 hover:bg-red-100"
          >
            <Hospital className="w-4 h-4 mr-2" />
            Medical: 108
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-red-200 text-red-700 hover:bg-red-100"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Tourist Helpline: 1363
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}