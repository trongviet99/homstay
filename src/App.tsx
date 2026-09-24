import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { RoomModal } from './components/RoomModal';
import { AutoCheckinSection } from './components/AutoCheckinSection';
import { SelfCheckinModal } from './components/SelfCheckinModal';
import { PricingPackagesSection } from './components/PricingPackagesSection';
import { RulesSection } from './components/RulesSection';
import { BookingModal } from './components/BookingModal';
import { LocationsSection } from './components/LocationsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { ROOMS } from './data/rooms';
import { Room, BranchId, StayType, BookingDetails } from './types';

export default function App() {
  // Global filter state
  const [selectedBranch, setSelectedBranch] = useState<BranchId | 'all'>('all');
  const [selectedStayType, setSelectedStayType] = useState<StayType>('overnight');
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [guestsCount, setGuestsCount] = useState<number>(2);

  // Modals state
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPreselectedRoom, setBookingPreselectedRoom] = useState<Room | null>(null);
  const [isCheckinLookupOpen, setIsCheckinLookupOpen] = useState<boolean>(false);
  const [recentBookingCode, setRecentBookingCode] = useState<string>('');

  // Smooth scroll handler
  const handleNavigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Search trigger from Hero QuickSearch
  const handleSearchRooms = () => {
    handleNavigateTo('rooms');
  };

  // Open booking modal directly with chosen room
  const handleBookRoom = (room: Room) => {
    setBookingPreselectedRoom(room);
    setIsBookingModalOpen(true);
  };

  // Open booking modal from navbar CTA (room default)
  const handleOpenGeneralBooking = () => {
    setBookingPreselectedRoom(null);
    setIsBookingModalOpen(true);
  };

  // When package selected in PricingPackagesSection
  const handleSelectPackage = (stay: StayType) => {
    setSelectedStayType(stay);
    handleNavigateTo('rooms');
  };

  // On successful booking confirmation
  const handleBookingConfirmed = (booking: BookingDetails) => {
    setRecentBookingCode(booking.bookingCode);
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] text-[#e8e8ed] selection:bg-[#d4af37]/30 selection:text-[#faebd7]">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenCheckinLookup={() => setIsCheckinLookupOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
        onNavigateTo={handleNavigateTo}
      />

      {/* Hero Section with Quick Search */}
      <main>
        <Hero
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedStayType={selectedStayType}
          setSelectedStayType={setSelectedStayType}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          guestsCount={guestsCount}
          setGuestsCount={setGuestsCount}
          onSearch={handleSearchRooms}
          onOpenCheckinLookup={() => setIsCheckinLookupOpen(true)}
          onExploreMissions={() => handleNavigateTo('rooms')}
        />

        {/* 8 Room Missions Collection with Filters */}
        <RoomsSection
          rooms={ROOMS}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedStayType={selectedStayType}
          setSelectedStayType={setSelectedStayType}
          onViewDetails={(room) => setSelectedRoomForDetails(room)}
          onBookNow={handleBookRoom}
        />

        {/* Automatic 100% Self Check-in Showcase */}
        <AutoCheckinSection
          onOpenLookupModal={() => setIsCheckinLookupOpen(true)}
        />

        {/* Pricing, Packages & Add-on Services */}
        <PricingPackagesSection onSelectPackage={handleSelectPackage} />

        {/* Strict 16+ Rules & Code of Conduct */}
        <RulesSection />

        {/* 2 Locations, Addresses & Google Map Directions */}
        <LocationsSection />

        {/* Genuine Customer Reviews & Form */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateTo={handleNavigateTo}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenCheckinLookup={() => setIsCheckinLookupOpen(true)}
      />

      {/* Floating Call & Zalo Widget */}
      <FloatingContact
        onOpenCheckinLookup={() => setIsCheckinLookupOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Room Details Modal */}
      <RoomModal
        room={selectedRoomForDetails}
        onClose={() => setSelectedRoomForDetails(null)}
        onBookRoom={handleBookRoom}
      />

      {/* Interactive Booking Engine Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedRoom={bookingPreselectedRoom}
        preselectedStayType={selectedStayType}
        initialCheckInDate={checkInDate}
        initialGuestsCount={guestsCount}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Door Smartlock Pin & Booking Lookup Modal */}
      <SelfCheckinModal
        isOpen={isCheckinLookupOpen}
        onClose={() => setIsCheckinLookupOpen(false)}
        recentBookingCode={recentBookingCode}
      />
    </div>
  );
}
