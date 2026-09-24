import React from 'react';
import { Clock, Moon, Sun, Sparkles, Check, Heart, Wine, Cake, ShieldAlert, ArrowRight } from 'lucide-react';
import { ADDON_SERVICES } from '../data/services';

interface PricingPackagesSectionProps {
  onSelectPackage: (stayType: 'hourly' | 'overnight' | 'daily') => void;
}

export const PricingPackagesSection: React.FC<PricingPackagesSectionProps> = ({
  onSelectPackage,
}) => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gói Lưu Trú & Dịch Vụ Phụ Trợ</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          BẢNG GIÁ & CÁC GÓI NGHỈ DƯỠNG
        </h2>
        <p className="text-[#a4a4b6] text-sm max-w-2xl mt-3 font-light">
          Linh hoạt theo nhu cầu của bạn: từ vài giờ nghỉ trưa sảng khoái, qua đêm lãng mạn cho đến kỳ nghỉ trọn vẹn 24 giờ.
        </p>
      </div>

      {/* 3 Main Stay Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Package 1: Hourly */}
        <div className="bg-[#14141c] border border-[#272737] rounded-2xl p-6 flex flex-col justify-between hover:border-[#d4af37]/50 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#1e1e2c] border border-[#2e2e40] flex items-center justify-center text-[#d4af37]">
                <Clock className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-[#8f8fa0] uppercase tracking-wider">
                Nghỉ Nhanh
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-cinzel mb-1">
              Gói Theo Giờ (3h)
            </h3>
            <p className="text-xs text-[#9d9dae] font-light mb-4">
              Lựa chọn hoàn hảo cho những cuộc hẹn hò ngắn, nghỉ trưa thư giãn trên đường đi du lịch Vũng Tàu.
            </p>

            <div className="mb-6 pb-4 border-b border-[#222230]">
              <div className="text-xs text-[#8c8c9c]">Giá từ</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-bold text-[#d4af37]">350.000đ</span>
                <span className="text-xs text-[#7e7e90]">/ 3 giờ</span>
              </div>
              <div className="text-[11px] text-[#8e8e9e] mt-1">
                Giờ tiếp theo: +60.000đ - 70.000đ / giờ
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#c5c5d4] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Áp dụng khung giờ linh hoạt ban ngày</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Sử dụng trọn vẹn bồn tắm & máy chiếu 4K</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nước khoáng & trà cafe miễn phí</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nhận phòng tự động bằng mật mã</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPackage('hourly')}
            className="w-full py-2.5 rounded-xl bg-[#20202e] hover:bg-[#2b2b3d] text-white hover:text-[#d4af37] border border-[#313144] font-semibold text-xs transition-colors cursor-pointer"
          >
            Chọn Gói Theo Giờ
          </button>
        </div>

        {/* Package 2: Overnight (Featured) */}
        <div className="bg-[#171724] border-2 border-[#d4af37] rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-[#d4af37]/10 hover:shadow-[#d4af37]/20 transition-all">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            Được Yêu Thích Nhất
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-1">
              <span className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <Moon className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider">
                Lãng Mạn
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-cinzel mb-1">
              Gói Qua Đêm
            </h3>
            <p className="text-xs text-[#b0b0c2] font-light mb-4">
              Khung giờ check-in từ 20:00 tối đến 11:00 sáng hôm sau. Không gian riêng tư ngọt ngào bên người ấy.
            </p>

            <div className="mb-6 pb-4 border-b border-[#2e2e42]">
              <div className="text-xs text-[#a0a0b2]">Giá từ</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-bold text-[#d4af37]">660.000đ</span>
                <span className="text-xs text-[#a0a0b2]">/ đêm</span>
              </div>
              <div className="text-[11px] text-[#e0cfab] mt-1 font-medium">
                Check-in: 20:00 · Check-out: 11:00 hôm sau
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#dedee8] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Trải nghiệm rạp chiếu phim đêm ấm áp</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Bồn tắm ngâm thư giãn không giới hạn</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Hỗ trợ đặt setup nến hoa lãng mạn</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Không làm phiền, bảo mật tối đa</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPackage('overnight')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer"
          >
            Đặt Gói Qua Đêm
          </button>
        </div>

        {/* Package 3: Daily */}
        <div className="bg-[#14141c] border border-[#272737] rounded-2xl p-6 flex flex-col justify-between hover:border-[#d4af37]/50 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#1e1e2c] border border-[#2e2e40] flex items-center justify-center text-[#d4af37]">
                <Sun className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold text-[#8f8fa0] uppercase tracking-wider">
                Trọn Gói 24h
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-cinzel mb-1">
              Gói Cả Ngày Đêm
            </h3>
            <p className="text-xs text-[#9d9dae] font-light mb-4">
              Check-in từ 14:00 chiều hôm trước đến 12:00 trưa hôm sau. Tận hưởng trọn vẹn mọi khoảnh khắc.
            </p>

            <div className="mb-6 pb-4 border-b border-[#222230]">
              <div className="text-xs text-[#8c8c9c]">Giá từ</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-bold text-[#d4af37]">860.000đ</span>
                <span className="text-xs text-[#7e7e90]">/ ngày đêm</span>
              </div>
              <div className="text-[11px] text-[#8e8e9e] mt-1">
                Check-in: 14:00 · Check-out: 12:00 hôm sau
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#c5c5d4] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Thời gian lưu trú dài và thoải mái nhất</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Tự do ra vào bằng mật mã smartlock</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Có thể nấu ăn tự do (đối với phòng có bếp)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Đỗ xe ô tô an toàn miễn phí 24/24</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPackage('daily')}
            className="w-full py-2.5 rounded-xl bg-[#20202e] hover:bg-[#2b2b3d] text-white hover:text-[#d4af37] border border-[#313144] font-semibold text-xs transition-colors cursor-pointer"
          >
            Chọn Gói Cả Ngày
          </button>
        </div>
      </div>

      {/* Add-on Services (Setup & Wine) */}
      <div className="bg-[#121219] border border-[#262635] rounded-3xl p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Heart className="w-3.5 h-3.5" /> Dịch Vụ Bí Mật
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              GÓI SETUP KỶ NIỆM & HẸN HÒ BẤT NGỜ
            </h3>
            <p className="text-xs sm:text-sm text-[#9e9eaf] font-light mt-1">
              Tạo sự bất ngờ cho nửa kia của bạn. Bạn chỉ cần bước vào phòng, mọi thứ lãng mạn đã sẵn sàng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADDON_SERVICES.map((addon) => (
            <div
              key={addon.id}
              className="bg-[#191924] border border-[#2b2b3d] rounded-xl overflow-hidden flex flex-col justify-between group hover:border-[#d4af37]/60 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={addon.image}
                  alt={addon.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191924] via-transparent to-transparent" />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[11px] font-bold text-[#d4af37] font-cinzel">
                  +{addon.price.toLocaleString('vi-VN')}đ
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-xs font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors line-clamp-1">
                  {addon.name}
                </h4>
                <p className="text-[11px] text-[#9393a5] font-light leading-relaxed line-clamp-2 mb-3">
                  {addon.description}
                </p>
                <div className="mt-auto text-[10px] text-[#78788a] flex items-center justify-between border-t border-[#232332] pt-2">
                  <span>Đặt cùng phòng</span>
                  <span className="text-[#d4af37] font-medium">Tích chọn ở bước đặt phòng</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
