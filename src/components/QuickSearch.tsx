import React from 'react';
import { MapPin, Clock, Calendar, Users, Search } from 'lucide-react';
import { BranchId, StayType } from '../types';

interface QuickSearchProps {
  selectedBranch: BranchId | 'all';
  setSelectedBranch: (val: BranchId | 'all') => void;
  selectedStayType: StayType;
  setSelectedStayType: (val: StayType) => void;
  checkInDate: string;
  setCheckInDate: (val: string) => void;
  guestsCount: number;
  setGuestsCount: (val: number) => void;
  onSearch: () => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  selectedBranch,
  setSelectedBranch,
  selectedStayType,
  setSelectedStayType,
  checkInDate,
  setCheckInDate,
  guestsCount,
  setGuestsCount,
  onSearch,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-[#131318]/90 backdrop-blur-xl border border-[#2b2b38] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Branch */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#a8a8b8] flex items-center gap-1.5 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Chi Nhánh Bà Rịa</span>
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value as BranchId | 'all')}
            className="w-full bg-[#1b1b24] border border-[#323242] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
          >
            <option value="all">Tất cả chi nhánh (8 Missions)</option>
            <option value="branch-1">CN1: 40 Trần Quốc Toản (Long Hương)</option>
            <option value="branch-2">CN2: 51 Nguyễn Thị Minh Khai (Phước Hiệp)</option>
          </select>
        </div>

        {/* Stay Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#a8a8b8] flex items-center gap-1.5 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Hình Thức Lưu Trú</span>
          </label>
          <select
            value={selectedStayType}
            onChange={(e) => setSelectedStayType(e.target.value as StayType)}
            className="w-full bg-[#1b1b24] border border-[#323242] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
          >
            <option value="hourly">Nghỉ Theo Giờ (3 Giờ chill)</option>
            <option value="overnight">Qua Đêm (20:00 - 11:00)</option>
            <option value="daily">Cả Ngày Đêm (14:00 - 12:00)</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#a8a8b8] flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Ngày Nhận Phòng</span>
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full bg-[#1b1b24] border border-[#323242] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer scheme-dark"
          />
        </div>

        {/* Guests & Action */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#a8a8b8] flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Số Khách (Max 3)</span>
          </label>
          <div className="flex items-center gap-2">
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-1/2 bg-[#1b1b24] border border-[#323242] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer appearance-none text-center"
            >
              <option value={1}>1 Khách</option>
              <option value={2}>2 Khách (Tiêu chuẩn)</option>
              <option value={3}>3 Khách (+70k)</option>
            </select>
            <button
              onClick={onSearch}
              className="w-1/2 bg-gradient-to-r from-[#d4af37] to-[#b88e28] hover:from-[#e2bf4b] hover:to-[#c89c32] text-black font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer h-[42px]"
            >
              <Search className="w-4 h-4" />
              <span>Tìm Phòng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
