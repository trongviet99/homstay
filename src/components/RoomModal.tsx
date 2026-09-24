import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Bath, Tv, Utensils, Sunset, Maximize2, Users, Check, ShieldCheck, MapPin, CalendarCheck, Phone } from 'lucide-react';
import { Room } from '../types';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onBookRoom }) => {
  if (!room) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-[#111116] border border-[#2d2d3c] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl shadow-black">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222e] bg-[#14141c]">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-sm font-bold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 px-2.5 py-1 rounded">
              {room.code}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-cinzel">{room.name}</h2>
              <p className="text-xs text-[#a0a0b2] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                {room.branchAddress}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9999a8] hover:text-white bg-[#1d1d27] rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Gallery View */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-black/50">
            <img
              src={room.images[activeImageIndex]}
              alt={`${room.name} photo ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-xs px-2.5 py-1 rounded-md text-white">
              {activeImageIndex + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#d4af37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Room Highlights & Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#181822] p-3.5 rounded-xl border border-[#2a2a38]">
              <div className="text-xs text-[#8c8c9e] flex items-center gap-1.5 mb-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" /> Diện tích
              </div>
              <div className="text-sm font-semibold text-white">{room.area} m²</div>
            </div>

            <div className="bg-[#181822] p-3.5 rounded-xl border border-[#2a2a38]">
              <div className="text-xs text-[#8c8c9e] flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Sức chứa
              </div>
              <div className="text-sm font-semibold text-white">2 người (tối đa 3)</div>
            </div>

            <div className="bg-[#181822] p-3.5 rounded-xl border border-[#2a2a38]">
              <div className="text-xs text-[#8c8c9e] flex items-center gap-1.5 mb-1">
                <Bath className="w-3.5 h-3.5 text-[#d4af37]" /> Phòng tắm
              </div>
              <div className="text-sm font-semibold text-white">Bồn tắm thư giãn</div>
            </div>

            <div className="bg-[#181822] p-3.5 rounded-xl border border-[#2a2a38]">
              <div className="text-xs text-[#8c8c9e] flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Check-in
              </div>
              <div className="text-sm font-semibold text-white">100% Khóa số tự động</div>
            </div>
          </div>

          {/* Detailed Story & Concept */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white font-cinzel">Ý Niệm & Không Gian</h3>
            <p className="text-sm text-[#b8b8c8] font-light leading-relaxed whitespace-pre-line">
              {room.description}
            </p>
          </div>

          {/* Key Features list */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white font-cinzel">Trang Bị & Điểm Nổi Bật</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#d1d1dc]">
                  <Check className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Pricing Table */}
          <div className="bg-[#171722] border border-[#2e2e3e] rounded-xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Bảng Giá Khung Giờ Áp Dụng</span>
              <span className="text-xs text-[#d4af37] font-normal lowercase">Đã bao gồm VAT & wifi miễn phí</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#121218] p-3.5 rounded-lg border border-[#262634]">
                <span className="text-xs text-[#8e8e9e] block mb-1">Gói Theo Giờ (3h)</span>
                <span className="text-lg font-bold text-[#d4af37] font-cinzel">
                  {room.price.hourly3h.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-[11px] text-[#707080] block mt-1">
                  Giờ kế tiếp: +{room.price.extraHourly.toLocaleString('vi-VN')}đ/h
                </span>
              </div>

              <div className="bg-[#121218] p-3.5 rounded-lg border border-[#d4af37]/40 relative">
                <div className="absolute -top-2 right-2 bg-[#d4af37] text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                  Hot
                </div>
                <span className="text-xs text-[#d4af37] font-medium block mb-1">Gói Qua Đêm</span>
                <span className="text-lg font-bold text-[#d4af37] font-cinzel">
                  {room.price.overnight.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-[11px] text-[#858595] block mt-1">
                  Check-in 20:00 → Check-out 11:00
                </span>
              </div>

              <div className="bg-[#121218] p-3.5 rounded-lg border border-[#262634]">
                <span className="text-xs text-[#8e8e9e] block mb-1">Gói Cả Ngày Đêm</span>
                <span className="text-lg font-bold text-[#d4af37] font-cinzel">
                  {room.price.daily.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-[11px] text-[#707080] block mt-1">
                  Check-in 14:00 → Check-out 12:00
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#888898] italic">
              * Khách thứ 3 phụ thu 70.000đ/người. Nghiêm cấm hút thuốc & vape trong phòng.
            </p>
          </div>
        </div>

        {/* Modal Footer / Direct CTA */}
        <div className="p-4 sm:p-5 border-t border-[#22222e] bg-[#14141c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href="tel:0899772567"
              className="px-3.5 py-2.5 rounded-lg bg-[#1e1e29] hover:bg-[#282838] text-xs font-medium text-[#c0c0d0] flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Tư vấn: 0899 772 567</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookRoom(room);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e2bf4b] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Tiến Hành Đặt Phòng Này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
