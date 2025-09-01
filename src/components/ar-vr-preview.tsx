"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Eye, 
  Camera, 
  Headphones, 
  Globe, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Share2, 
  BookOpen, 
  Users, 
  Leaf, 
  Mountain, 
  TreePine, 
  Waves, 
  Heart, 
  Calendar, 
  Clock, 
  Info, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Languages, 
  Accessibility, 
  Star, 
  Award,
  Loader2,
  AlertTriangle,
  CheckCircle,
  X,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Destination {
  id: string;
  name: string;
  description: string;
  category: 'waterfall' | 'hill-station' | 'national-park' | 'religious' | 'tribal-village';
  culturalSites: number;
  tribalSignificance: string;
  vrExperiences: VRExperience[];
  arFeatures: ARFeature[];
  location: { lat: number; lng: number };
  seasonalViews: SeasonalView[];
  accessibility: AccessibilityFeature[];
  respectProtocols: string[];
  image: string;
  audioGuides: AudioGuide[];
  virtualTourProgress?: number;
}

interface VRExperience {
  id: string;
  title: string;
  duration: number;
  type: '360-tour' | 'immersive' | 'wildlife' | 'cultural' | 'historical';
  thumbnail: string;
  description: string;
  languages: string[];
  difficulty: 'easy' | 'moderate' | 'advanced';
  features: string[];
}

interface ARFeature {
  id: string;
  type: 'cultural-overlay' | 'historical-context' | 'wildlife-identification' | 'tribal-art';
  title: string;
  description: string;
  icon: string;
}

interface SeasonalView {
  season: 'spring' | 'summer' | 'monsoon' | 'winter';
  image: string;
  description: string;
  bestTime: string;
}

interface AccessibilityFeature {
  type: 'visual' | 'auditory' | 'mobility' | 'cognitive';
  available: boolean;
  description: string;
}

interface AudioGuide {
  id: string;
  language: string;
  narrator: string;
  duration: number;
  preview: string;
}

const destinations: Destination[] = [
  {
    id: 'netarhat',
    name: 'Netarhat',
    description: 'The Queen of Chotanagpur, known for stunning sunrises and sunsets',
    category: 'hill-station',
    culturalSites: 8,
    tribalSignificance: 'Sacred sunrise point for Munda and Oraon tribes',
    location: { lat: 23.4667, lng: 84.2500 },
    image: '/api/placeholder/400/300',
    seasonalViews: [
      { season: 'winter', image: '/api/placeholder/300/200', description: 'Misty mornings and clear skies', bestTime: 'December - February' },
      { season: 'summer', image: '/api/placeholder/300/200', description: 'Golden sunsets and pleasant evenings', bestTime: 'March - May' },
      { season: 'monsoon', image: '/api/placeholder/300/200', description: 'Lush green landscapes and waterfalls', bestTime: 'June - September' }
    ],
    vrExperiences: [
      {
        id: 'netarhat-sunrise',
        title: 'Netarhat Sunrise Experience',
        duration: 45,
        type: '360-tour',
        thumbnail: '/api/placeholder/200/150',
        description: 'Experience the magical sunrise from the highest point in Jharkhand',
        languages: ['English', 'Hindi', 'Kurukh'],
        difficulty: 'easy',
        features: ['360° panoramic views', 'Time-lapse sunrise', 'Cultural narration', 'Wildlife sounds']
      },
      {
        id: 'netarhat-sunset',
        title: 'Sunset Point VR Tour',
        duration: 30,
        type: 'immersive',
        thumbnail: '/api/placeholder/200/150',
        description: 'Immersive sunset experience with tribal music',
        languages: ['English', 'Hindi', 'Mundari'],
        difficulty: 'easy',
        features: ['Golden hour lighting', 'Traditional music', 'Cultural stories', 'Interactive hotspots']
      }
    ],
    arFeatures: [
      {
        id: 'tribal-heritage',
        type: 'cultural-overlay',
        title: 'Tribal Heritage Markers',
        description: 'Discover ancient tribal settlements and their significance',
        icon: '🏘️'
      },
      {
        id: 'flora-identification',
        type: 'wildlife-identification',
        title: 'Hill Station Flora',
        description: 'Identify native plants and their medicinal uses',
        icon: '🌿'
      }
    ],
    accessibility: [
      { type: 'visual', available: true, description: 'Audio descriptions and high contrast mode' },
      { type: 'auditory', available: true, description: 'Visual captions and sign language interpretation' },
      { type: 'mobility', available: false, description: 'Limited wheelchair accessibility due to terrain' },
      { type: 'cognitive', available: true, description: 'Simplified navigation and clear instructions' }
    ],
    respectProtocols: [
      'Remove shoes before entering sacred sunrise viewing area',
      'Maintain silence during tribal prayer times (5:30-6:00 AM)',
      'Do not disturb meditation spots',
      'Photography restricted in certain cultural areas'
    ],
    audioGuides: [
      { id: 'netarhat-en', language: 'English', narrator: 'Sarah Johnson', duration: 25, preview: 'Welcome to Netarhat, the Queen of Chotanagpur...' },
      { id: 'netarhat-hi', language: 'Hindi', narrator: 'Rajesh Kumar', duration: 28, preview: 'नेतरहाट में आपका स्वागत है...' },
      { id: 'netarhat-kr', language: 'Kurukh', narrator: 'Elder Soma Oraon', duration: 32, preview: 'Netarhat khush aayenge...' }
    ]
  },
  {
    id: 'patratu-valley',
    name: 'Patratu Valley',
    description: 'Picturesque valley with emerald waters and rolling hills',
    category: 'hill-station',
    culturalSites: 5,
    tribalSignificance: 'Traditional fishing grounds of Ho and Santhal communities',
    location: { lat: 23.6100, lng: 85.1900 },
    image: '/api/placeholder/400/300',
    seasonalViews: [
      { season: 'winter', image: '/api/placeholder/300/200', description: 'Crystal clear waters reflecting blue skies', bestTime: 'November - February' },
      { season: 'monsoon', image: '/api/placeholder/300/200', description: 'Full reservoir with cascading waterfalls', bestTime: 'July - September' }
    ],
    vrExperiences: [
      {
        id: 'patratu-aerial',
        title: 'Aerial Valley Tour',
        duration: 35,
        type: '360-tour',
        thumbnail: '/api/placeholder/200/150',
        description: 'Soar above the valley and witness its pristine beauty',
        languages: ['English', 'Hindi', 'Santhali'],
        difficulty: 'moderate',
        features: ['Drone perspectives', 'Water reflections', 'Hill formations', 'Seasonal changes']
      }
    ],
    arFeatures: [
      {
        id: 'fishing-heritage',
        type: 'cultural-overlay',
        title: 'Traditional Fishing Methods',
        description: 'Learn about ancestral fishing techniques of tribal communities',
        icon: '🎣'
      }
    ],
    accessibility: [
      { type: 'visual', available: true, description: 'High contrast and zoom features available' },
      { type: 'auditory', available: true, description: 'Comprehensive audio descriptions' },
      { type: 'mobility', available: true, description: 'Wheelchair accessible viewpoints' },
      { type: 'cognitive', available: true, description: 'Simple navigation with clear markers' }
    ],
    respectProtocols: [
      'Respect local fishing seasons and tribal fishing rights',
      'Do not disturb water bodies during community ceremonies',
      'Ask permission before photographing tribal fishermen',
      'Follow designated paths to protect ecosystem'
    ],
    audioGuides: [
      { id: 'patratu-en', language: 'English', narrator: 'Michael Davis', duration: 22, preview: 'Patratu Valley, a hidden gem in Jharkhand...' },
      { id: 'patratu-hi', language: 'Hindi', narrator: 'Priya Sharma', duration: 24, preview: 'पत्रातू घाटी का यह अद्भुत नजारा...' },
      { id: 'patratu-st', language: 'Santhali', narrator: 'Elder Budhan Soren', duration: 28, preview: 'Patratu re do katha...' }
    ]
  },
  {
    id: 'betla-national-park',
    name: 'Betla National Park',
    description: 'Home to diverse wildlife including tigers, elephants, and rare birds',
    category: 'national-park',
    culturalSites: 12,
    tribalSignificance: 'Sacred forest for Birhor and Kharia tribes, traditional hunting grounds',
    location: { lat: 23.8730, lng: 84.1900 },
    image: '/api/placeholder/400/300',
    seasonalViews: [
      { season: 'winter', image: '/api/placeholder/300/200', description: 'Best wildlife viewing season with clear visibility', bestTime: 'November - March' },
      { season: 'summer', image: '/api/placeholder/300/200', description: 'Animals gather at water sources', bestTime: 'April - June' },
      { season: 'monsoon', image: '/api/placeholder/300/200', description: 'Lush green forest with abundant flora', bestTime: 'July - October' }
    ],
    vrExperiences: [
      {
        id: 'betla-safari',
        title: 'Virtual Wildlife Safari',
        duration: 60,
        type: 'wildlife',
        thumbnail: '/api/placeholder/200/150',
        description: 'Experience a thrilling safari without disturbing wildlife',
        languages: ['English', 'Hindi', 'Birhori'],
        difficulty: 'moderate',
        features: ['Real tiger encounters', 'Elephant herds', 'Bird watching', 'Night vision mode']
      },
      {
        id: 'tribal-forest-culture',
        title: 'Tribal Forest Wisdom',
        duration: 45,
        type: 'cultural',
        thumbnail: '/api/placeholder/200/150',
        description: 'Learn traditional forest conservation practices',
        languages: ['English', 'Hindi', 'Kharia'],
        difficulty: 'easy',
        features: ['Medicinal plants', 'Hunting techniques', 'Forest spirits', 'Conservation stories']
      }
    ],
    arFeatures: [
      {
        id: 'wildlife-tracker',
        type: 'wildlife-identification',
        title: 'Wildlife Species Identifier',
        description: 'Identify animals, birds, and plants with detailed information',
        icon: '🐅'
      },
      {
        id: 'tribal-forest-lore',
        type: 'cultural-overlay',
        title: 'Forest Legends & Lore',
        description: 'Discover tribal stories and beliefs about forest spirits',
        icon: '🌳'
      }
    ],
    accessibility: [
      { type: 'visual', available: true, description: 'Audio descriptions for wildlife and forest sounds' },
      { type: 'auditory', available: true, description: 'Visual alerts for animal movements and sounds' },
      { type: 'mobility', available: true, description: 'Virtual safari accessible to all mobility levels' },
      { type: 'cognitive', available: true, description: 'Educational content with varying complexity levels' }
    ],
    respectProtocols: [
      'Follow tribal guidelines for forest entry',
      'Respect sacred groves and do not enter without permission',
      'No loud sounds that may disturb wildlife',
      'Do not collect plants or disturb natural habitats',
      'Photography restrictions in certain tribal sacred areas'
    ],
    audioGuides: [
      { id: 'betla-en', language: 'English', narrator: 'Dr. Jane Wilson', duration: 40, preview: 'Welcome to Betla National Park, home to incredible biodiversity...' },
      { id: 'betla-hi', language: 'Hindi', narrator: 'Vikram Singh', duration: 38, preview: 'बेतला राष्ट्रीय उद्यान में आपका स्वागत है...' },
      { id: 'betla-bh', language: 'Birhori', narrator: 'Shaman Mangal Birhor', duration: 45, preview: 'Betla jungle re hamara purkha...' }
    ]
  }
];

export const ARVRPreviewComponent = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[0]);
  const [activeTab, setActiveTab] = useState('explore');
  const [vrMode, setVrMode] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [selectedVRExperience, setSelectedVRExperience] = useState<VRExperience | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<string>('winter');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [selectedAudioGuide, setSelectedAudioGuide] = useState<AudioGuide | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const vrViewerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVRExperienceStart = useCallback(async (experience: VRExperience) => {
    setIsLoading(true);
    setSelectedVRExperience(experience);
    
    try {
      // Simulate loading VR content
      await new Promise(resolve => setTimeout(resolve, 2000));
      setVrMode(true);
      setIsPlaying(true);
      setTourProgress(0);
      toast.success(`Starting ${experience.title}`);
    } catch (error) {
      toast.error('Failed to load VR experience');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleARModeToggle = useCallback(async () => {
    if (!arMode) {
      try {
        setIsLoading(true);
        
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission('granted');
        
        // Stop the stream immediately as we just needed permission
        stream.getTracks().forEach(track => track.stop());
        
        setArMode(true);
        toast.success('AR mode activated');
      } catch (error) {
        setCameraPermission('denied');
        toast.error('Camera access required for AR features');
      } finally {
        setIsLoading(false);
      }
    } else {
      setArMode(false);
      toast.success('AR mode deactivated');
    }
  }, [arMode]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback((value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  const handleShare = useCallback(async (platform: string) => {
    try {
      const shareData = {
        title: `Experience ${selectedDestination.name} in VR`,
        text: `Explore the beauty of ${selectedDestination.name} through immersive VR tours`,
        url: window.location.href
      };

      if (navigator.share && platform === 'native') {
        await navigator.share(shareData);
      } else {
        // Fallback to copying link
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      toast.error('Failed to share experience');
    }
  }, [selectedDestination]);

  const handleBookingIntegration = useCallback(() => {
    setShowBookingDialog(true);
    toast.success('Redirecting to booking system...');
  }, []);

  // Simulate tour progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && vrMode) {
      interval = setInterval(() => {
        setTourProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            toast.success('Virtual tour completed!');
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, vrMode]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                AR/VR Tourism Experience
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={arMode ? "default" : "outline"}
                  size="sm"
                  onClick={handleARModeToggle}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Camera className="w-4 h-4 mr-2" />
                  )}
                  {arMode ? 'Exit AR' : 'Enable AR'}
                </Button>
                <Dialog open={showAccessibilityPanel} onOpenChange={setShowAccessibilityPanel}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Accessibility className="w-4 h-4 mr-2" />
                      Accessibility
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Accessibility Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {selectedDestination.accessibility.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium capitalize">{feature.type} Support</p>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                          <div className="flex items-center">
                            {feature.available ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {destinations.map((destination) => (
                <Card
                  key={destination.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedDestination.id === destination.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedDestination(destination)}
                >
                  <CardContent className="p-4">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold mb-1">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {destination.category.replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{destination.culturalSites} sites</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="explore">
            <MapPin className="w-4 h-4 mr-2" />
            Explore
          </TabsTrigger>
          <TabsTrigger value="vr-tours">
            <Eye className="w-4 h-4 mr-2" />
            VR Tours
          </TabsTrigger>
          <TabsTrigger value="ar-features">
            <Camera className="w-4 h-4 mr-2" />
            AR Features
          </TabsTrigger>
          <TabsTrigger value="cultural">
            <Users className="w-4 h-4 mr-2" />
            Culture
          </TabsTrigger>
          <TabsTrigger value="seasonal">
            <Calendar className="w-4 h-4 mr-2" />
            Seasons
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Headphones className="w-4 h-4 mr-2" />
            Audio Guide
          </TabsTrigger>
        </TabsList>

        {/* Explore Tab */}
        <TabsContent value="explore" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {selectedDestination.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground mb-4">{selectedDestination.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{selectedDestination.tribalSignificance}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{selectedDestination.culturalSites} Cultural Sites</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button onClick={handleBookingIntegration} className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Visit
                  </Button>
                  <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share Experience</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => handleShare('native')}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Link
                        </Button>
                        <Button variant="outline" onClick={() => handleShare('download')}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Respect Protocols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDestination.respectProtocols.map((protocol, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{protocol}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* VR Tours Tab */}
        <TabsContent value="vr-tours" className="space-y-6">
          {vrMode && selectedVRExperience ? (
            <Card className="min-h-[500px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    {selectedVRExperience.title}
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setVrMode(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Exit VR
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={vrViewerRef}
                  className="w-full h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 rounded-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 border-4 border-white/30 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                        <Eye className="w-16 h-16" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">VR Experience Active</h3>
                      <p className="text-white/80">Use your headset or drag to look around</p>
                    </div>
                  </div>
                  
                  {/* VR Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handlePlayPause}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleMuteToggle}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-white" />
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedVRExperience?.languages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>Tour Progress</span>
                          <span>{tourProgress}%</span>
                        </div>
                        <Progress value={tourProgress} className="bg-white/30" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedVRExperience.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedDestination.vrExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={experience.thumbnail}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">
                        {experience.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                        <Clock className="w-3 h-3 mr-1" />
                        {experience.duration}min
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{experience.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm capitalize">{experience.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">{experience.languages.length} languages</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleVRExperienceStart(experience)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Start VR Experience
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* AR Features Tab */}
        <TabsContent value="ar-features" className="space-y-6">
          {arMode ? (
            <Card className="min-h-[500px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    AR Camera View
                  </CardTitle>
                  <Button variant="outline" onClick={handleARModeToggle}>
                    <X className="w-4 h-4 mr-2" />
                    Exit AR
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-xl font-semibold mb-2">AR Camera Active</h3>
                      <p className="text-white/80">Point your camera at cultural sites for overlays</p>
                    </div>
                  </div>
                  
                  {/* AR Overlays */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {selectedDestination.arFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-black/60 text-white px-3 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2"
                      >
                        <span>{feature.icon}</span>
                        <span className="text-sm">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedDestination.arFeatures.map((feature) => (
                <Card key={feature.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      <Badge variant="outline" className="capitalize">
                        {feature.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="md:col-span-2">
                <CardContent className="p-6 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Enable AR to Experience Features</h3>
                  <p className="text-muted-foreground mb-4">
                    Grant camera permission to access augmented reality overlays and cultural information
                  </p>
                  <Button onClick={handleARModeToggle} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Camera className="w-4 h-4 mr-2" />
                    )}
                    {cameraPermission === 'denied' ? 'Retry Camera Access' : 'Enable AR Mode'}
                  </Button>
                  {cameraPermission === 'denied' && (
                    <p className="text-sm text-red-500 mt-2">
                      Camera access was denied. Please enable it in your browser settings.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Cultural Tab */}
        <TabsContent value="cultural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Tribal Heritage & Culture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Cultural Significance</h3>
                  <p className="text-muted-foreground mb-4">{selectedDestination.tribalSignificance}</p>
                  
                  <h3 className="font-semibold mb-3">Respect Guidelines</h3>
                  <div className="space-y-2">
                    {selectedDestination.respectProtocols.slice(0, 3).map((protocol, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Virtual Tribal Village</h3>
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                    <p className="text-sm text-orange-800 mb-4">
                      Experience traditional tribal life through immersive VR tours
                    </p>
                    <Button variant="outline" className="text-orange-600 border-orange-300">
                      <Play className="w-4 h-4 mr-2" />
                      Start Village Tour
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seasonal Tab */}
        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Seasonal Experiences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDestination.seasonalViews.map((view) => (
                      <SelectItem key={view.season} value={view.season}>
                        {view.season.charAt(0).toUpperCase() + view.season.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedDestination.seasonalViews.map((view) => (
                  <Card
                    key={view.season}
                    className={`cursor-pointer transition-all ${
                      selectedSeason === view.season ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedSeason(view.season)}
                  >
                    <div className="relative">
                      <img
                        src={view.image}
                        alt={`${view.season} view`}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 capitalize"
                      >
                        {view.season}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">{view.description}</p>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Calendar className="w-3 h-3" />
                        {view.bestTime}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audio Guide Tab */}
        <TabsContent value="audio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Audio Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedDestination.audioGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className={`cursor-pointer transition-all ${
                      selectedAudioGuide?.id === guide.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedAudioGuide(guide)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Languages className="w-8 h-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-1">{guide.language}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Narrated by {guide.narrator}</p>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                          <Clock className="w-3 h-3" />
                          {guide.duration} minutes
                        </div>
                        <p className="text-xs text-muted-foreground italic mb-4">
                          "{guide.preview}"
                        </p>
                        <Button
                          size="sm"
                          variant={selectedAudioGuide?.id === guide.id ? "default" : "outline"}
                          className="w-full"
                        >
                          {selectedAudioGuide?.id === guide.id ? (
                            <>
                              <Pause className="w-3 h-3 mr-2" />
                              Playing
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-2" />
                              Play Preview
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedAudioGuide && (
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{selectedAudioGuide.language} Audio Guide</h3>
                        <p className="text-sm text-muted-foreground">by {selectedAudioGuide.narrator}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={handleMuteToggle}>
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Volume</span>
                        <div className="flex-1 max-w-32">
                          <Slider
                            value={[volume]}
                            onValueChange={handleVolumeChange}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{volume}%</span>
                      </div>
                      
                      <Progress value={tourProgress} className="w-full" />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>0:00</span>
                        <span>{selectedAudioGuide.duration}:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Your Visit to {selectedDestination.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ready to experience {selectedDestination.name} in person? Connect with our booking system to plan your visit.
            </p>
            <div className="flex gap-4">
              <Button className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Check Availability
              </Button>
              <Button variant="outline" className="flex-1">
                <MapPin className="w-4 h-4 mr-2" />
                View Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden audio element for audio guide playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};