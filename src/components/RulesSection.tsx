import React from 'react';
import { ShieldAlert, Ban, UserCheck, Users, Clock, Flame, Sparkles, AlertTriangle } from 'lucide-react';
import { STAY_RULES } from '../data/services';

export const RulesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#d4af37]" />;
      case 'Ban':
        return <Ban className="w-5 h-5 text-red-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#d4af37]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#d4af37]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <section id="rules" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#121219] border border-[#272738] rounded-3xl p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Chính Sách & Quy Định Bắt Buộc</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
            NỘI QUY LƯU TRÚ TẠI 007
          </h2>
          <p className="text-[#9e9eaf] text-sm max-w-2xl mt-3 font-light">
            Nhằm đảm bảo trải nghiệm nghỉ ngơi chất lượng cao, sạch sẽ và an toàn tuyệt đối cho mọi vị khách, 007 Staycation áp dụng các nguyên tắc lưu trú văn minh.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {STAY_RULES.map((rule) => (
            <div
              key={rule.id}
              className={`p-5 rounded-2xl border transition-all ${
                rule.critical
                  ? 'bg-[#1b1419] border-red-900/40 hover:border-red-500/50'
                  : 'bg-[#171722] border-[#29293a] hover:border-[#d4af37]/40'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    rule.critical ? 'bg-red-950/60 border border-red-800/40' : 'bg-[#222230] border border-[#323246]'
                  }`}
                >
                  {getIcon(rule.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-cinzel">{rule.title}</h3>
                  <span
                    className={`text-[11px] font-medium ${
                      rule.critical ? 'text-red-300' : 'text-[#d4af37]'
                    }`}
                  >
                    {rule.short}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#9d9dae] leading-relaxed font-light">{rule.desc}</p>
            </div>
          ))}
        </div>

        {/* Warning banner */}
        <div className="bg-[#191924] border border-[#303042] rounded-xl p-4 flex items-start gap-3 text-xs text-[#c0c0cf]">
          <AlertTriangle className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
          <p>
            <strong>Lưu ý về đăng ký tạm trú:</strong> Theo quy định của chính quyền địa phương đối với mô hình lưu trú tự động, khách hàng cần cung cấp ảnh chụp CCCD/Hộ chiếu hợp lệ trước khi hệ thống cấp mã mở cửa phòng. Thông tin của quý khách được cam kết bảo mật 100%.
          </p>
        </div>
      </div>
    </section>
  );
};
