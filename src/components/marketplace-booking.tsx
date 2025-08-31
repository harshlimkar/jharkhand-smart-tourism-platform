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
  Workflow
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MarketplaceBookingProps {
  language: 'en' | 'hi' | 'tribal';
}

interface Listing {
  id: string;
  type: 'accommodation' | 'transport' | 'activity' | 'marketplace' | 'experience';
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  location: string;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    responseTime: string;
  };
  amenities: string[];
  availability: Date[];
  tags: string[];
  hasAR?: boolean;
  hasVR?: boolean;
  instantBook?: boolean;
  featured?: boolean;
}

const translations = {
  en: {
    searchPlaceholder: "Search accommodations, activities...",
    sortBy: "Sort by",
    filterBy: "Filter",
    priceRange: "Price Range",
    accommodations: "Accommodations",
    transport: "Transport",
    activities: "Activities",
    marketplace: "Local Marketplace",
    experiences: "Cultural Experiences",
    viewDetails: "View Details",
    bookNow: "Book Now",
    addToWishlist: "Add to Wishlist",
    share: "Share",
    arPreview: "AR Preview",
    vrExperience: "VR Experience",
    verified: "Verified Host",
    instantBook: "Instant Book",
    featured: "Featured",
    reviews: "reviews",
    perNight: "per night",
    perPerson: "per person",
    from: "from",
    availability: "Check Availability",
    bookingDetails: "Booking Details",
    selectDates: "Select dates",
    guests: "Guests",
    totalPrice: "Total Price",
    viewOnMap: "View on Map",
    contactHost: "Contact Host",
    reportListing: "Report Listing",
    noResults: "No results found",
    loading: "Loading...",
    transportComparison: "Transport Options",
    homestays: "Homestays",
    ecoTourism: "Eco-Tourism",
    tribalCrafts: "Tribal Handicrafts"
  },
  hi: {
    searchPlaceholder: "आवास, गतिविधियां खोजें...",
    sortBy: "इस आधार पर क्रमबद्ध करें",
    filterBy: "फ़िल्टर",
    priceRange: "मूल्य सीमा",
    accommodations: "आवास",
    transport: "परिवहन",
    activities: "गतिविधियां",
    marketplace: "स्थानीय बाज़ार",
    experiences: "सांस्कृतिक अनुभव",
    viewDetails: "विवरण देखें",
    bookNow: "अभी बुक करें",
    addToWishlist: "इच्छा सूची में जोड़ें",
    share: "साझा करें",
    arPreview: "AR पूर्वावलोकन",
    vrExperience: "VR अनुभव",
    verified: "सत्यापित होस्ट",
    instantBook: "तत्काल बुकिंग",
    featured: "विशेष रुप से प्रदर्शित",
    reviews: "समीक्षाएं",
    perNight: "प्रति रात",
    perPerson: "प्रति व्यक्ति",
    from: "से",
    availability: "उपलब्धता जांचें",
    bookingDetails: "बुकिंग विवरण",
    selectDates: "दिनांक चुनें",
    guests: "मेहमान",
    totalPrice: "कुल मूल्य",
    viewOnMap: "मानचित्र पर देखें",
    contactHost: "होस्ट से संपर्क करें",
    reportListing: "लिस्टिंग की रिपोर्ट करें",
    noResults: "कोई परिणाम नहीं मिला",
    loading: "लोड हो रहा है...",
    transportComparison: "परिवहन विकल्प",
    homestays: "होमस्टे",
    ecoTourism: "पर्यावरण पर्यटन",
    tribalCrafts: "आदिवासी शिल्प"
  },
  tribal: {
    searchPlaceholder: "ঠাঁই, কাম বিছাৰক...",
    sortBy: "সজাওক",
    filterBy: "ছান্নী",
    priceRange: "দামৰ সীমা",
    accommodations: "বাসস্থান",
    transport: "যাতায়াত",
    activities: "কাৰ্যকলাপ",
    marketplace: "স্থানীয় বজাৰ",
    experiences: "সাংস্কৃতিক অভিজ্ঞতা",
    viewDetails: "বিতং চাওক",
    bookNow: "এতিয়াই বুক কৰক",
    addToWishlist: "ইচ্ছা তালিকাত যোগ দিয়ক",
    share: "শ্বেয়াৰ কৰক",
    arPreview: "AR পূৰ্বদৰ্শন",
    vrExperience: "VR অভিজ্ঞতা",
    verified: "সত্যাপিত হোষ্ট",
    instantBook: "তাৎক্ষণিক বুকিং",
    featured: "বিশেষভাৱে প্ৰদৰ্শিত",
    reviews: "পৰ্যালোচনা",
    perNight: "প্ৰতি ৰাতি",
    perPerson: "প্ৰতি ব্যক্তি",
    from: "পৰা",
    availability: "উপলব্ধতা পৰীক্ষা কৰক",
    bookingDetails: "বুকিংৰ বিতং",
    selectDates: "তাৰিখ নিৰ্বাচন কৰক",
    guests: "অতিথি",
    totalPrice: "মুঠ দাম",
    viewOnMap: "মানচিত্ৰত চাওক",
    contactHost: "হোষ্টৰ সৈতে যোগাযোগ কৰক",
    reportListing: "তালিকাৰ প্ৰতিবেদন দিয়ক",
    noResults: "কোনো ফলাফল পোৱা নাযায়",
    loading: "লোড হৈছে...",
    transportComparison: "যাতায়াতৰ বিকল্প",
    homestays: "হোমষ্টে",
    ecoTourism: "পৰিৱেশ পৰ্যটন",
    tribalCrafts: "আদিবাসী শিল্প"
  }
};

const mockListings: Listing[] = [
  {
    id: '1',
    type: 'accommodation',
    title: 'Traditional Bamboo Homestay',
    description: 'Experience authentic tribal living in a sustainably built bamboo house with modern amenities.',
    price: 2500,
    currency: '₹',
    rating: 4.8,
    reviewCount: 127,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    location: 'Shillong, Meghalaya',
    host: {
      name: 'Rishan Khongwir',
      avatar: '/api/placeholder/40/40',
      verified: true,
      responseTime: '< 1 hour'
    },
    amenities: ['WiFi', 'Traditional Meals', 'Nature Walk', 'Cultural Activities'],
    availability: [new Date()],
    tags: ['Eco-friendly', 'Cultural Immersion', 'Family-friendly'],
    hasAR: true,
    instantBook: true,
    featured: true
  },
  {
    id: '2',
    type: 'transport',
    title: 'Helicopter Tour - Kaziranga',
    description: 'Aerial view of the famous national park with wildlife spotting opportunities.',
    price: 8500,
    currency: '₹',
    rating: 4.9,
    reviewCount: 89,
    images: ['/api/placeholder/400/300'],
    location: 'Kaziranga National Park',
    host: {
      name: 'Northeast Helicopters',
      avatar: '/api/placeholder/40/40',
      verified: true,
      responseTime: '< 30 mins'
    },
    amenities: ['Safety Equipment', 'Professional Pilot', 'Photo Opportunities'],
    availability: [new Date()],
    tags: ['Adventure', 'Wildlife', 'Photography'],
    hasVR: true,
    featured: true
  },
  {
    id: '3',
    type: 'activity',
    title: 'Traditional Weaving Workshop',
    description: 'Learn the ancient art of Khasi weaving from master craftswomen.',
    price: 1200,
    currency: '₹',
    rating: 4.7,
    reviewCount: 156,
    images: ['/api/placeholder/400/300'],
    location: 'Cherrapunjee, Meghalaya',
    host: {
      name: 'Women\'s Craft Collective',
      avatar: '/api/placeholder/40/40',
      verified: true,
      responseTime: '< 2 hours'
    },
    amenities: ['Materials Included', 'Take Home Creation', 'Tea & Snacks'],
    availability: [new Date()],
    tags: ['Cultural', 'Hands-on', 'Women Empowerment'],
    hasAR: true
  },
  {
    id: '4',
    type: 'marketplace',
    title: 'Handwoven Tribal Textiles',
    description: 'Authentic handwoven fabrics and traditional clothing from local artisans.',
    price: 3500,
    currency: '₹',
    rating: 4.6,
    reviewCount: 234,
    images: ['/api/placeholder/400/300'],
    location: 'Imphal, Manipur',
    host: {
      name: 'Manipuri Craft House',
      avatar: '/api/placeholder/40/40',
      verified: true,
      responseTime: '< 1 hour'
    },
    amenities: ['Authentic Materials', 'Certificate of Origin', 'Custom Sizing'],
    availability: [new Date()],
    tags: ['Handmade', 'Traditional', 'Sustainable']
  }
];

const transportOptions = [
  {
    type: 'train',
    icon: Train,
    name: 'Rajdhani Express',
    route: 'Delhi → Guwahati',
    duration: '22h 30m',
    price: 2450,
    class: '3AC',
    rating: 4.2
  },
  {
    type: 'flight',
    icon: Plane,
    name: 'IndiGo 6E-183',
    route: 'Delhi → Guwahati',
    duration: '2h 45m',
    price: 8500,
    class: 'Economy',
    rating: 4.4
  },
  {
    type: 'bus',
    icon: Bus,
    name: 'Volvo AC Sleeper',
    route: 'Kolkata → Shillong',
    duration: '12h 15m',
    price: 1200,
    class: 'AC Sleeper',
    rating: 4.0
  }
];

export const MarketplaceBooking: React.FC<MarketplaceBookingProps> = ({ language }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    transport: false,
    marketplace: false
  });

  const t = translations[language];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredListings = listings.filter(listing => {
    if (selectedCategory !== 'all' && listing.type !== selectedCategory) return false;
    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;
    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default: return 0;
    }
  });

  const toggleWishlist = (listingId: string) => {
    setWishlist(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'accommodation': return Home;
      case 'transport': return Car;
      case 'activity': return Mountain;
      case 'marketplace': return ShoppingBag;
      case 'experience': return Camera;
      default: return Building;
    }
  };

  const renderListingCard = (listing: Listing) => (
    <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {listing.featured && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                <Award className="w-3 h-3 mr-1" />
                {t.featured}
              </Badge>
            )}
            {listing.instantBook && (
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                <Clock className="w-3 h-3 mr-1" />
                {t.instantBook}
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 h-8 w-8 p-0"
              onClick={() => toggleWishlist(listing.id)}
            >
              <Heart 
                className={`w-4 h-4 ${wishlist.includes(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 h-8 w-8 p-0"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-2">
            {listing.hasAR && (
              <Button size="sm" variant="secondary" className="h-7 px-2 text-xs bg-blue-500 text-white border-0 hover:bg-blue-600">
                <Eye className="w-3 h-3 mr-1" />
                AR
              </Button>
            )}
            {listing.hasVR && (
              <Button size="sm" variant="secondary" className="h-7 px-2 text-xs bg-purple-500 text-white border-0 hover:bg-purple-600">
                <Camera className="w-3 h-3 mr-1" />
                VR
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              {listing.location}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-sm text-muted-foreground">({listing.reviewCount})</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {listing.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={listing.host.avatar} alt={listing.host.name} />
            <AvatarFallback>{listing.host.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{listing.host.name}</span>
          {listing.host.verified && (
            <Badge variant="secondary" className="h-5 px-2 text-xs bg-green-100 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              {t.verified}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {listing.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{listing.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            {listing.currency}{listing.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {listing.type === 'accommodation' ? t.perNight : t.perPerson}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setSelectedListing(listing)}
        >
          {t.viewDetails}
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
          onClick={() => {
            setSelectedListing(listing);
            setShowBookingDrawer(true);
          }}
        >
          {t.bookNow}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderTransportComparison = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Car className="w-5 h-5" />
            {t.transportComparison}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('transport')}
          >
            {expandedSections.transport ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      
      {expandedSections.transport && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {transportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.route}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{option.duration}</span>
                        <span>{option.class}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {option.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">₹{option.price.toLocaleString()}</div>
                    <Button size="sm" variant="outline" className="mt-1">
                      {t.bookNow}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );

  const renderMarketplaceSection = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t.marketplace}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('marketplace')}
          >
            {expandedSections.marketplace ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      
      {expandedSections.marketplace && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: t.tribalCrafts, icon: Palette, count: 156 },
              { name: t.homestays, icon: Home, count: 89 },
              { name: t.ecoTourism, icon: TreePine, count: 234 },
              { name: 'Workshops', icon: Workflow, count: 67 }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 hover:border-orange-200"
                >
                  <IconComponent className="w-6 h-6 text-orange-500" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count} items</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );

  if (loading) {
    return (
      <div className="h-full p-6">
        <div className="space-y-6">
          {/* Search skeleton */}
          <div className="bg-muted/30 h-10 rounded-lg animate-pulse" />
          
          {/* Filter skeleton */}
          <div className="flex gap-4">
            <div className="bg-muted/30 h-8 w-24 rounded-md animate-pulse" />
            <div className="bg-muted/30 h-8 w-24 rounded-md animate-pulse" />
            <div className="bg-muted/30 h-8 w-24 rounded-md animate-pulse" />
          </div>

          {/* Cards skeleton */}
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="p-0">
                <div className="bg-muted/30 h-48 rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="bg-muted/30 h-6 w-3/4 rounded" />
                <div className="bg-muted/30 h-4 w-1/2 rounded" />
                <div className="bg-muted/30 h-4 w-full rounded" />
                <div className="bg-muted/30 h-4 w-2/3 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filters */}
      <div className="p-6 border-b bg-card sticky top-0 z-10">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-auto min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="accommodation">{t.accommodations}</SelectItem>
                <SelectItem value="transport">{t.transport}</SelectItem>
                <SelectItem value="activity">{t.activities}</SelectItem>
                <SelectItem value="marketplace">{t.marketplace}</SelectItem>
                <SelectItem value="experience">{t.experiences}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-auto min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{t.featured}</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  {t.filterBy}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Options</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">{t.priceRange}</label>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        type="number" 
                        placeholder="Min" 
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      />
                      <Input 
                        type="number" 
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Transport Comparison */}
          {renderTransportComparison()}
          
          {/* Marketplace Categories */}
          {renderMarketplaceSection()}
          
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {sortedListings.length} results found
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                {t.viewOnMap}
              </Button>
            </div>
          </div>

          {/* Listings */}
          {sortedListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t.noResults}</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedListings.map(renderListingCard)}
            </div>
          )}
        </div>
      </div>

      {/* Booking Drawer */}
      <Sheet open={showBookingDrawer} onOpenChange={setShowBookingDrawer}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t.bookingDetails}</SheetTitle>
          </SheetHeader>
          
          {selectedListing && (
            <div className="space-y-6 mt-6">
              <div className="flex gap-4">
                <img 
                  src={selectedListing.images[0]} 
                  alt={selectedListing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedListing.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedListing.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedListing.rating} ({selectedListing.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t.selectDates}</label>
                  <CalendarComponent mode="range" className="mt-2" />
                </div>

                <div>
                  <label className="text-sm font-medium">{t.guests}</label>
                  <Select defaultValue="2">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{selectedListing.currency}{selectedListing.price} x 2 nights</span>
                  <span>{selectedListing.currency}{selectedListing.price * 2}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>{selectedListing.currency}299</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t.totalPrice}</span>
                  <span className="text-green-600">{selectedListing.currency}{selectedListing.price * 2 + 299}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  Reserve & Pay
                </Button>
                <Button variant="outline" className="w-full">
                  {t.contactHost}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Listing Detail Dialog */}
      <Dialog open={!!selectedListing && !showBookingDrawer} onOpenChange={(open) => !open && setSelectedListing(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedListing.title}</DialogTitle>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedListing.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {selectedListing.rating} ({selectedListing.reviewCount} reviews)
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {selectedListing.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${selectedListing.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedListing.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedListing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Host Information</h3>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedListing.host.avatar} alt={selectedListing.host.name} />
                      <AvatarFallback>{selectedListing.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{selectedListing.host.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Response time: {selectedListing.host.responseTime}
                      </div>
                    </div>
                    {selectedListing.host.verified && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    onClick={() => setShowBookingDrawer(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {t.bookNow}
                  </Button>
                  <Button variant="outline" onClick={() => toggleWishlist(selectedListing.id)}>
                    <Heart className={`w-4 h-4 mr-2 ${wishlist.includes(selectedListing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {wishlist.includes(selectedListing.id) ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};