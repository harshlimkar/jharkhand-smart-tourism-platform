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
  Loader2
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
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
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

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Netarhat',
      description: 'Hill station known as Queen of Chotanagpur',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      priceRange: '₹15,000-25,000',
      duration: '2-3 days'
    },
    {
      id: '2',
      name: 'Patratu Valley',
      description: 'Scenic valley with dam and hills',
      image: '/api/placeholder/300/200',
      rating: 4.3,
      priceRange: '₹8,000-15,000',
      duration: '1-2 days'
    },
    {
      id: '3',
      name: 'Betla National Park',
      description: 'Wildlife sanctuary with tigers and elephants',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      priceRange: '₹12,000-20,000',
      duration: '2-3 days'
    },
    {
      id: '4',
      name: 'Hundru Falls',
      description: 'Magnificent waterfall surrounded by forests',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      priceRange: '₹6,000-12,000',
      duration: '1 day'
    },
    {
      id: '5',
      name: 'Deoghar',
      description: 'Sacred temple town with spiritual significance',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      priceRange: '₹10,000-18,000',
      duration: '2-4 days'
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

  const handleGenerateItinerary = useCallback(async () => {
    setIsGeneratingItinerary(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingItinerary(false);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: chatInput,
      isUser: true,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'I can help you plan your trip to Jharkhand! What specific information do you need?',
        isUser: false,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  }, [chatInput]);

  const handleEmergencyCall = useCallback((type: string) => {
    // In a real app, this would make actual calls or open dialer
    console.log(`Emergency call: ${type}`);
  }, []);

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search destinations in Jharkhand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Filters & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  Budget: ₹{budget[0].toLocaleString()}
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
                  Duration
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
                <label className="text-sm font-medium">Interests</label>
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
                  Transport Mode
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
                  Accommodation
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

          {/* AI Itinerary Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Trip Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleGenerateItinerary}
                disabled={isGeneratingItinerary}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGeneratingItinerary ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Smart Itinerary
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                AI will create a personalized itinerary based on your preferences
              </p>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Shield className="w-5 h-5" />
                Emergency & Safety
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

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-medium">Ranchi, Jharkhand</p>
                    <p className="text-sm text-muted-foreground">26°C • Sunny</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-center">
                    <Cloud className="w-5 h-5 mx-auto text-gray-500" />
                    <p className="text-xs">Tomorrow</p>
                    <p className="text-xs font-medium">24°C</p>
                  </div>
                  <div className="text-center">
                    <CloudRain className="w-5 h-5 mx-auto text-blue-500" />
                    <p className="text-xs">Friday</p>
                    <p className="text-xs font-medium">22°C</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                  <p className="text-sm text-muted-foreground">Explore destinations across Jharkhand</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Popular Destinations
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
                    No saved trips yet. Start planning your journey!
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

          {/* Chatbot Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Travel Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea className="h-40 w-full border rounded-md p-3">
                  {chatMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Hi! I'm your travel assistant. Ask me anything about Jharkhand tourism!
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
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about places, weather, bookings..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};