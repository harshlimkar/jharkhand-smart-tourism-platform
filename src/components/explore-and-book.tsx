"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ARVRPreviewComponent } from '@/components/ar-vr-preview';
import { 
  Search, 
  Map, 
  MessageCircle, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Phone, 
  Shield, 
  Hospital, 
  Car, 
  Plane, 
  Train, 
  Bed, 
  Camera, 
  Utensils, 
  Mountain, 
  Sun, 
  Cloud, 
  CloudRain,
  Heart,
  Clock,
  Star,
  Filter,
  Send,
  Loader2,
  Eye,
  Headphones,
  Globe,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Navigation,
  Compass,
  Wifi,
  Smartphone,
  QrCode,
  Languages,
  Brain,
  Zap,
  Bot
} from 'lucide-react';

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

export const ExploreAndBook: React.FC<ExploreAndBookProps> = ({ language }) => {
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

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Netarhat',
      description: 'Hill station known as Queen of Chotanagpur',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      priceRange: '₹15,000-25,000',
      duration: '2-3 days',
      coordinates: { lat: 23.4667, lng: 84.2500 },
      culturalSignificance: 'Sacred sunrise point for tribal communities',
      tribalCommunity: 'Munda and Oraon tribes',
      bestVisitTime: 'October to March',
      arAvailable: true,
      vrTours: 3
    },
    {
      id: '2',
      name: 'Patratu Valley',
      description: 'Scenic valley with dam and hills',
      image: '/api/placeholder/300/200',
      rating: 4.3,
      priceRange: '₹8,000-15,000',
      duration: '1-2 days',
      coordinates: { lat: 23.6100, lng: 85.1900 },
      culturalSignificance: 'Traditional fishing grounds',
      tribalCommunity: 'Ho and Santhal communities',
      bestVisitTime: 'November to February',
      arAvailable: true,
      vrTours: 2
    },
    {
      id: '3',
      name: 'Betla National Park',
      description: 'Wildlife sanctuary with tigers and elephants',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      priceRange: '₹12,000-20,000',
      duration: '2-3 days',
      coordinates: { lat: 23.8730, lng: 84.1900 },
      culturalSignificance: 'Sacred forest for tribal communities',
      tribalCommunity: 'Birhor and Kharia tribes',
      bestVisitTime: 'November to March',
      arAvailable: true,
      vrTours: 4
    },
    {
      id: '4',
      name: 'Hundru Falls',
      description: 'Magnificent waterfall surrounded by forests',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      priceRange: '₹6,000-12,000',
      duration: '1 day',
      coordinates: { lat: 23.4372, lng: 85.5908 },
      culturalSignificance: 'Sacred water source',
      tribalCommunity: 'Munda tribal area',
      bestVisitTime: 'July to October',
      arAvailable: true,
      vrTours: 2
    },
    {
      id: '5',
      name: 'Deoghar',
      description: 'Sacred temple town with spiritual significance',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      priceRange: '₹10,000-18,000',
      duration: '2-4 days',
      coordinates: { lat: 24.4833, lng: 86.7000 },
      culturalSignificance: 'Ancient pilgrimage site',
      tribalCommunity: 'Multiple tribal communities',
      bestVisitTime: 'October to March',
      arAvailable: true,
      vrTours: 5
    }
  ];

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
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Enhanced Search Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Navigation className="w-4 h-4 mr-2" />
                )}
                {language === 'hi' ? 'स्थान' : 'Location'}
              </Button>
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
          
          {userLocation && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Compass className="w-4 h-4" />
              <span>Location detected: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Enhanced Filters & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {t.preferences}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  {t.budget}: ₹{budget[0].toLocaleString()}
                </label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={100000}
                  min={5000}
                  step={5000}
                  className="w-full"
                />
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t.duration}
                </label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-day">1 Day</SelectItem>
                    <SelectItem value="2-3-days">2-3 Days</SelectItem>
                    <SelectItem value="4-7-days">4-7 Days</SelectItem>
                    <SelectItem value="1-week+">1+ Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="text-sm font-medium">{t.interests}</label>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <div key={interest.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.id}
                          checked={interests.includes(interest.id)}
                          onCheckedChange={() => handleInterestToggle(interest.id)}
                        />
                        <label 
                          htmlFor={interest.id}
                          className="text-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Icon className="w-3 h-3" />
                          {interest.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transport */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {t.transport}
                </label>
                <Select value={transportMode} onValueChange={setTransportMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Car/Taxi
                      </div>
                    </SelectItem>
                    <SelectItem value="train">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4" />
                        Train
                      </div>
                    </SelectItem>
                    <SelectItem value="bus">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Bus
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accommodation */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  {t.accommodation}
                </label>
                <Select value={accommodationType} onValueChange={setAccommodationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="guesthouse">Guest House</SelectItem>
                    <SelectItem value="homestay">Homestay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced AI Itinerary Generator */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                {t.generateItinerary}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={generatePersonalizedItinerary}
                disabled={isGeneratingItinerary}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGeneratingItinerary ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Smart Plan
                  </>
                )}
              </Button>
              
              {currentItinerary && (
                <div className="mt-4 p-4 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{currentItinerary.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {currentItinerary.confidence}% match
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div>Duration: {currentItinerary.duration} days</div>
                    <div>Cost: ₹{currentItinerary.totalCost.toLocaleString()}</div>
                    <div>Destinations: {currentItinerary.destinations.join(', ')}</div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {currentItinerary.personalizedFeatures.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-green-600">
                        <Zap className="w-3 h-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'hi' 
                  ? 'AI आपकी प्राथमिकताओं के आधार पर व्यक्तिगत यात्रा योजना बनाएगा'
                  : 'AI creates personalized itinerary based on your preferences'
                }
              </p>
            </CardContent>
          </Card>

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
                onClick={() => handleEmergencyCall('police')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Police: 100
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-red-200 text-red-700 hover:bg-red-100"
                onClick={() => handleEmergencyCall('hospital')}
              >
                <Hospital className="w-4 h-4 mr-2" />
                Medical: 108
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-red-200 text-red-700 hover:bg-red-100"
                onClick={() => handleEmergencyCall('tourist')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Tourist Helpline: 1363
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Enhanced Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Weather Widget */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-medium">{weatherData.location}</p>
                    <p className="text-sm text-muted-foreground">{weatherData.temperature}°C • {weatherData.condition}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center">
                      {day.condition === 'Cloudy' && <Cloud className="w-5 h-5 mx-auto text-gray-500" />}
                      {day.condition === 'Rainy' && <CloudRain className="w-5 h-5 mx-auto text-blue-500" />}
                      <p className="text-xs">{day.day}</p>
                      <p className="text-xs font-medium">{day.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map with Real-time Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                {t.map}
                {userLocation && (
                  <Badge variant="secondary" className="ml-2">
                    <Navigation className="w-3 h-3 mr-1" />
                    Live Location
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <Map className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Interactive map with real-time data</p>
                  <p className="text-sm text-muted-foreground">Explore destinations across Jharkhand</p>
                </div>
                
                {/* Simulated location markers */}
                {userLocation && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    Connected
                  </div>
                )}
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" size="sm" onClick={getCurrentLocation}>
                  <Compass className="w-4 h-4 mr-2" />
                  Find Nearby
                </Button>
                <Button variant="outline" size="sm">
                  <QrCode className="w-4 h-4 mr-2" />
                  AR Markers
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Popular Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t.destinations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinations.map((destination) => (
                  <div key={destination.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <Mountain className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-2 left-2 flex gap-1">
                        {destination.arAvailable && (
                          <Badge variant="secondary" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            AR
                          </Badge>
                        )}
                        {destination.vrTours && destination.vrTours > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <Headphones className="w-3 h-3 mr-1" />
                            {destination.vrTours} VR
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="absolute top-2 right-2 bg-white/90 text-black hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {destination.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {destination.description}
                      </p>
                      {destination.tribalCommunity && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {destination.tribalCommunity}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{destination.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{destination.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-green-600">
                        {destination.priceRange}
                      </p>
                      {destination.bestVisitTime && (
                        <p className="text-xs text-blue-600">
                          Best time: {destination.bestVisitTime}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Searches & Saved Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedTrips.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    {language === 'hi' 
                      ? 'अभी तक कोई सहेजी गई यात्रा नहीं। अपनी यात्रा की योजना शुरू करें!'
                      : 'No saved trips yet. Start planning your journey!'
                    }
                  </p>
                ) : (
                  savedTrips.map((trip, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <span className="text-sm">{trip}</span>
                      <Badge variant="secondary">Saved</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Multilingual Chatbot Interface */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                {t.chatbot}
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    {language.toUpperCase()}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea className="h-40 w-full border rounded-md p-3">
                  {chatMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {language === 'hi' 
                        ? 'नमस्ते! मैं आपका झारखंड पर्यटन सहायक हूं। मुझसे कुछ भी पूछें!'
                        : 'Hi! I\'m your Jharkhand tourism assistant. Ask me anything!'
                      }
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            message.isUser 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            {message.message}
                            {!message.isUser && message.aiConfidence && (
                              <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                                <Zap className="w-3 h-3" />
                                {message.aiConfidence}% confidence
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'hi' ? 'स्थान, मौसम, बुकिंग के बारे में पूछें...' : 'Ask about places, weather, bookings...'}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleVoiceRecognition}
                    className={isListening ? 'bg-red-100 border-red-300' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {isListening && (
                  <div className="text-center text-sm text-blue-600 flex items-center justify-center gap-2">
                    <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
                    {language === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};