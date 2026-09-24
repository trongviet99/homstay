import React, { useState, useEffect } from 'react';
import { Shield, KeyRound, Phone, Menu, X, Compass, CalendarCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCheckinLookup: () => void;
  onOpenBooking: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckinLookup,
  onOpenBooking,
  onNavigateTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateTo(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#25252d] shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#aa8222] to-[#684f11] flex items-center justify-center p-0.5 shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-all">
            <div className="w-full h-full bg-[#0d0d10] rounded-[7px] flex items-center justify-center">
              <span className="font-cinzel text-base font-extrabold text-[#d4af37] tracking-wider">007</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-white group-hover:text-[#d4af37] transition-colors">
                STAYCATION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            </div>
            <p className="text-[10px] tracking-[0.2em] text-[#a3a3b0] uppercase -mt-0.5">
              The Secret Luxury Stay
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => handleNavClick('rooms')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none"
          >
            Bộ Sưu Tập Missions
          </button>
          <button
            onClick={() => handleNavClick('auto-checkin')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            Tự Động Check-in
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none"
          >
            Bảng Giá Gói
          </button>
          <button
            onClick={() => handleNavClick('rules')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none"
          >
            Nội Quy 16+
          </button>
          <button
            onClick={() => handleNavClick('locations')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none"
          >
            2 Chi Nhánh
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="text-sm font-medium text-[#d1d1db] hover:text-[#d4af37] transition-colors focus:outline-none"
          >
            Đánh Giá
          </button>
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Key retrieval / Booking lookup button */}
          <button
            onClick={onOpenCheckinLookup}
            className="px-3 py-2 rounded-lg bg-[#1a1a22] hover:bg-[#252530] text-[#e0cfab] border border-[#d4af37]/30 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm hover:border-[#d4af37]/60"
            title="Nhập mã booking để lấy mật khẩu khóa cửa smartlock"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Lấy Mã Khóa Cửa</span>
          </button>

          {/* Hotline direct */}
          <a
            href="tel:0899772567"
            className="px-3 py-2 rounded-lg text-xs font-medium text-[#b5b5c2] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden xl:inline">Hotline:</span>
            <span className="font-semibold text-white">0899 772 567</span>
          </a>

          {/* Book now CTA */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b88e28] hover:from-[#e2bf4b] hover:to-[#c89c32] text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 active:scale-95 transition-all cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Đặt Phòng</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCheckinLookup}
            className="p-2 rounded-lg bg-[#1a1a22] text-[#d4af37] border border-[#d4af37]/30 text-xs"
            aria-label="Lấy mã khóa"
          >
            <KeyRound className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1a1a22] text-[#e0e0ea] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c10] border-b border-[#24242e] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 border-b border-[#20202a] pb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider text-center"
            >
              Đặt Phòng Ngay
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckinLookup();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#1a1a22] border border-[#d4af37]/40 text-[#d4af37] font-medium text-xs text-center flex items-center justify-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Lấy Mã Khóa
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('rooms')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d]"
            >
              Bộ Sưu Tập Missions (Phòng)
            </button>
            <button
              onClick={() => handleNavClick('auto-checkin')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d] flex items-center justify-between"
            >
              <span>Quy Trình Tự Check-in</span>
              <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded">100% No Reception</span>
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d]"
            >
              Bảng Giá Giờ / Đêm / Ngày
            </button>
            <button
              onClick={() => handleNavClick('rules')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d]"
            >
              Nội Quy Nghiêm Ngặt (16+ & Cấm Khói)
            </button>
            <button
              onClick={() => handleNavClick('locations')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d]"
            >
              Địa Chỉ 2 Chi Nhánh & Chỉ Đường
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="px-3 py-2 text-left text-sm text-[#d1d1db] hover:text-white rounded-lg hover:bg-[#16161d]"
            >
              Đánh Giá Của Khách Hàng
            </button>
          </div>

          <div className="pt-2 border-t border-[#20202a] flex items-center justify-between text-xs text-[#a0a0b0]">
            <span>Hotline / Zalo hỗ trợ:</span>
            <a href="tel:0899772567" className="text-[#d4af37] font-semibold">
              0899 772 567
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
