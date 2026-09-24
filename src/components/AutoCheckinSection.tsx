import React, { useState } from 'react';
import { ShieldCheck, KeyRound, Smartphone, Lock, CheckCircle2, ArrowRight, Sparkles, Wifi } from 'lucide-react';
import { CHECKIN_STEPS } from '../data/services';

interface AutoCheckinSectionProps {
  onOpenLookupModal: () => void;
}

export const AutoCheckinSection: React.FC<AutoCheckinSectionProps> = ({ onOpenLookupModal }) => {
  const [demoPinActive, setDemoPinActive] = useState(false);
  const [simulatedCode, setSimulatedCode] = useState('852901');

  return (
    <section id="auto-checkin" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#14141d] to-[#0c0c11] border border-[#272737] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hệ Thống Độc Bản 007 Concept</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide mb-3">
            TỰ ĐỘNG CHECK-IN 100% · KHÔNG LỄ TÂN
          </h2>
          <p className="text-[#a6a6b8] text-sm sm:text-base font-light leading-relaxed">
            Tại 007 Staycation, bạn không cần phải chờ đợi thủ tục rườm rà tại quầy lễ tân. Mọi thứ vận hành hoàn toàn tự động thông qua khóa số bảo mật Smartlock, đảm bảo sự riêng tư tuyệt đối cho kỳ nghỉ của bạn.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CHECKIN_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-[#181824] border border-[#2b2b3b] hover:border-[#d4af37]/50 rounded-2xl p-6 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-2xl font-bold text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#20202e] flex items-center justify-center text-[#d4af37]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9d9dae] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feature Demo Box */}
        <div className="bg-[#101017] border border-[#2a2a3a] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#d4af37]/15 text-[#d4af37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trải Nghiệm Thực Tế Khi Đến Homestay</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel">
              Bạn Đã Đặt Phòng Tại 007?
            </h3>
            <p className="text-xs sm:text-sm text-[#a4a4b5] font-light leading-relaxed">
              Chỉ cần nhập Mã Đặt Phòng (hoặc Số Điện Thoại), hệ thống sẽ lập tức hiển thị mật khẩu mở khóa cửa smartlock, mật khẩu wifi và video hướng dẫn vào phòng.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenLookupModal}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Tra Cứu Mật Khóa Cửa Của Bạn</span>
              </button>
            </div>
          </div>

          {/* Interactive Smartlock Simulation Teaser */}
          <div className="w-full max-w-xs bg-[#171722] border border-[#323246] rounded-2xl p-5 shadow-2xl text-center">
            <div className="flex items-center justify-between text-xs text-[#9090a0] mb-3 pb-2 border-b border-[#252536]">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" /> Smartlock 007
              </span>
              <span className="text-[#34d399] font-medium text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span> Sẵn sàng
              </span>
            </div>

            {/* Smartlock Pin Screen */}
            <div className="bg-black/70 border border-[#2c2c3e] rounded-xl p-3 mb-4">
              <div className="text-[10px] uppercase tracking-wider text-[#7e7e90] mb-1">
                Mật Mã Mở Khóa Mẫu
              </div>
              <div className="font-mono text-2xl font-bold tracking-[0.3em] text-[#d4af37]">
                {demoPinActive ? simulatedCode : '••••••'}
              </div>
            </div>

            <button
              onClick={() => {
                setDemoPinActive(!demoPinActive);
                if (!demoPinActive) {
                  setSimulatedCode(Math.floor(100000 + Math.random() * 900000).toString());
                }
              }}
              className="w-full py-2 px-3 rounded-lg bg-[#232332] hover:bg-[#2c2c3e] text-xs font-medium text-[#dcdce8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{demoPinActive ? 'Ẩn mã số' : 'Thử tạo mã ngẫu nhiên'}</span>
            </button>

            <p className="text-[10px] text-[#717180] mt-3">
              Mỗi vị khách nhận 01 mật mã riêng biệt tự động thu hồi khi hết giờ lưu trú.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
