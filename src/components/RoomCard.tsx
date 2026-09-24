import React from 'react';
import { Bath, Tv, Utensils, Sunset, Users, Maximize2, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Room, StayType } from '../types';

interface RoomCardProps {
  room: Room;
  selectedStayType: StayType;
  onViewDetails: (room: Room) => void;
  onBookNow: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  selectedStayType,
  onViewDetails,
  onBookNow,
}) => {
  // Format price based on current stay type
  const getPriceDisplay = () => {
    switch (selectedStayType) {
      case 'hourly':
        return {
          amount: room.price.hourly3h.toLocaleString('vi-VN') + 'đ',
          unit: '/ Gói 3 Giờ',
          sub: `Giờ tiếp theo: +${room.price.extraHourly.toLocaleString('vi-VN')}đ/h`,
        };
      case 'overnight':
        return {
          amount: room.price.overnight.toLocaleString('vi-VN') + 'đ',
          unit: '/ Qua Đêm (20h - 11h)',
          sub: 'Check-in từ 20:00, check-out trước 11:00',
        };
      case 'daily':
        return {
          amount: room.price.daily.toLocaleString('vi-VN') + 'đ',
          unit: '/ Ngày Đêm (14h - 12h)',
          sub: 'Check-in từ 14:00, check-out trước 12:00',
        };
    }
  };

  const pricing = getPriceDisplay();

  return (
    <div className="group bg-[#13131a] border border-[#262633] hover:border-[#d4af37]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300 flex flex-col h-full">
      {/* Room Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1c1c24] cursor-pointer" onClick={() => onViewDetails(room)}>
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-black/20 to-transparent" />

        {/* Room Code Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[#f5ebd2] font-cinzel text-xs font-bold px-2.5 py-1 rounded-md tracking-wider shadow-md">
          {room.code}
        </div>

        {/* Popular / Signature tag */}
        {room.isPopular && (
          <div className="absolute top-3 right-3 bg-[#d4af37] text-black text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Nổi Bật</span>
          </div>
        )}

        {/* Branch location tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#d8d8e4]">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#e0e0ea]">
            <MapPin className="w-3 h-3 text-[#d4af37]" />
            <span className="truncate max-w-[200px]">{room.branchName}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#e0e0ea]">
            <Users className="w-3 h-3 text-[#d4af37]" />
            <span>2 khách</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name and Tagline */}
        <div className="mb-3">
          <h3
            onClick={() => onViewDetails(room)}
            className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            {room.name}
          </h3>
          <p className="text-xs text-[#a0a0b2] line-clamp-2 mt-1 font-light leading-relaxed">
            {room.shortDesc}
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] text-[#c0c0d0]">
          {room.hasBathtub && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c1c27] border border-[#2d2d3d]">
              <Bath className="w-3 h-3 text-[#d4af37]" /> Bồn tắm chill
            </span>
          )}
          {room.hasProjector && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c1c27] border border-[#2d2d3d]">
              <Tv className="w-3 h-3 text-[#d4af37]" /> Máy chiếu 4K
            </span>
          )}
          {room.hasKitchen && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c1c27] border border-[#2d2d3d]">
              <Utensils className="w-3 h-3 text-[#d4af37]" /> Bếp nấu mini
            </span>
          )}
          {room.hasBalcony && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c1c27] border border-[#2d2d3d]">
              <Sunset className="w-3 h-3 text-[#d4af37]" /> Ban công view
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c1c27] border border-[#2d2d3d]">
            <Maximize2 className="w-3 h-3 text-[#d4af37]" /> {room.area}m²
          </span>
        </div>

        {/* Spacer */}
        <div className="mt-auto pt-4 border-t border-[#232330] flex items-end justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-bold text-[#d4af37] font-cinzel">
                {pricing.amount}
              </span>
              <span className="text-[11px] text-[#9393a5]">{pricing.unit}</span>
            </div>
            <p className="text-[10px] text-[#78788a] truncate max-w-[190px]">{pricing.sub}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(room)}
              className="p-2 rounded-lg bg-[#1c1c27] hover:bg-[#282838] text-[#c0c0d2] hover:text-white transition-colors text-xs font-medium cursor-pointer"
              title="Xem ảnh & chi tiết phòng"
            >
              Chi tiết
            </button>
            <button
              onClick={() => onBookNow(room)}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#d4af37]/20 active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>Đặt ngay</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
