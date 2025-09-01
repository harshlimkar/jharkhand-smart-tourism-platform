"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  QrCode,
  Wallet,
  FileText,
  Camera,
  Download,
  ExternalLink,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  CreditCard,
  Lock,
  Verified,
  Award,
  Eye,
  History,
  RefreshCw,
  Upload,
  ChevronRight,
  Building,
  Car,
  Home,
  Briefcase
} from 'lucide-react';

// Types and Interfaces
interface VerificationStatus {
  id: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  type: 'guide' | 'artisan' | 'homestay' | 'transport' | 'equipment';
  name: string;
  dateSubmitted: string;
  dateVerified?: string;
  trustScore: number;
  certificateHash?: string;
  qrCode?: string;
}

interface Transaction {
  id: string;
  type: 'booking' | 'payment' | 'escrow' | 'dispute';
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  blockHash?: string;
  timestamp: string;
  from: string;
  to: string;
  smartContractAddress?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: string;
  reviewedEntity: string;
  timestamp: string;
  blockHash: string;
  verified: boolean;
}

interface SmartContract {
  id: string;
  type: 'booking' | 'payment' | 'certification' | 'review';
  status: 'active' | 'pending' | 'completed' | 'terminated';
  parties: string[];
  terms: string;
  createdAt: string;
  expiresAt?: string;
  value: number;
}

export const BlockchainVerificationComponent = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const [verifications, setVerifications] = useState<VerificationStatus[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [verificationForm, setVerificationForm] = useState({
    type: '',
    name: '',
    description: '',
    specialization: '',
    experience: '',
    location: ''
  });

  // Mock data initialization
  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = useCallback(() => {
    setVerifications([
      {
        id: 'V001',
        status: 'verified',
        type: 'guide',
        name: 'Raj Kumar Mahato',
        dateSubmitted: '2024-01-15',
        dateVerified: '2024-01-18',
        trustScore: 95,
        certificateHash: '0x1a2b3c4d5e6f...',
        qrCode: 'QR_V001_VERIFIED'
      },
      {
        id: 'V002',
        status: 'pending',
        type: 'artisan',
        name: 'Sita Devi Tribal Crafts',
        dateSubmitted: '2024-01-20',
        trustScore: 0,
      },
      {
        id: 'V003',
        status: 'verified',
        type: 'homestay',
        name: 'Netarhat Hill Retreat',
        dateSubmitted: '2024-01-10',
        dateVerified: '2024-01-14',
        trustScore: 88,
        certificateHash: '0x7f8e9d0c1b2a...',
        qrCode: 'QR_V003_VERIFIED'
      }
    ]);

    setTransactions([
      {
        id: 'TX001',
        type: 'booking',
        amount: 5500,
        currency: '₹',
        status: 'confirmed',
        blockHash: '0xabc123...',
        timestamp: '2024-01-22T10:30:00Z',
        from: 'Tourist Wallet',
        to: 'Guide Service',
        smartContractAddress: '0x9876543210...'
      },
      {
        id: 'TX002',
        type: 'payment',
        amount: 2800,
        currency: '₹',
        status: 'pending',
        timestamp: '2024-01-22T15:45:00Z',
        from: 'Tourist Wallet',
        to: 'Homestay Owner'
      }
    ]);

    setReviews([
      {
        id: 'R001',
        rating: 5,
        comment: 'Excellent guide with deep knowledge of Jharkhand culture.',
        reviewer: 'Tourist_123',
        reviewedEntity: 'Raj Kumar Mahato',
        timestamp: '2024-01-21T14:20:00Z',
        blockHash: '0xdef456...',
        verified: true
      }
    ]);

    setContracts([
      {
        id: 'SC001',
        type: 'booking',
        status: 'active',
        parties: ['Tourist_123', 'Guide_RKM'],
        terms: 'Tribal village tour - 3 days package',
        createdAt: '2024-01-20T09:00:00Z',
        expiresAt: '2024-01-25T18:00:00Z',
        value: 5500
      }
    ]);
  }, []);

  // Blockchain simulation functions
  const generateHash = (input: string): string => {
    return '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const simulateBlockchainDelay = (ms: number = 2000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // Verification handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success('Document uploaded successfully');
    }
  };

  const submitVerification = async () => {
    if (!verificationForm.type || !verificationForm.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await simulateBlockchainDelay();
      
      const newVerification: VerificationStatus = {
        id: `V${String(verifications.length + 1).padStart(3, '0')}`,
        status: 'pending',
        type: verificationForm.type as any,
        name: verificationForm.name,
        dateSubmitted: new Date().toISOString().split('T')[0],
        trustScore: 0
      };

      setVerifications(prev => [...prev, newVerification]);
      setVerificationForm({ type: '', name: '', description: '', specialization: '', experience: '', location: '' });
      setSelectedFile(null);
      
      toast.success('Verification request submitted to blockchain');
    } catch (error) {
      toast.error('Verification submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const processVerification = async (id: string, approve: boolean) => {
    setIsLoading(true);
    
    try {
      await simulateBlockchainDelay();
      
      setVerifications(prev => prev.map(v => {
        if (v.id === id) {
          return {
            ...v,
            status: approve ? 'verified' : 'rejected',
            dateVerified: approve ? new Date().toISOString().split('T')[0] : undefined,
            trustScore: approve ? Math.floor(Math.random() * 20) + 80 : 0,
            certificateHash: approve ? generateHash(id) : undefined,
            qrCode: approve ? `QR_${id}_VERIFIED` : undefined
          };
        }
        return v;
      }));

      toast.success(`Verification ${approve ? 'approved' : 'rejected'} on blockchain`);
    } catch (error) {
      toast.error('Blockchain operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Payment processing
  const processPayment = async (amount: number, recipient: string) => {
    setIsLoading(true);
    
    try {
      await simulateBlockchainDelay();
      
      const newTransaction: Transaction = {
        id: `TX${String(transactions.length + 1).padStart(3, '0')}`,
        type: 'payment',
        amount,
        currency: '₹',
        status: 'confirmed',
        blockHash: generateHash('payment'),
        timestamp: new Date().toISOString(),
        from: 'User Wallet',
        to: recipient,
        smartContractAddress: generateHash('contract')
      };

      setTransactions(prev => [...prev, newTransaction]);
      toast.success('Payment processed on blockchain');
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  // QR Code generation (mock)
  const generateQRCode = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'verified': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        case 'pending': return 'bg-orange-100 text-orange-800 border-orange-300';
        case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
        case 'expired': return 'bg-gray-100 text-gray-800 border-gray-300';
        case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'completed': return 'bg-green-100 text-green-800 border-green-300';
        case 'failed': return 'bg-red-100 text-red-800 border-red-300';
        case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    };

    return (
      <Badge className={`${getStatusColor(status)} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Trust Score component
  const TrustScore = ({ score }: { score: number }) => (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white font-bold">
        {score}
      </div>
      <div>
        <div className="text-sm font-medium">Trust Score</div>
        <Progress value={score} className="w-20 h-2" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-blue-600 to-orange-500 bg-clip-text text-transparent">
          <Shield className="w-8 h-8 text-emerald-600" />
          <h1 className="text-4xl font-bold">Blockchain Verification Hub</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure, transparent verification system powered by blockchain technology for Jharkhand tourism ecosystem
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Verified className="w-4 h-4" />
            Verification
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Smart Contracts
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submit New Verification */}
            <Card className="border-2 border-emerald-200">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-600" />
                  Submit New Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="verification-type">Verification Type</Label>
                  <Select 
                    value={verificationForm.type} 
                    onValueChange={(value) => setVerificationForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guide">Tourist Guide</SelectItem>
                      <SelectItem value="artisan">Local Artisan</SelectItem>
                      <SelectItem value="homestay">Homestay Owner</SelectItem>
                      <SelectItem value="transport">Transport Provider</SelectItem>
                      <SelectItem value="equipment">Equipment Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name / Business Name</Label>
                  <Input
                    id="name"
                    value={verificationForm.name}
                    onChange={(e) => setVerificationForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name or business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={verificationForm.location}
                    onChange={(e) => setVerificationForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, District"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={verificationForm.specialization}
                    onChange={(e) => setVerificationForm(prev => ({ ...prev, specialization: e.target.value }))}
                    placeholder="Area of expertise"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Upload Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to upload certificates, ID, or photos'}
                      </p>
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={submitVerification}
                  disabled={isLoading || !verificationForm.type || !verificationForm.name}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Submitting to Blockchain...
                    </>
                  ) : (
                    'Submit for Verification'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Verification Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Verification Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      {verifications.filter(v => v.status === 'verified').length}
                    </div>
                    <div className="text-sm text-emerald-700">Verified</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {verifications.filter(v => v.status === 'pending').length}
                    </div>
                    <div className="text-sm text-orange-700">Pending</div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Trust Score</span>
                    <span className="text-lg font-bold text-blue-600">
                      {Math.round(verifications.filter(v => v.trustScore > 0).reduce((acc, v) => acc + v.trustScore, 0) / verifications.filter(v => v.trustScore > 0).length || 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verification List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Current Verifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verifications.map((verification) => (
                <Card key={verification.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {verification.type === 'guide' && <Users className="w-5 h-5 text-emerald-600" />}
                        {verification.type === 'artisan' && <Award className="w-5 h-5 text-orange-600" />}
                        {verification.type === 'homestay' && <Home className="w-5 h-5 text-blue-600" />}
                        {verification.type === 'transport' && <Car className="w-5 h-5 text-purple-600" />}
                        {verification.type === 'equipment' && <Briefcase className="w-5 h-5 text-red-600" />}
                        <div>
                          <CardTitle className="text-lg">{verification.name}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">{verification.type}</p>
                        </div>
                      </div>
                      <StatusBadge status={verification.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {verification.status === 'verified' && (
                      <TrustScore score={verification.trustScore} />
                    )}
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Submitted:</span>
                        <span>{verification.dateSubmitted}</span>
                      </div>
                      {verification.dateVerified && (
                        <div className="flex justify-between">
                          <span>Verified:</span>
                          <span>{verification.dateVerified}</span>
                        </div>
                      )}
                    </div>

                    {verification.status === 'verified' && (
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Verification Certificate</DialogTitle>
                              <DialogDescription>
                                Blockchain-verified certificate for {verification.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="text-center space-y-4">
                              <img 
                                src={generateQRCode(verification.qrCode || '')}
                                alt="Verification QR Code"
                                className="mx-auto"
                              />
                              <div className="text-xs text-muted-foreground">
                                Certificate Hash: {verification.certificateHash}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    )}

                    {verification.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => processVerification(verification.id, true)}
                          disabled={isLoading}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => processVerification(verification.id, false)}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {tx.type.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{tx.currency}{tx.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground capitalize">{tx.type}</div>
                        </div>
                      </div>
                      <StatusBadge status={tx.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">From: </span>
                        <span className="text-muted-foreground">{tx.from}</span>
                      </div>
                      <div>
                        <span className="font-medium">To: </span>
                        <span className="text-muted-foreground">{tx.to}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Time: </span>
                        <span className="text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {tx.blockHash && (
                        <div className="col-span-2">
                          <span className="font-medium">Block Hash: </span>
                          <span className="text-muted-foreground font-mono text-xs">{tx.blockHash}</span>
                        </div>
                      )}
                    </div>

                    {tx.status === 'confirmed' && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified on blockchain
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Make Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                
                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guide1">Raj Kumar Mahato (Guide)</SelectItem>
                      <SelectItem value="homestay1">Netarhat Hill Retreat</SelectItem>
                      <SelectItem value="artisan1">Sita Devi Tribal Crafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking Payment</SelectItem>
                      <SelectItem value="advance">Advance Payment</SelectItem>
                      <SelectItem value="full">Full Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                  onClick={() => processPayment(1000, 'Selected Recipient')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Process Payment
                    </>
                  )}
                </Button>

                <div className="text-xs text-center text-muted-foreground">
                  Secured by blockchain technology
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Smart Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contracts.map((contract) => (
              <Card key={contract.id} className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Smart Contract {contract.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">{contract.type}</p>
                    </div>
                    <StatusBadge status={contract.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <div className="font-medium">Contract Terms:</div>
                    <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                      {contract.terms}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Value: </span>
                      <span>₹{contract.value.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Parties: </span>
                      <span>{contract.parties.length}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Created: </span>
                      <span>{new Date(contract.createdAt).toLocaleDateString()}</span>
                    </div>
                    {contract.expiresAt && (
                      <div>
                        <span className="font-medium">Expires: </span>
                        <span>{new Date(contract.expiresAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Blockchain
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Blockchain-Verified Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">For: {review.reviewedEntity}</div>
                    <div className="text-sm text-muted-foreground">{review.comment}</div>
                    <div className="text-xs">
                      <span className="font-medium">Reviewer: </span>
                      <span className="font-mono">{review.reviewer}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">Block Hash: </span>
                      <span className="font-mono">{review.blockHash}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};