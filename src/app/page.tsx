"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ExploreAndBook } from "@/components/explore-and-book";
import { MarketplaceBooking } from "@/components/marketplace-booking";
import { AdminDashboard } from "@/components/admin-dashboard";
import { Footer } from "@/components/footer";

export default function Home() {
  const [mode, setMode] = useState<'tourist' | 'admin'>('tourist');
  const [language, setLanguage] = useState<'en' | 'hi' | 'tribal'>('en');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <Header 
        mode={mode} 
        onModeToggle={setMode} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      {mode === 'tourist' ? (
        <>
          <main className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Primary Column - Explore & Book */}
              <div className="lg:col-span-7">
                <ExploreAndBook language={language} />
              </div>
              
              {/* Secondary Column - Marketplace & Booking */}
              <div className="lg:col-span-5">
                <MarketplaceBooking language={language} />
              </div>
            </div>
          </main>
          <Footer language={language} />
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}