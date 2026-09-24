import React from 'react';
import { Phone, MessageCircle, KeyRound, CalendarCheck } from 'lucide-react';

interface FloatingContactProps {
  onOpenCheckinLookup: () => void;
  onOpenBooking: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({
  onOpenCheckinLookup,
  onOpenBooking,
}) => {
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Quick Lookup Button */}
      <button
        onClick={onOpenCheckinLookup}
        className="group px-3.5 py-2.5 rounded-full bg-[#181824]/90 backdrop-blur-md border border-[#d4af37]/40 text-[#f5ebd2] shadow-xl hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Lấy mã số khóa phòng Smartlock"
      >
        <KeyRound className="w-4 h-4 text-[#d4af37] group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline">Lấy Mật Mã Khóa Cửa</span>
      </button>

      {/* Floating Zalo Chat */}
      <a
        href="https://zalo.me/0899772567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        title="Chat với 007 qua Zalo (0899 772 567)"
      >
        <span className="font-extrabold text-xs">Zalo</span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#111116] animate-pulse" />
      </a>

      {/* Floating Hotline Call */}
      <a
        href="tel:0899772567"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#ba9028] text-black shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 relative"
        title="Gọi Hotline 0899 772 567"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>
    </div>
  );
};
