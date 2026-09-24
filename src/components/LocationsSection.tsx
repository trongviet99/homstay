import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Car, Clock, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data/rooms';

export const LocationsSection: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<'branch-1' | 'branch-2'>('branch-1');

  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Hệ Thống 2 Cơ Sở Tại Bà Rịa</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          VỊ TRÍ & HƯỚNG DẪN ĐƯỜNG ĐI
        </h2>
        <p className="text-[#a4a4b6] text-sm max-w-2xl mt-3 font-light">
          Cả 2 chi nhánh đều nằm tại vị trí thuận lợi ở trung tâm TP. Bà Rịa, cách bãi biển Vũng Tàu chỉ 20 phút chạy xe và cách TP.HCM khoảng 1 giờ 30 phút.
        </p>
      </div>

      {/* Branch Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        {BRANCHES.map((branch) => (
          <button
            key={branch.id}
            onClick={() => setActiveBranchId(branch.id)}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeBranchId === branch.id
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
                : 'bg-[#161622] text-[#9d9dae] hover:text-white border border-[#2b2b3c]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{branch.name}</span>
          </button>
        ))}
      </div>

      {/* Branch Detail & Map Card */}
      <div className="bg-[#121219] border border-[#272738] rounded-3xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Branch Info Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
              {activeBranch.shortName}
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {activeBranch.name}
            </h3>
            <p className="text-sm text-[#b8b8c8] font-light mt-2 leading-relaxed">
              {activeBranch.description}
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#d0d0dc]">
            <div className="flex items-start gap-3 bg-[#181824] p-3.5 rounded-xl border border-[#2a2a3b]">
              <MapPin className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Địa chỉ chính xác:</span>
                <span className="text-[#a4a4b5]">{activeBranch.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#181824] p-3.5 rounded-xl border border-[#2a2a3b]">
              <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Hotline đặt phòng & hỗ trợ:</span>
                <a href="tel:0899772567" className="text-[#d4af37] font-semibold hover:underline">
                  {activeBranch.hotline}
                </a>{' '}
                (Hỗ trợ 24/7 qua Zalo)
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {activeBranch.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#171722] border border-[#262635] p-2.5 rounded-lg text-[#c5c5d5] flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Travel Estimates */}
          <div className="pt-2 border-t border-[#232332] grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#161622] p-2 rounded-lg">
              <span className="text-[10px] text-[#808092] block">Từ TP.HCM</span>
              <span className="font-bold text-white">~90 Phút</span>
            </div>
            <div className="bg-[#161622] p-2 rounded-lg">
              <span className="text-[10px] text-[#808092] block">Tới TP Vũng Tàu</span>
              <span className="font-bold text-white">~20 Phút</span>
            </div>
            <div className="bg-[#161622] p-2 rounded-lg">
              <span className="text-[10px] text-[#808092] block">Check-in</span>
              <span className="font-bold text-[#d4af37]">Tự Động 24/7</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              activeBranch.mapQuery
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#222230] hover:bg-[#2e2e42] text-white hover:text-[#d4af37] border border-[#37374c] text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Navigation className="w-4 h-4 text-[#d4af37]" />
            <span>Mở Bản Đồ Google Maps Chỉ Đường</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Map Visual Right Column */}
        <div className="lg:col-span-6 h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2d2d3e] relative bg-[#1c1c28]">
          <iframe
            title={`Bản đồ ${activeBranch.name}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              activeBranch.mapQuery
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[120%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#2d2d3e] text-xs text-white">
            <span className="text-[#d4af37] font-semibold">{activeBranch.shortName}</span> · 007 Staycation
          </div>
        </div>
      </div>
    </section>
  );
};
