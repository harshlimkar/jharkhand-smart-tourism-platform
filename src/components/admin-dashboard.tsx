"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign,
  AlertTriangle,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Star,
  Plane,
  Bus,
  Hotel,
  ShoppingBag,
  Activity,
  Target,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  Grid3X3,
  Map,
  PieChart,
  LineChart,
  Zap,
  Bell
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  kpis: {
    totalVisitors: 1234567,
    monthlyGrowth: 12.5,
    avgStayDuration: 4.2,
    revenueToday: 2456789,
    occupancyRate: 78.5,
    satisfactionScore: 4.6
  },
  visitorTrends: [
    { date: "Jan", visitors: 85000, revenue: 12500000 },
    { date: "Feb", visitors: 92000, revenue: 13800000 },
    { date: "Mar", visitors: 108000, revenue: 16200000 },
    { date: "Apr", visitors: 125000, revenue: 18750000 },
    { date: "May", visitors: 142000, revenue: 21300000 },
    { date: "Jun", visitors: 165000, revenue: 24750000 }
  ],
  destinations: [
    { name: "Heritage Museum", visitors: 45000, revenue: 2250000, satisfaction: 4.8, capacity: 85 },
    { name: "Mountain Resort", visitors: 38000, revenue: 5700000, satisfaction: 4.5, capacity: 92 },
    { name: "Beach Paradise", visitors: 62000, revenue: 4650000, satisfaction: 4.7, capacity: 78 },
    { name: "City Center", visitors: 71000, revenue: 3550000, satisfaction: 4.2, capacity: 65 },
    { name: "Adventure Park", visitors: 29000, revenue: 2175000, satisfaction: 4.6, capacity: 88 }
  ],
  undervisited: [
    { name: "Hidden Valley", potential: 15000, currentVisitors: 3200, reason: "Limited transport access" },
    { name: "Ancient Ruins", potential: 22000, currentVisitors: 5800, reason: "Poor marketing visibility" },
    { name: "Coastal Trail", potential: 18000, currentVisitors: 4500, reason: "Seasonal accessibility" }
  ],
  alerts: [
    { type: "warning", title: "High Congestion", message: "Beach Paradise approaching 95% capacity", time: "5 min ago" },
    { type: "info", title: "Weather Impact", message: "Mountain Resort bookings down 15% due to rain forecast", time: "1 hour ago" },
    { type: "critical", title: "Safety Incident", message: "Minor accident reported at Adventure Park", time: "2 hours ago" }
  ],
  sentiment: {
    positive: 68,
    neutral: 24,
    negative: 8,
    recentFeedback: [
      { rating: 5, comment: "Amazing experience at the heritage museum!", location: "Heritage Museum", time: "2 hours ago" },
      { rating: 4, comment: "Great mountain views, but crowded paths", location: "Mountain Resort", time: "4 hours ago" },
      { rating: 2, comment: "Beach was dirty, disappointed", location: "Beach Paradise", time: "6 hours ago" }
    ]
  }
};

export const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In real implementation, this would trigger data refetch
  };

  const handleExport = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `tourism-report-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const KPICard = ({ title, value, change, icon: Icon, suffix = "" }) => (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{value}{suffix}</span>
              {change && (
                <Badge variant={change > 0 ? "default" : "destructive"} className="text-xs">
                  {change > 0 ? "+" : ""}{change}%
                </Badge>
              )}
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`w-full ${isFullScreen ? 'fixed inset-0 z-50 bg-background' : ''} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tourism Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            {isFullScreen ? "Exit" : "Fullscreen"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 border rounded-lg bg-card">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <Label className="text-sm font-medium">Filters:</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="period" className="text-sm">Period:</Label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="location" className="text-sm">Location:</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="heritage">Heritage Museum</SelectItem>
              <SelectItem value="mountain">Mountain Resort</SelectItem>
              <SelectItem value="beach">Beach Paradise</SelectItem>
              <SelectItem value="city">City Center</SelectItem>
              <SelectItem value="adventure">Adventure Park</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts */}
      {mockData.alerts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Bell className="h-5 w-5 mr-2 text-orange-500" />
            <h2 className="text-lg font-semibold">Active Alerts</h2>
          </div>
          <div className="grid gap-3">
            {mockData.alerts.map((alert, index) => (
              <Alert key={index} variant={alert.type === "critical" ? "destructive" : "default"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="flex justify-between">
                  {alert.message}
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <KPICard
          title="Total Visitors"
          value={formatNumber(mockData.kpis.totalVisitors)}
          change={mockData.kpis.monthlyGrowth}
          icon={Users}
        />
        <KPICard
          title="Avg Stay Duration"
          value={mockData.kpis.avgStayDuration}
          suffix=" days"
          icon={Calendar}
        />
        <KPICard
          title="Revenue Today"
          value={`$${formatNumber(mockData.kpis.revenueToday)}`}
          change={8.2}
          icon={DollarSign}
        />
        <KPICard
          title="Occupancy Rate"
          value={mockData.kpis.occupancyRate}
          suffix="%"
          change={-2.1}
          icon={Hotel}
        />
        <KPICard
          title="Satisfaction Score"
          value={mockData.kpis.satisfactionScore}
          suffix="/5"
          change={0.3}
          icon={Star}
        />
        <KPICard
          title="Active Bookings"
          value="2.1K"
          change={15.7}
          icon={Activity}
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitor Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Visitor Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 px-4">
                  {mockData.visitorTrends.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-primary rounded-t w-12 transition-all duration-300 hover:bg-primary/80"
                        style={{
                          height: `${(data.visitors / Math.max(...mockData.visitorTrends.map(d => d.visitors))) * 200}px`
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{data.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Popular Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {mockData.destinations.map((dest, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{dest.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(dest.visitors)} visitors • ${formatNumber(dest.revenue)} revenue
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{dest.satisfaction}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{dest.capacity}%</div>
                          <Progress value={dest.capacity} className="w-20 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Under-visited Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Under-visited Areas with Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockData.undervisited.map((area, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <h4 className="font-medium">{area.name}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span>{formatNumber(area.currentVisitors)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Potential:</span>
                        <span className="font-medium text-green-600">{formatNumber(area.potential)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{area.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Destination Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.destinations.map((dest, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{dest.name}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Visitors</div>
                        <div className="font-medium">{formatNumber(dest.visitors)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="font-medium">${formatNumber(dest.revenue)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Capacity</div>
                        <div className="font-medium">{dest.capacity}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.destinations.map((dest, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{dest.name}</span>
                        <span className="text-sm">{dest.capacity}%</span>
                      </div>
                      <Progress 
                        value={dest.capacity} 
                        className={`w-full ${dest.capacity > 90 ? 'bg-red-100' : dest.capacity > 70 ? 'bg-yellow-100' : 'bg-green-100'}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 px-4">
                  {mockData.visitorTrends.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="bg-green-500 rounded-t w-12 transition-all duration-300 hover:bg-green-400"
                        style={{
                          height: `${(data.revenue / Math.max(...mockData.visitorTrends.map(d => d.revenue))) * 200}px`
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{data.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Transport Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Plane className="h-4 w-4 mr-2" />
                      <span className="text-sm">Air Travel</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bus className="h-4 w-4 mr-2" />
                      <span className="text-sm">Ground Transport</span>
                    </div>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      <span className="text-sm">Local Transit</span>
                    </div>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics & Seasonal Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Zap className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <h4 className="font-medium">Peak Season</h4>
                  <p className="text-sm text-muted-foreground">June - August</p>
                  <p className="text-lg font-bold text-blue-600">+65%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Clock className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <h4 className="font-medium">Optimal Visit Time</h4>
                  <p className="text-sm text-muted-foreground">9AM - 11AM</p>
                  <p className="text-lg font-bold text-green-600">-30% crowds</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <h4 className="font-medium">Event Impact</h4>
                  <p className="text-sm text-muted-foreground">Festival Season</p>
                  <p className="text-lg font-bold text-purple-600">+120%</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <h4 className="font-medium">Growth Forecast</h4>
                  <p className="text-sm text-muted-foreground">Next Quarter</p>
                  <p className="text-lg font-bold text-orange-600">+18%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Positive</span>
                    </div>
                    <span className="font-medium">{mockData.sentiment.positive}%</span>
                  </div>
                  <Progress value={mockData.sentiment.positive} className="bg-green-100" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Neutral</span>
                    </div>
                    <span className="font-medium">{mockData.sentiment.neutral}%</span>
                  </div>
                  <Progress value={mockData.sentiment.neutral} className="bg-gray-100" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm">Negative</span>
                    </div>
                    <span className="font-medium">{mockData.sentiment.negative}%</span>
                  </div>
                  <Progress value={mockData.sentiment.negative} className="bg-red-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {mockData.sentiment.recentFeedback.map((feedback, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{feedback.time}</span>
                        </div>
                        <p className="text-sm">{feedback.comment}</p>
                        <p className="text-xs text-muted-foreground mt-1">{feedback.location}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crowd Control Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.destinations.slice(0, 3).map((dest, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{dest.name}</span>
                      <Badge variant={dest.capacity > 85 ? "destructive" : dest.capacity > 70 ? "secondary" : "default"}>
                        {dest.capacity > 85 ? "Critical" : dest.capacity > 70 ? "Moderate" : "Normal"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <p className="text-sm text-muted-foreground">Minor incidents today</p>
                  <div className="mt-4 space-y-2">
                    <Badge variant="secondary">Medical: 1</Badge>
                    <Badge variant="secondary">Lost item: 2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Economic Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Direct Revenue</span>
                    <span className="font-medium">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Indirect Impact</span>
                    <span className="font-medium">$4.8M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jobs Supported</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Total Impact</span>
                    <span className="font-bold text-green-600">$7.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};