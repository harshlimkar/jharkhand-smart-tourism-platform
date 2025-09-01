"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Wifi, 
  Car, 
  Train, 
  Bus, 
  Camera,
  Heart,
  Share2,
  Filter,
  ArrowUpDown,
  Calendar,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Award,
  TrendingUp,
  Eye,
  Play,
  Image
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BlockchainVerificationComponent } from "./blockchain-verification";

interface MarketplaceBookingProps {
  language: 'en' | 'hi' | 'tribal';
}

interface Listing {
  id: string;
  title: string;
  type: 'homestay' | 'guide' | 'experience' | 'transport';
  provider: string;
  providerAvatar: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  availability: string;
  amenities?: string[];
  description: string;
  verified: boolean;
  trustScore: number;
  blockchainVerified: boolean;
  culturalAuthenticity?: number;
  tribalCommunity?: string;
  sustainabilityScore?: number;
  experiences?: string[];
}

interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'taxi' | 'rental';
  provider: string;
  route: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  rating: number;
  amenities: string[];
  image?: string;
  verified: boolean;
}

const listings: Listing[] = [
  {
    id: 'homestay1',
    title: 'Traditional Santhal Tribal Homestay',
    type: 'homestay',
    provider: 'Basanti Murmu',
    providerAvatar: '/avatars/basanti.jpg',
    location: 'Santhal Parganas',
    price: 2500,
    currency: '₹',
    rating: 4.9,
    reviews: 47,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/authentic-tribal-homestay-in-jharkhand---e62ccba4-20250901064338.jpg',
    images: [
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/authentic-tribal-homestay-in-jharkhand---e62ccba4-20250901064338.jpg',
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/traditional-santhal-tribal-village-in-jh-de523568-20250901064303.jpg'
    ],
    availability: 'Available',
    amenities: ['Traditional Meals', 'Cultural Programs', 'Clean Rooms', 'Village Tours'],
    description: 'Experience authentic Santhal tribal life with traditional mud houses, organic farming, and cultural immersion.',
    verified: true,
    trustScore: 96,
    blockchainVerified: true,
    culturalAuthenticity: 98,
    tribalCommunity: 'Santhal',
    sustainabilityScore: 94,
    experiences: ['Traditional Dance', 'Handicraft Making', 'Organic Farming', 'Folk Music']
  },
  {
    id: 'guide1',
    title: 'Certified Tribal Culture Guide',
    type: 'guide',
    provider: 'Suresh Munda',
    providerAvatar: '/avatars/suresh.jpg',
    location: 'Ranchi & Surroundings',
    price: 1200,
    currency: '₹',
    rating: 4.8,
    reviews: 89,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/traditional-santhal-tribal-village-in-jh-de523568-20250901064303.jpg',
    availability: 'Available',
    description: 'Expert guide specializing in Munda tribal culture, Jharkhand history, and eco-tourism. Fluent in Hindi, English, and Mundari.',
    verified: true,
    trustScore: 92,
    blockchainVerified: true,
    culturalAuthenticity: 95,
    tribalCommunity: 'Munda',
    experiences: ['Tribal History Tours', 'Sacred Site Visits', 'Cultural Translation', 'Traditional Cooking']
  },
  {
    id: 'craft1',
    title: 'Traditional Dokra Art Workshop',
    type: 'experience',
    provider: 'Jharkhand Craft Collective',
    providerAvatar: '/avatars/collective.jpg',
    location: 'Khunti District',
    price: 800,
    currency: '₹',
    rating: 4.7,
    reviews: 34,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/traditional-tribal-handicrafts-from-jhar-83beb4a7-20250901064323.jpg',
    availability: 'Limited Slots',
    amenities: ['Traditional Meals', 'Cultural Programs', 'Clean Rooms', 'Village Tours'],
    description: 'Learn the ancient art of Dokra metal casting from master artisans. Create your own tribal artifacts to take home.',
    verified: true,
    trustScore: 88,
    blockchainVerified: true,
    culturalAuthenticity: 92,
    sustainabilityScore: 89,
    experiences: ['Metal Casting', 'Design Workshop', 'Cultural Storytelling', 'Artisan Interaction']
  }
];

const transportOptions: TransportOption[] = [
  {
    id: 'bus1',
    type: 'bus',
    provider: 'Jharkhand State Transport',
    route: 'Ranchi → Netarhat',
    price: 450,
    duration: '4h 30m',
    departure: '06:00 AM',
    arrival: '10:30 AM',
    rating: 4.2,
    amenities: ['AC', 'Rest Stops', 'Scenic Route'],
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/local-transportation-in-jharkhand---colo-da38abb0-20250901064357.jpg',
    verified: true
  },
  {
    id: 'taxi1',
    type: 'taxi',
    provider: 'Eco Tours Jharkhand',
    route: 'Ranchi → Hundru Falls',
    price: 1200,
    duration: '1h 15m',
    departure: 'Flexible',
    arrival: 'Flexible',
    rating: 4.6,
    amenities: ['Private Car', 'Local Guide', 'Photography Stops'],
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3ba8390e-0a2a-430c-b3e9-ff05d2d681ae/generated_images/local-transportation-in-jharkhand---colo-da38abb0-20250901064357.jpg',
    verified: true
  }
];

export function MarketplaceBooking({ language }: MarketplaceBookingProps) {
  const [activeTab, setActiveTab] = useState('homestays');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isBooking, setIsBooking] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [showVerification, setShowVerification] = useState(false);

  // Multilingual content
  const translations = {
    en: {
      homestays: "Homestays",
      guides: "Guides", 
      experiences: "Experiences",
      transport: "Transport",
      bookNow: "Book Now",
      viewDetails: "View Details",
      verified: "Verified",
      availability: "Availability",
      reviews: "reviews",
      perDay: "per day",
      trustScore: "Trust Score",
      culturalAuth: "Cultural Authenticity",
      sustainability: "Sustainability",
      filterBy: "Filter by",
      sortBy: "Sort by",
      search: "Search listings...",
      selectPayment: "Select Payment Method",
      confirmBooking: "Confirm Booking",
      bookingSuccess: "Booking Successful!"
    },
    hi: {
      homestays: "होमस्टे",
      guides: "गाइड",
      experiences: "अनुभव", 
      transport: "परिवहन",
      bookNow: "अभी बुक करें",
      viewDetails: "विवरण देखें",
      verified: "सत्यापित",
      availability: "उपलब्धता",
      reviews: "समीक्षाएं",
      perDay: "प्रति दिन",
      trustScore: "ट्रस्ट स्कोर",
      culturalAuth: "सांस्कृतिक प्रामाणिकता",
      sustainability: "स्थिरता",
      filterBy: "फ़िल्टर करें",
      sortBy: "क्रमबद्ध करें",
      search: "लिस्टिंग खोजें...",
      selectPayment: "भुगतान विधि चुनें",
      confirmBooking: "बुकिंग की पुष्टि करें", 
      bookingSuccess: "बुकिंग सफल!"
    },
    tribal: {
      homestays: "Ghar rahna",
      guides: "Raah dikhane wala",
      experiences: "Anubhav",
      transport: "Safar karne ka saadhan",
      bookNow: "Abhi book karo",
      viewDetails: "Tafseel dekho", 
      verified: "Pakka",
      availability: "Milna",
      reviews: "Raay",
      perDay: "Har din",
      trustScore: "Bharosa ank",
      culturalAuth: "Asli sanskriti",
      sustainability: "Tikau",
      filterBy: "Chune",
      sortBy: "Kram se",
      search: "Dhundho...",
      selectPayment: "Paisa dene ka tarika",
      confirmBooking: "Booking pakki karo", 
      bookingSuccess: "Booking ho gayi!"
    }
  };

  const t = translations[language];

  // Enhanced filtering logic
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'budget' && listing.price <= 1000) ||
                        (priceFilter === 'mid' && listing.price > 1000 && listing.price <= 3000) ||
                        (priceFilter === 'premium' && listing.price > 3000);
    
    const matchesLocation = locationFilter === 'all' || 
                           listing.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = activeTab === 'homestays' ? listing.type === 'homestay' :
                       activeTab === 'guides' ? listing.type === 'guide' :
                       activeTab === 'experiences' ? listing.type === 'experience' :
                       activeTab === 'transport' ? listing.type === 'transport' : true;
    
    return matchesSearch && matchesPrice && matchesLocation && matchesType;
  });

  // Enhanced sorting logic
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'trust':
        return b.trustScore - a.trustScore;
      case 'cultural':
        return (b.culturalAuthenticity || 0) - (a.culturalAuthenticity || 0);
      default:
        return 0;
    }
  });

  const handleBooking = useCallback(async (listing: Listing) => {
    setSelectedListing(listing);
    setBookingStep(1);
    setIsBooking(true);

    // Show blockchain verification
    setShowVerification(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationResults({
        providerVerified: true,
        contractGenerated: true,
        escrowSetup: true,
        trustScoreValidated: listing.trustScore
      });
      setShowVerification(false);
    }, 3000);
  }, []);

  const confirmBooking = useCallback(async () => {
    if (!selectedListing || !paymentMethod) return;
    
    setIsBooking(true);
    
    // Simulate booking process with blockchain
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingStep(3);
    setIsBooking(false);
    
    // Reset after success message
    setTimeout(() => {
      setSelectedListing(null);
      setBookingStep(1);
      setPaymentMethod('');
    }, 3000);
  }, [selectedListing, paymentMethod]);

  const openImageGallery = useCallback((listing: Listing, index: number = 0) => {
    if (listing.images && listing.images.length > 0) {
      setSelectedListing(listing);
      setCurrentImageIndex(index);
      setShowImages(true);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Image Gallery Modal */}
      {showImages && selectedListing?.images && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/20 text-white hover:bg-white"
              onClick={() => setShowImages(false)}
            >
              ×
            </Button>
            <img
              src={selectedListing.images[currentImageIndex]}
              alt={selectedListing.title}
              className="w-full h-[80vh] object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {selectedListing.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
              {currentImageIndex + 1} / {selectedListing.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget (≤₹1K)</SelectItem>
                  <SelectItem value="mid">Mid-range (₹1-3K)</SelectItem>
                  <SelectItem value="premium">Premium (>₹3K)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="trust">Trust Score</SelectItem>
                  <SelectItem value="cultural">Cultural Authenticity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="homestays" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {t.homestays}
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t.guides}
          </TabsTrigger>
          <TabsTrigger value="experiences" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            {t.experiences}
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            {t.transport}
          </TabsTrigger>
        </TabsList>

        {/* Listings Grid */}
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {sortedListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="relative lg:w-80 h-48 lg:h-auto">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => openImageGallery(listing)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {listing.blockchainVerified && (
                        <Badge className="bg-blue-500 text-white">
                          <Shield className="w-3 h-3 mr-1" />
                          Blockchain
                        </Badge>
                      )}
                      {listing.verified && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {t.verified}
                        </Badge>
                      )}
                    </div>

                    {/* Image Count */}
                    {listing.images && listing.images.length > 1 && (
                      <Badge className="absolute top-3 right-3 bg-black/50 text-white">
                        <Image className="w-3 h-3 mr-1" />
                        {listing.images.length}
                      </Badge>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-700 hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-700 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-700 hover:bg-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-xl mb-1 group-hover:text-emerald-600 transition-colors">
                          {listing.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          {listing.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          {listing.currency}{listing.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {listing.type === 'homestay' ? t.perDay : listing.type === 'guide' ? 'per day' : 'per person'}
                        </div>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({listing.reviews} {t.reviews})
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {listing.availability}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {listing.description}
                    </p>

                    {/* Amenities/Features */}
                    {listing.amenities && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {listing.amenities.slice(0, 4).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {listing.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{listing.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Trust Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Award className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-muted-foreground">{t.trustScore}</span>
                        </div>
                        <div className="font-medium text-blue-600">{listing.trustScore}%</div>
                      </div>
                      
                      {listing.culturalAuthenticity && (
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-purple-500" />
                            <span className="text-xs text-muted-foreground">{t.culturalAuth}</span>
                          </div>
                          <div className="font-medium text-purple-600">{listing.culturalAuthenticity}%</div>
                        </div>
                      )}
                      
                      {listing.sustainabilityScore && (
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{t.sustainability}</span>
                          </div>
                          <div className="font-medium text-green-600">{listing.sustainabilityScore}%</div>
                        </div>
                      )}
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={listing.providerAvatar} />
                          <AvatarFallback>{listing.provider[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{listing.provider}</div>
                          {listing.tribalCommunity && (
                            <div className="text-xs text-muted-foreground">
                              {listing.tribalCommunity} Community
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleBooking(listing)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        {t.bookNow}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transport Tab Content */}
        <TabsContent value="transport">
          <div className="space-y-4">
            {transportOptions.map((option) => (
              <Card key={option.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {option.image && (
                        <div className="w-20 h-16 rounded-lg overflow-hidden">
                          <img
                            src={option.image}
                            alt={option.provider}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {option.type === 'bus' && <Bus className="w-4 h-4" />}
                          {option.type === 'train' && <Train className="w-4 h-4" />}
                          {option.type === 'taxi' && <Car className="w-4 h-4" />}
                          <span className="font-medium">{option.provider}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {option.route}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {option.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {option.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-semibold text-emerald-600 mb-1">
                        ₹{option.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {option.departure} → {option.arrival}
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Book Transport
                      </Button>
                    </div>
                  </div>
                  
                  {option.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {option.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Blockchain Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Blockchain Verification in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BlockchainVerificationComponent
                providerId={selectedListing?.id || ''}
                onVerificationComplete={(results) => {
                  setVerificationResults(results);
                  setShowVerification(false);
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Modal */}
      {selectedListing && !showVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Book {selectedListing.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedListing(null)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedListing.image}
                      alt={selectedListing.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{selectedListing.title}</h4>
                      <p className="text-sm text-muted-foreground">{selectedListing.location}</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        {selectedListing.currency}{selectedListing.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {verificationResults && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Blockchain Verified</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>✓ Provider identity verified</div>
                        <div>✓ Smart contract generated</div>
                        <div>✓ Escrow system ready</div>
                        <div>✓ Trust score validated: {verificationResults.trustScoreValidated}%</div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => setBookingStep(2)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t.selectPayment}
                    </label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI Payment</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="escrow">Blockchain Escrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setBookingStep(1)}
                      disabled={isBooking}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={confirmBooking}
                      disabled={!paymentMethod || isBooking}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isBooking ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        t.confirmBooking
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-xl font-semibold text-green-800">
                    {t.bookingSuccess}
                  </h3>
                  <p className="text-muted-foreground">
                    Your booking has been confirmed and secured on the blockchain.
                    You'll receive confirmation details shortly.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}