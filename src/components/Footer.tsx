import React from 'react';
import { MapPin, Phone, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenCheckinLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTo,
  onOpenBooking,
  onOpenCheckinLookup,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090c] border-t border-[#1e1e28] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-[#8c8c9e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#aa8222] to-[#684f11] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0d10] rounded-[7px] flex items-center justify-center">
                <span className="font-cinzel text-base font-extrabold text-[#d4af37]">007</span>
              </div>
            </div>
            <div>
              <span className="font-cinzel text-lg font-bold tracking-widest text-white">
                STAYCATION
              </span>
              <p className="text-[10px] tracking-widest text-[#a0a0b0] uppercase">
                The Secret Luxury Stay
              </p>
            </div>
          </div>

          <p className="text-xs text-[#a0a0b2] font-light leading-relaxed max-w-sm">
            Hệ thống homestay nghỉ dưỡng concept 007 độc bản tại Bà Rịa. 100% Tự động check-in không lễ tân, bảo mật riêng tư tuyệt đối, bồn tắm thư giãn & máy chiếu 4K rạp phim tại gia.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://zalo.me/0899772567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-white border border-[#2b2b3d] text-[11px] font-medium transition-colors"
            >
              Zalo Official
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#222234] text-white border border-[#2b2b3d] text-[11px] font-medium transition-colors"
            >
              Facebook Fanpage
            </a>
            <button
              onClick={onOpenCheckinLookup}
              className="px-3 py-1.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 text-[11px] font-medium cursor-pointer"
            >
              Lấy Mật Mã Phòng
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
            Khám Phá
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigateTo('rooms')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Bộ Sưu Tập 8 Missions
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTo('auto-checkin')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Quy Trình Tự Check-in
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTo('pricing')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Bảng Giá Giờ / Đêm / Ngày
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTo('rules')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Nội Quy 16+ & Cấm Khói
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTo('locations')}
                className="hover:text-[#d4af37] transition-colors"
              >
                Vị Trí & Bản Đồ
              </button>
            </li>
          </ul>
        </div>

        {/* 2 Branches */}
        <div className="space-y-3 lg:col-span-2">
          <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
            Chi Nhánh Tại TP. Bà Rịa
          </h4>
          <div className="space-y-3 text-xs">
            <div className="bg-[#121219] p-3 rounded-xl border border-[#222230]">
              <span className="font-semibold text-white block">
                Chi nhánh 1: Villa Trần Quốc Toản
              </span>
              <p className="text-[#9595a6] mt-0.5">
                40 Trần Quốc Toản, P. Long Hương, TP. Bà Rịa (Đỗ ô tô thoải mái)
              </p>
            </div>

            <div className="bg-[#121219] p-3 rounded-xl border border-[#222230]">
              <span className="font-semibold text-white block">
                Chi nhánh 2: Studio Nguyễn Thị Minh Khai
              </span>
              <p className="text-[#9595a6] mt-0.5">
                51 Nguyễn Thị Minh Khai, P. Phước Hiệp, TP. Bà Rịa (Ngay trung tâm)
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 text-white">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>Hotline 24/7:</span>
              <a href="tel:0899772567" className="text-[#d4af37] font-bold text-sm">
                0899 772 567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Back to top */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1a1a24] flex flex-wrap items-center justify-between gap-4">
        <p className="text-[11px] text-[#6d6d7e]">
          © {new Date().getFullYear()} 007 Staycation. All rights reserved. Hệ thống lưu trú tự động và bảo mật cao cấp.
        </p>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#d4af37] font-medium">Chính sách 16+ & Không khói thuốc 100%</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#161622] hover:bg-[#20202e] text-[#a0a0b2] hover:text-white transition-colors cursor-pointer"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
