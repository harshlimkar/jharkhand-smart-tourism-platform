"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Car, 
  Train, 
  Plane, 
  Bus, 
  Heart, 
  Share2, 
  Eye, 
  ShoppingBag, 
  Award, 
  Shield, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Bookmark,
  Camera,
  Utensils,
  Mountain,
  TreePine,
  Home,
  Building,
  Palette,
  Workflow,
  CheckCircle2,
  Lock,
  Smartphone,
  CreditCard,
  QrCode,
  Globe,
  Headphones,
  MessageCircle,
  Navigation,
  Zap,
  TrendingUp,
  AlertTriangle,
  FileText,
  Verified,
  DollarSign,
  IndianRupee,
  Loader2,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Settings,
  UserCheck,
  Calendar1,
  PhoneCall,
  Mail,
  Star as StarIcon,
  ThumbsUp,
  MessageSquare,
  Wallet,
  Banknote,
  Receipt,
  History
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { BlockchainVerificationComponent } from '@/components/blockchain-verification';
import { toast } from 'sonner';

interface MarketplaceBookingProps {
  language: 'en' | 'hi' | 'tribal';
}

interface Listing {
  id: string;
  title: string;
  type: 'homestay' | 'guide' | 'transport' | 'equipment' | 'experience';
  provider: string;
  providerVerified: boolean;
  trustScore: number;
  blockchainCertified: boolean;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  duration: string;
  location: string;
  description: string;
  amenities: string[];
  image: string;
  availability: 'available' | 'limited' | 'booked';
  tribalCommunity?: string;
  culturalExperience?: boolean;
  smartContractAvailable?: boolean;
  escrowProtection?: boolean;
  instantBooking?: boolean;
  coordinates?: { lat: number; lng: number };
  cancellationPolicy?: string;
  languages?: string[];
  specializations?: string[];
  equipment?: string[];
  vrPreview?: boolean;
  arFeatures?: boolean;
}

interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'flight' | 'taxi' | 'rental';
  operator: string;
  route: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  verified: boolean;
  realTimeTracking: boolean;
  bookingProtection: boolean;
  cancellationFree: boolean;
  rating: number;
  availableSeats?: number;
  amenities: string[];
}

interface SmartContract {
  id: string;
  bookingId: string;
  type: 'accommodation' | 'guide' | 'transport' | 'full-package';
  status: 'draft' | 'active' | 'completed' | 'disputed';
  amount: number;
  escrowAmount: number;
  parties: string[];
  terms: string[];
  milestones: ContractMilestone[];
  createdAt: string;
  expiresAt?: string;
}

interface ContractMilestone {
  id: string;
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'disputed';
  dueDate: string;
}

interface BookingState {
  selectedListing: Listing | null;
  selectedTransport: TransportOption | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  smartContract?: SmartContract;
  paymentMethod: 'blockchain' | 'traditional';
  escrowEnabled: boolean;
}

export const MarketplaceBooking: React.FC<MarketplaceBookingProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('listings');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedListing: null,
    selectedTransport: null,
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalAmount: 0,
    paymentMethod: 'blockchain',
    escrowEnabled: true
  });
  const [isBooking, setIsBooking] = useState(false);
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mock data for listings with blockchain verification
  const listings: Listing[] = [
    {
      id: 'h001',
      title: 'Authentic Munda Tribal Homestay',
      type: 'homestay',
      provider: 'Sita Devi Munda',
      providerVerified: true,
      trustScore: 95,
      blockchainCertified: true,
      rating: 4.8,
      reviewCount: 127,
      price: 2500,
      currency: '₹',
      duration: 'per night',
      location: 'Netarhat, Jharkhand',
      description: 'Experience authentic tribal culture in a traditional Munda family home',
      amenities: ['Tribal Cuisine', 'Cultural Stories', 'Traditional Crafts', 'Nature Walks'],
      image: '/api/placeholder/300/200',
      availability: 'available',
      tribalCommunity: 'Munda',
      culturalExperience: true,
      smartContractAvailable: true,
      escrowProtection: true,
      instantBooking: false,
      coordinates: { lat: 23.4667, lng: 84.2500 },
      cancellationPolicy: 'Free cancellation up to 48 hours',
      languages: ['Hindi', 'Mundari', 'English'],
      vrPreview: true,
      arFeatures: false
    },
    {
      id: 'g001',
      title: 'Certified Tribal Heritage Guide',
      type: 'guide',
      provider: 'Raj Kumar Mahato',
      providerVerified: true,
      trustScore: 92,
      blockchainCertified: true,
      rating: 4.9,
      reviewCount: 89,
      price: 1500,
      currency: '₹',
      duration: 'per day',
      location: 'Betla National Park',
      description: 'Expert guide with 15+ years experience in tribal culture and wildlife',
      amenities: ['Wildlife Expertise', 'Tribal History', 'Photography Assistance', 'Safety Training'],
      image: '/api/placeholder/300/200',
      availability: 'available',
      tribalCommunity: 'Ho Tribe',
      culturalExperience: true,
      smartContractAvailable: true,
      escrowProtection: true,
      instantBooking: true,
      languages: ['Hindi', 'English', 'Ho', 'Santhali'],
      specializations: ['Wildlife Photography', 'Tribal Culture', 'Forest Ecology', 'Adventure Tourism'],
      vrPreview: false,
      arFeatures: true
    },
    {
      id: 't001',
      title: 'Eco-Friendly Village Transport',
      type: 'transport',
      provider: 'Green Transport Co-op',
      providerVerified: true,
      trustScore: 88,
      blockchainCertified: true,
      rating: 4.5,
      reviewCount: 156,
      price: 800,
      currency: '₹',
      duration: 'per trip',
      location: 'Ranchi to Tribal Villages',
      description: 'Sustainable transport service run by local tribal cooperative',
      amenities: ['GPS Tracking', 'Local Driver', 'Cultural Commentary', 'Flexible Stops'],
      image: '/api/placeholder/300/200',
      availability: 'limited',
      smartContractAvailable: true,
      escrowProtection: true,
      instantBooking: true,
      languages: ['Hindi', 'English', 'Local Dialects'],
      vrPreview: false,
      arFeatures: false
    }
  ];

  const transportOptions: TransportOption[] = [
    {
      id: 'bus001',
      type: 'bus',
      operator: 'Jharkhand State Transport',
      route: 'Ranchi → Netarhat',
      price: 450,
      duration: '4h 30m',
      departure: '08:00 AM',
      arrival: '12:30 PM',
      verified: true,
      realTimeTracking: true,
      bookingProtection: true,
      cancellationFree: true,
      rating: 4.2,
      availableSeats: 18,
      amenities: ['AC', 'WiFi', 'Charging Ports', 'Refreshments']
    },
    {
      id: 'train001',
      type: 'train',
      operator: 'Indian Railways',
      route: 'Ranchi → Lohardaga → Netarhat',
      price: 320,
      duration: '5h 15m',
      departure: '06:45 AM',
      arrival: '12:00 PM',
      verified: true,
      realTimeTracking: true,
      bookingProtection: true,
      cancellationFree: false,
      rating: 4.0,
      availableSeats: 45,
      amenities: ['Sleeper', 'Catering', 'Clean Restrooms']
    },
    {
      id: 'taxi001',
      type: 'taxi',
      operator: 'Local Taxi Union',
      route: 'Ranchi → Destination',
      price: 2800,
      duration: '3h 45m',
      departure: 'Flexible',
      arrival: 'Flexible',
      verified: true,
      realTimeTracking: true,
      bookingProtection: true,
      cancellationFree: true,
      rating: 4.6,
      amenities: ['Door to Door', 'Local Guide', 'Flexible Timing', 'Cultural Commentary']
    }
  ];

  const marketplaceCategories = [
    { name: 'All', icon: ShoppingBag, count: 145 },
    { name: 'Homestays', icon: Home, count: 32 },
    { name: 'Guides', icon: Users, count: 28 },
    { name: 'Transport', icon: Car, count: 19 },
    { name: 'Experiences', icon: Camera, count: 41 },
    { name: 'Handicrafts', icon: Palette, count: 25 },
    { name: 'Workshops', icon: Workflow, count: 67 }
  ];

  // Translations
  const translations = {
    en: {
      searchPlaceholder: "Search accommodations, guides, transport...",
      filters: "Filters",
      priceRange: "Price Range",
      verifiedOnly: "Verified Providers Only",
      blockchainCert: "Blockchain Certified",
      bookNow: "Book Now",
      viewDetails: "View Details",
      instantBooking: "Instant Booking",
      smartContract: "Smart Contract",
      escrowProtection: "Escrow Protection",
      realTimeTracking: "Real-time Tracking",
      culturalExperience: "Cultural Experience",
      tribalCommunity: "Tribal Community",
      marketplace: "Local Marketplace",
      transport: "Transport Comparison",
      bookings: "My Bookings",
      contracts: "Smart Contracts"
    },
    hi: {
      searchPlaceholder: "आवास, गाइड, परिवहन खोजें...",
      filters: "फ़िल्टर",
      priceRange: "मूल्य सीमा",
      verifiedOnly: "केवल सत्यापित प्रदाता",
      blockchainCert: "ब्लॉकचेन प्रमाणित",
      bookNow: "अभी बुक करें",
      viewDetails: "विवरण देखें",
      instantBooking: "तत्काल बुकिंग",
      smartContract: "स्मार्ट कॉन्ट्रैक्ट",
      escrowProtection: "एस्क्रो सुरक्षा",
      realTimeTracking: "रियल-टाइम ट्रैकिंग",
      culturalExperience: "सांस्कृतिक अनुभव",
      tribalCommunity: "आदिवासी समुदाय",
      marketplace: "स्थानीय बाज़ार",
      transport: "परिवहन तुलना",
      bookings: "मेरी बुकिंग",
      contracts: "स्मार्ट कॉन्ट्रैक्ट"
    },
    tribal: {
      searchPlaceholder: "Ghar, guide, gadi khoj...",
      filters: "Chaan",
      priceRange: "Paisa range",
      verifiedOnly: "Sachi provider",
      blockchainCert: "Blockchain pakka",
      bookNow: "Abhi book kar",
      viewDetails: "Detail dekh",
      instantBooking: "Turant booking",
      smartContract: "Smart contract",
      escrowProtection: "Paisa suraksha",
      realTimeTracking: "Live tracking",
      culturalExperience: "Sanskriti anubhav",
      tribalCommunity: "Adivasi samaj",
      marketplace: "Local market",
      transport: "Gadi compare",
      bookings: "Mera booking",
      contracts: "Smart contract"
    }
  };

  const t = translations[language];

  // Filtered listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'homestays' && listing.type === 'homestay') ||
                           (selectedCategory === 'guides' && listing.type === 'guide') ||
                           (selectedCategory === 'transport' && listing.type === 'transport') ||
                           (selectedCategory === 'experiences' && listing.type === 'experience');
    
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesVerified = !showVerifiedOnly || listing.providerVerified;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesVerified;
  });

  // Smart contract creation
  const createSmartContract = (listing: Listing, bookingDetails: any): SmartContract => {
    return {
      id: `sc_${Date.now()}`,
      bookingId: `booking_${Date.now()}`,
      type: listing.type === 'homestay' ? 'accommodation' : 
            listing.type === 'guide' ? 'guide' : 
            listing.type === 'transport' ? 'transport' : 'full-package',
      status: 'draft',
      amount: bookingDetails.totalAmount,
      escrowAmount: bookingDetails.totalAmount * 0.1, // 10% escrow
      parties: ['customer', listing.provider],
      terms: [
        'Service must be provided as described',
        'Payment released upon service completion',
        'Dispute resolution through blockchain arbitration',
        'Full refund if service not provided'
      ],
      milestones: [
        {
          id: 'milestone_1',
          description: 'Booking Confirmation',
          amount: bookingDetails.totalAmount * 0.2,
          status: 'pending',
          dueDate: bookingState.checkIn
        },
        {
          id: 'milestone_2',
          description: 'Service Delivery',
          amount: bookingDetails.totalAmount * 0.8,
          status: 'pending',
          dueDate: bookingState.checkOut
        }
      ],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };
  };

  // Booking process with blockchain
  const handleBooking = async (listing: Listing) => {
    setIsBooking(true);
    try {
      // Calculate total amount
      const baseAmount = listing.price * bookingState.guests;
      const days = bookingState.checkIn && bookingState.checkOut 
        ? Math.max(1, Math.ceil((new Date(bookingState.checkOut).getTime() - new Date(bookingState.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
        : 1;
      
      const totalAmount = listing.type === 'homestay' ? baseAmount * days : baseAmount;
      
      setBookingState(prev => ({ ...prev, totalAmount, selectedListing: listing }));
      
      // Create smart contract if enabled
      if (listing.smartContractAvailable && bookingState.paymentMethod === 'blockchain') {
        const contract = createSmartContract(listing, { totalAmount });
        setSmartContracts(prev => [...prev, contract]);
        setBookingState(prev => ({ ...prev, smartContract: contract }));
      }
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(
        language === 'hi' 
          ? 'बुकिंग सफल! ब्लॉकचेन पर पुष्टि की गई।'
          : 'Booking successful! Confirmed on blockchain.'
      );
      
      setShowBookingDialog(true);
      
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Real-time updates simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        // Simulate real-time price and availability updates
        // In a real app, this would connect to WebSocket or polling
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  // Listing card component
  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.blockchainCertified && (
            <Badge className="bg-green-600 text-white">
              <Verified className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {listing.smartContractAvailable && (
            <Badge className="bg-blue-600 text-white">
              <Lock className="w-3 h-3 mr-1" />
              Smart Contract
            </Badge>
          )}
          {listing.instantBooking && (
            <Badge className="bg-orange-600 text-white">
              <Zap className="w-3 h-3 mr-1" />
              Instant
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-black/60 text-white border-white/30">
            {listing.availability === 'available' ? 'Available' : 
             listing.availability === 'limited' ? 'Limited' : 'Full'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            <p className="text-sm text-muted-foreground">{listing.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-sm text-muted-foreground">({listing.reviewCount})</span>
            </div>
            {listing.providerVerified && (
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Trust Score: {listing.trustScore}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        {listing.tribalCommunity && (
          <div className="flex items-center gap-1 mb-2">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-600">{listing.tribalCommunity}</span>
            {listing.culturalExperience && (
              <Badge variant="outline" className="ml-2 text-xs">Cultural Experience</Badge>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {listing.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{listing.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">
              {listing.currency}{listing.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/{listing.duration}</span>
          </div>
          <div className="flex gap-2">
            {listing.vrPreview && (
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            )}
            {listing.arFeatures && (
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {/* View details */}}
        >
          <Eye className="w-4 h-4 mr-2" />
          {t.viewDetails}
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          onClick={() => handleBooking(listing)}
          disabled={isBooking || listing.availability === 'booked'}
        >
          {isBooking ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : listing.instantBooking ? (
            <Zap className="w-4 h-4 mr-2" />
          ) : (
            <Calendar className="w-4 h-4 mr-2" />
          )}
          {t.bookNow}
        </Button>
      </CardFooter>
    </Card>
  );

  // Transport option card
  const TransportCard = ({ transport }: { transport: TransportOption }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {transport.type === 'bus' && <Bus className="w-6 h-6 text-blue-600" />}
            {transport.type === 'train' && <Train className="w-6 h-6 text-green-600" />}
            {transport.type === 'flight' && <Plane className="w-6 h-6 text-purple-600" />}
            {transport.type === 'taxi' && <Car className="w-6 h-6 text-orange-600" />}
            <div>
              <h4 className="font-semibold">{transport.operator}</h4>
              <p className="text-sm text-muted-foreground">{transport.route}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              ₹{transport.price.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-3 h-3" />
              {transport.duration}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
          <div>
            <span className="text-muted-foreground">Departure: </span>
            <span className="font-medium">{transport.departure}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Arrival: </span>
            <span className="font-medium">{transport.arrival}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{transport.rating}</span>
          </div>
          {transport.availableSeats && (
            <div className="text-sm text-muted-foreground">
              {transport.availableSeats} seats left
            </div>
          )}
          {transport.verified && (
            <Badge variant="secondary" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {transport.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          {transport.realTimeTracking && (
            <Badge variant="secondary" className="text-xs">
              <Navigation className="w-3 h-3 mr-1" />
              Live Tracking
            </Badge>
          )}
          {transport.bookingProtection && (
            <Badge variant="secondary" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Protected
            </Badge>
          )}
          {transport.cancellationFree && (
            <Badge variant="secondary" className="text-xs">
              <RefreshCw className="w-3 h-3 mr-1" />
              Free Cancel
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <Calendar className="w-4 h-4 mr-2" />
          Book Transport
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
              <Dialog open={showBlockchainModal} onOpenChange={setShowBlockchainModal}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Blockchain Hub
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Blockchain Verification Hub</DialogTitle>
                  </DialogHeader>
                  <BlockchainVerificationComponent />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Switch
                  checked={showVerifiedOnly}
                  onCheckedChange={setShowVerifiedOnly}
                />
                <span>{t.verifiedOnly}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{filteredListings.filter(l => l.blockchainCertified).length} {t.blockchainCert}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <Switch
                  checked={realTimeUpdates}
                  onCheckedChange={setRealTimeUpdates}
                />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="listings">
            <Home className="w-4 h-4 mr-2" />
            Listings
          </TabsTrigger>
          <TabsTrigger value="transport">
            <Car className="w-4 h-4 mr-2" />
            Transport
          </TabsTrigger>
          <TabsTrigger value="marketplace">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileText className="w-4 h-4 mr-2" />
            Contracts
          </TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <Card className="lg:w-80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t.filters}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">{t.priceRange}</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="homestays">Homestays</SelectItem>
                      <SelectItem value="guides">Tour Guides</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="experiences">Experiences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-3 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="trust">Trust Score</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="blockchain" className="rounded" />
                    <label htmlFor="blockchain" className="text-sm">Blockchain Verified</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="instant" className="rounded" />
                    <label htmlFor="instant" className="text-sm">Instant Booking</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="cultural" className="rounded" />
                    <label htmlFor="cultural" className="text-sm">Cultural Experience</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="vr" className="rounded" />
                    <label htmlFor="vr" className="text-sm">VR Preview Available</label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {filteredListings.length} listings found
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Map View
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Price Trends
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              
              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Transport Tab */}
        <TabsContent value="transport" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                {t.transport}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {transportOptions.map((transport) => (
                  <TransportCard key={transport.id} transport={transport} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {marketplaceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Featured Local Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item} className="cursor-pointer hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
                      <Palette className="w-8 h-8 text-orange-600" />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-1">Tribal Handicraft</h4>
                      <p className="text-xs text-muted-foreground mb-2">Authentic handmade item</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-600">₹500</span>
                        <Button size="sm" variant="outline">
                          <ShoppingBag className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t.bookings}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {smartContracts.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground">
                    Start exploring and book your first experience!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {smartContracts.map((contract) => (
                    <Card key={contract.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Smart Contract #{contract.id.slice(-6)}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{contract.type} booking</p>
                        </div>
                        <Badge variant={
                          contract.status === 'active' ? 'default' : 
                          contract.status === 'completed' ? 'secondary' : 
                          contract.status === 'disputed' ? 'destructive' : 'outline'
                        }>
                          {contract.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Total Amount: </span>
                          ₹{contract.amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Escrow: </span>
                          ₹{contract.escrowAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Contract
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Blockchain Explorer
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t.contracts}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Contract Features</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your blockchain-based tourism contracts with complete transparency
                </p>
                <Button onClick={() => setShowBlockchainModal(true)}>
                  <Shield className="w-4 h-4 mr-2" />
                  Open Blockchain Hub
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Success Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              Booking Confirmed!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm">
                Your booking has been confirmed and secured on the blockchain. 
                You'll receive a confirmation with smart contract details shortly.
              </p>
            </div>
            
            {bookingState.smartContract && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contract ID:</span>
                  <span className="font-mono">{bookingState.smartContract.id.slice(-8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span>₹{bookingState.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Escrow Protection:</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">
                <QrCode className="w-4 h-4 mr-2" />
                View QR Code
              </Button>
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};