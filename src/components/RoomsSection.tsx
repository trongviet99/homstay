import React, { useState } from 'react';
import { Room, BranchId, StayType } from '../types';
import { RoomCard } from './RoomCard';
import { Sparkles, Filter, Bath, Tv, Utensils, Sunset, Check } from 'lucide-react';

interface RoomsSectionProps {
  rooms: Room[];
  selectedBranch: BranchId | 'all';
  setSelectedBranch: (val: BranchId | 'all') => void;
  selectedStayType: StayType;
  setSelectedStayType: (val: StayType) => void;
  onViewDetails: (room: Room) => void;
  onBookNow: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  rooms,
  selectedBranch,
  setSelectedBranch,
  selectedStayType,
  setSelectedStayType,
  onViewDetails,
  onBookNow,
}) => {
  const [featureFilter, setFeatureFilter] = useState<'all' | 'bathtub' | 'projector' | 'kitchen' | 'balcony'>('all');

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    if (selectedBranch !== 'all' && r.branchId !== selectedBranch) return false;
    if (featureFilter === 'bathtub' && !r.hasBathtub) return false;
    if (featureFilter === 'projector' && !r.hasProjector) return false;
    if (featureFilter === 'kitchen' && !r.hasKitchen) return false;
    if (featureFilter === 'balcony' && !r.hasBalcony) return false;
    return true;
  });

  return (
    <section id="rooms" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Danh Sách 8 Missions Độc Quyền</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          BỘ SƯU TẬP PHÒNG NGHỈ
        </h2>
        <p className="text-[#a1a1b3] text-sm max-w-2xl mt-3 font-light">
          Mỗi căn phòng là một mật lệnh độc lập được thiết kế kỳ công, sở hữu bồn tắm riêng biệt, máy chiếu rạp phim tại gia và hệ thống mật mã số tự động hoàn toàn.
        </p>
      </div>

      {/* Control Bar: Branch Segmented Control & Stay Type Switcher */}
      <div className="space-y-4 mb-8">
        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedBranch('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedBranch === 'all'
                ? 'bg-[#d4af37] text-black font-semibold shadow-md shadow-[#d4af37]/20'
                : 'bg-[#181822] text-[#adadb8] hover:text-white border border-[#2b2b3a]'
            }`}
          >
            Tất Cả Chi Nhánh ({rooms.length})
          </button>

          <button
            onClick={() => setSelectedBranch('branch-1')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedBranch === 'branch-1'
                ? 'bg-[#d4af37] text-black font-semibold shadow-md shadow-[#d4af37]/20'
                : 'bg-[#181822] text-[#adadb8] hover:text-white border border-[#2b2b3a]'
            }`}
          >
            Chi Nhánh 1 · 40 Trần Quốc Toản
          </button>

          <button
            onClick={() => setSelectedBranch('branch-2')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedBranch === 'branch-2'
                ? 'bg-[#d4af37] text-black font-semibold shadow-md shadow-[#d4af37]/20'
                : 'bg-[#181822] text-[#adadb8] hover:text-white border border-[#2b2b3a]'
            }`}
          >
            Chi Nhánh 2 · 51 Nguyễn Thị Minh Khai
          </button>
        </div>

        {/* Stay Type & Amenity Sub-filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#13131a] p-3 rounded-2xl border border-[#252533]">
          {/* Quick Stay Type Segmented Tabs */}
          <div className="flex items-center gap-1 bg-[#0c0c10] p-1 rounded-xl border border-[#23232e]">
            <button
              onClick={() => setSelectedStayType('hourly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedStayType === 'hourly'
                  ? 'bg-[#252533] text-[#f2e5c8] shadow-sm'
                  : 'text-[#9595a5] hover:text-white'
              }`}
            >
              Gói Giờ (3h)
            </button>
            <button
              onClick={() => setSelectedStayType('overnight')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedStayType === 'overnight'
                  ? 'bg-[#252533] text-[#f2e5c8] shadow-sm'
                  : 'text-[#9595a5] hover:text-white'
              }`}
            >
              Qua Đêm (20h-11h)
            </button>
            <button
              onClick={() => setSelectedStayType('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedStayType === 'daily'
                  ? 'bg-[#252533] text-[#f2e5c8] shadow-sm'
                  : 'text-[#9595a5] hover:text-white'
              }`}
            >
              Cả Ngày Đêm (14h-12h)
            </button>
          </div>

          {/* Amenity pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setFeatureFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                featureFilter === 'all'
                  ? 'bg-[#272736] text-[#e8d5a8] font-medium'
                  : 'text-[#9090a0] hover:text-white'
              }`}
            >
              Tất cả tiện ích
            </button>
            <button
              onClick={() => setFeatureFilter('bathtub')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                featureFilter === 'bathtub'
                  ? 'bg-[#272736] text-[#e8d5a8] font-medium'
                  : 'text-[#9090a0] hover:text-white'
              }`}
            >
              <Bath className="w-3 h-3 text-[#d4af37]" /> Bồn tắm
            </button>
            <button
              onClick={() => setFeatureFilter('projector')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                featureFilter === 'projector'
                  ? 'bg-[#272736] text-[#e8d5a8] font-medium'
                  : 'text-[#9090a0] hover:text-white'
              }`}
            >
              <Tv className="w-3 h-3 text-[#d4af37]" /> Máy chiếu 4K
            </button>
            <button
              onClick={() => setFeatureFilter('kitchen')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                featureFilter === 'kitchen'
                  ? 'bg-[#272736] text-[#e8d5a8] font-medium'
                  : 'text-[#9090a0] hover:text-white'
              }`}
            >
              <Utensils className="w-3 h-3 text-[#d4af37]" /> Có bếp nấu
            </button>
            <button
              onClick={() => setFeatureFilter('balcony')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                featureFilter === 'balcony'
                  ? 'bg-[#272736] text-[#e8d5a8] font-medium'
                  : 'text-[#9090a0] hover:text-white'
              }`}
            >
              <Sunset className="w-3 h-3 text-[#d4af37]" /> Ban công
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              selectedStayType={selectedStayType}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#15151c] border border-[#272736] rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-sm">
            Không tìm thấy phòng phù hợp với bộ lọc đã chọn. Quý khách vui lòng thử chọn lại tiêu chí khác.
          </p>
          <button
            onClick={() => {
              setSelectedBranch('all');
              setFeatureFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs cursor-pointer"
          >
            Hiển thị lại tất cả 8 Missions
          </button>
        </div>
      )}
    </section>
  );
};
