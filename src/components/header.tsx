"use client";

import React, { useState } from 'react';
import { Search, Globe, User, Menu, X, Mountain, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface HeaderProps {
  mode: 'tourist' | 'admin';
  onModeToggle: () => void;
  language: 'en' | 'hi' | 'tribal';
  onLanguageChange: (language: 'en' | 'hi' | 'tribal') => void;
}

export const Header = ({ mode, onModeToggle, language, onLanguageChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languageLabels = {
    en: 'English',
    hi: 'हिंदी',
    tribal: 'Tribal'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-500 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-emerald-600/95 supports-[backdrop-filter]:via-blue-600/95 supports-[backdrop-filter]:to-orange-500/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-white" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Jharkhand</h1>
                <p className="text-xs text-white/80 -mt-1">Smart Tourism</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search destinations, activities, hotels..."
                  className="w-full pl-10 pr-4 bg-white/90 backdrop-blur border-white/20 text-foreground placeholder:text-muted-foreground focus:bg-white transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {languageLabels[language]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onLanguageChange('en')}
                  className={language === 'en' ? 'bg-accent' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange('hi')}
                  className={language === 'hi' ? 'bg-accent' : ''}
                >
                  हिंदी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange('tribal')}
                  className={language === 'tribal' ? 'bg-accent' : ''}
                >
                  Tribal Languages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mode Toggle */}
            <Button
              onClick={onModeToggle}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              {mode === 'tourist' ? (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Admin View
                </>
              ) : (
                <>
                  <Mountain className="h-4 w-4 mr-2" />
                  Tourist View
                </>
              )}
            </Button>

            {/* Profile/User Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
                <DropdownMenuItem>Favorites</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Mountain className="h-6 w-6 text-primary" />
                      <div>
                        <h2 className="font-semibold text-sm">Jharkhand Tourism</h2>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-b">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search destinations..."
                          className="w-full pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-4 space-y-4">
                    {/* Language Selector */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Language</h3>
                      <div className="space-y-1">
                        {Object.entries(languageLabels).map(([key, label]) => (
                          <Button
                            key={key}
                            variant={language === key ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => onLanguageChange(key as 'en' | 'hi' | 'tribal')}
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Mode Toggle */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">View Mode</h3>
                      <Button
                        onClick={onModeToggle}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        {mode === 'tourist' ? (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Switch to Admin View
                          </>
                        ) : (
                          <>
                            <Mountain className="h-4 w-4 mr-2" />
                            Switch to Tourist View
                          </>
                        )}
                      </Button>
                    </div>

                    {/* User Actions */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Account</h3>
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          My Bookings
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          Favorites
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-destructive hover:text-destructive"
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};