import React from 'react';
import { Shield, Sparkles, KeyRound, Play, CheckCircle2, Award } from 'lucide-react';
import { QuickSearch } from './QuickSearch';
import { BranchId, StayType } from '../types';

interface HeroProps {
  selectedBranch: BranchId | 'all';
  setSelectedBranch: (val: BranchId | 'all') => void;
  selectedStayType: StayType;
  setSelectedStayType: (val: StayType) => void;
  checkInDate: string;
  setCheckInDate: (val: string) => void;
  guestsCount: number;
  setGuestsCount: (val: number) => void;
  onSearch: () => void;
  onOpenCheckinLookup: () => void;
  onExploreMissions: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedBranch,
  setSelectedBranch,
  selectedStayType,
  setSelectedStayType,
  checkInDate,
  setCheckInDate,
  guestsCount,
  setGuestsCount,
  onSearch,
  onOpenCheckinLookup,
  onExploreMissions,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with layered vignette and noir gradient */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85"
          alt="007 Staycation Luxury Interior"
          className="w-full h-full object-cover object-center brightness-[0.28] scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Subtle cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/60 to-[#0a0a0c]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f0f11]/40 to-[#0f0f11]" />
      </div>

      {/* Decorative ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1e28]/80 border border-[#d4af37]/30 text-xs text-[#e8d5a8] mb-6 backdrop-blur-md shadow-lg shadow-black/40">
          <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-medium tracking-wide">100% Tự Động Check-in · Không Lễ Tân · Riêng Tư Tuyệt Đối</span>
        </div>

        {/* Main Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider max-w-4xl leading-[1.15] mb-5">
          TRẢI NGHIỆM LƯU TRÚ <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#fae7b9] via-[#d4af37] to-[#99731b] bg-clip-text text-transparent">
            CONCEPT 007
          </span>{' '}
          ĐỘC BẢN
        </h1>

        {/* Subtitle */}
        <p className="text-[#bfbfc9] text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed mb-8">
          Chuỗi homestay phong cách đặc vụ tại TP. Bà Rịa. Không gian phòng nghỉ theo từng Mission bí mật, bồn tắm oval thư giãn, rạp chiếu phim 4K 120" và nhận phòng bằng mật mã số tự động bảo mật.
        </p>

        {/* Highlight Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#d4af37] font-medium mb-10">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span className="text-gray-200">Mã Số Smartlock Tự Đổi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span className="text-gray-200">Bồn Tắm Chill & Máy Chiếu 4K</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span className="text-gray-200">Quy Định 16+ Yên Tĩnh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span className="text-gray-200">2 Chi Nhánh Tại Bà Rịa</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onExploreMissions}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59e2b] to-[#99741a] hover:from-[#e4bd47] hover:to-[#a98122] text-black font-semibold text-sm uppercase tracking-wider shadow-xl shadow-[#d4af37]/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Khám Phá 8 Missions</span>
          </button>

          <button
            onClick={onOpenCheckinLookup}
            className="px-5 py-3.5 rounded-xl bg-[#171720]/80 hover:bg-[#20202c] border border-[#d4af37]/40 text-[#f5ebd2] hover:border-[#d4af37] font-medium text-sm transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-[#d4af37]" />
            <span>Lấy Mật Mã Khóa Cửa (Đã Đặt Phòng)</span>
          </button>
        </div>

        {/* Integrated Quick Search Bar */}
        <div className="w-full mt-2">
          <QuickSearch
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            selectedStayType={selectedStayType}
            setSelectedStayType={setSelectedStayType}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            guestsCount={guestsCount}
            setGuestsCount={setGuestsCount}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
};
