import React, { useState } from 'react';
import { X, Search, KeyRound, Wifi, MapPin, Copy, Check, ShieldCheck, Lock, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { ROOMS } from '../data/rooms';

interface SelfCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentBookingCode?: string;
}

export const SelfCheckinModal: React.FC<SelfCheckinModalProps> = ({
  isOpen,
  onClose,
  recentBookingCode,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(recentBookingCode || '');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<{
    code: string;
    roomName: string;
    branch: string;
    pin: string;
    wifiName: string;
    wifiPass: string;
    status: string;
    checkInTime: string;
    checkOutTime: string;
    guide: string;
  } | null>(
    recentBookingCode
      ? {
          code: recentBookingCode,
          roomName: 'Mission 001 · GoldenEye Secret',
          branch: '40 Trần Quốc Toản, Phường Long Hương, TP. Bà Rịa',
          pin: '852901#',
          wifiName: '007_STAYCATION_5G',
          wifiPass: '007staycation',
          status: 'Đã sẵn sàng mở cửa',
          checkInTime: 'Hôm nay',
          checkOutTime: 'Hôm sau',
          guide: 'Chạm tay vào bàn phím số trên khóa để sáng đèn, nhập mật mã 852901 rồi nhấn phím # để mở cửa.',
        }
      : null
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Vui lòng nhập mã đặt phòng hoặc số điện thoại');
      return;
    }

    // Lookup or generate dynamic realistic record for demo / real booking
    const randomRoom = ROOMS[Math.floor(Math.random() * ROOMS.length)];
    const mockPin = Math.floor(100000 + Math.random() * 900000) + '#';

    setSearchResult({
      code: clean.startsWith('007') ? clean : `007-${clean.slice(-4)}`,
      roomName: `${randomRoom.code} · ${randomRoom.name}`,
      branch: randomRoom.branchAddress,
      pin: mockPin,
      wifiName: '007_STAYCATION_5G',
      wifiPass: '007staycation',
      status: 'Hệ thống Smartlock sẵn sàng',
      checkInTime: '14:00',
      checkOutTime: '12:00 hôm sau',
      guide: `Chạm tay vào màn hình cảm ứng để kích hoạt bàn phím khóa số. Nhập chuỗi mật khẩu ${mockPin} rồi nhấn nút #. Chờ đèn xanh kêu bíp và đẩy nhẹ cửa vào phòng.`,
    });
  };

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const loadDemoCode = () => {
    setInputCode('007-MS01-8924');
    setErrorMsg('');
    setSearchResult({
      code: '007-MS01-8924',
      roomName: 'Mission 001 · GoldenEye Secret',
      branch: '40 Trần Quốc Toản, Phường Long Hương, TP. Bà Rịa',
      pin: '394812#',
      wifiName: '007_STAYCATION_5G',
      wifiPass: '007staycation',
      status: 'Hệ thống Smartlock sẵn sàng',
      checkInTime: 'Đang mở cửa',
      checkOutTime: '12:00',
      guide: 'Chạm tay vào mặt kính khóa số để đánh thức màn hình led. Nhập 394812 rồi nhấn phím #. Cửa mở tự động trong 5 giây.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-[#111116] border border-[#2e2e3f] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#21212c] bg-[#14141c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-cinzel">
                Lấy Mật Mã Khóa Cửa Tự Động
              </h2>
              <p className="text-[11px] text-[#9393a5]">
                Hệ thống nhận mã số phòng 100% không qua lễ tân
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888899] hover:text-white bg-[#1a1a23] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Lookup Input Form */}
          <form onSubmit={handleLookup} className="space-y-3">
            <label className="text-xs font-semibold text-[#c0c0d2] block">
              Nhập Mã Đặt Phòng (hoặc Số Điện Thoại Đã Đặt)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Ví dụ: 007-MS01-8924 hoặc 0989..."
                  className="w-full bg-[#181822] border border-[#323246] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#e4bd47] text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Tra cứu</span>
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-between text-[11px] text-[#808092] pt-1">
              <span>Chưa có mã? Thử nghiệm xem hệ thống hoạt động:</span>
              <button
                type="button"
                onClick={loadDemoCode}
                className="text-[#d4af37] hover:underline font-medium cursor-pointer"
              >
                Nhập mã Demo mẫu
              </button>
            </div>
          </form>

          {/* Search Result Card */}
          {searchResult && (
            <div className="bg-[#161622] border border-[#d4af37]/30 rounded-2xl p-5 space-y-5 shadow-xl animate-in zoom-in-95 duration-200">
              {/* Room & Status */}
              <div className="flex items-start justify-between gap-3 border-b border-[#252536] pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                    Mã Booking: {searchResult.code}
                  </div>
                  <h3 className="text-base font-bold text-white font-cinzel mt-0.5">
                    {searchResult.roomName}
                  </h3>
                  <p className="text-xs text-[#9d9dae] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    {searchResult.branch}
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                  {searchResult.status}
                </span>
              </div>

              {/* Secret Smartlock PIN display */}
              <div className="bg-black/60 border border-[#343449] rounded-xl p-4 text-center relative overflow-hidden">
                <div className="text-xs text-[#8f8f9e] uppercase tracking-wider mb-1">
                  Mật Khẩu Mở Khóa Cửa (Smartlock Pin)
                </div>
                <div className="font-mono text-3xl font-extrabold tracking-[0.25em] text-[#d4af37] my-2">
                  {searchResult.pin}
                </div>
                <button
                  onClick={() => handleCopy(searchResult.pin, 'pin')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#252536] hover:bg-[#323246] text-xs text-[#e0e0ea] transition-colors cursor-pointer"
                >
                  {copiedKey === 'pin' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mật mã</span>
                    </>
                  )}
                </button>
              </div>

              {/* Wifi & Parking Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#1d1d2b] p-3 rounded-xl border border-[#2d2d40]">
                  <div className="text-[#8e8e9e] flex items-center gap-1.5 mb-1">
                    <Wifi className="w-3.5 h-3.5 text-[#d4af37]" /> Wifi tốc độ cao
                  </div>
                  <div className="font-medium text-white">{searchResult.wifiName}</div>
                  <div className="text-[#a4a4b6] text-[11px] flex items-center justify-between mt-1">
                    <span>Pass: {searchResult.wifiPass}</span>
                    <button
                      onClick={() => handleCopy(searchResult.wifiPass, 'wifi')}
                      className="text-[#d4af37] hover:underline"
                    >
                      {copiedKey === 'wifi' ? 'Đã chép' : 'Chép pass'}
                    </button>
                  </div>
                </div>

                <div className="bg-[#1d1d2b] p-3 rounded-xl border border-[#2d2d40]">
                  <div className="text-[#8e8e9e] flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Thời gian lưu trú
                  </div>
                  <div className="font-medium text-white">
                    Check-in: {searchResult.checkInTime}
                  </div>
                  <div className="text-[#a4a4b6] text-[11px]">
                    Check-out: {searchResult.checkOutTime}
                  </div>
                </div>
              </div>

              {/* Door Opening Step Guide */}
              <div className="bg-[#1b1b26] p-3.5 rounded-xl border border-[#2c2c3e] text-xs text-[#bebecd] leading-relaxed">
                <div className="font-semibold text-white mb-1">Hướng dẫn thao tác tại cửa:</div>
                <p>{searchResult.guide}</p>
              </div>
            </div>
          )}

          {/* Need help footer */}
          <div className="pt-2 border-t border-[#20202c] flex flex-wrap items-center justify-between text-xs text-[#8c8c9e] gap-2">
            <span>Cần trợ giúp khẩn cấp tại chỗ?</span>
            <a
              href="tel:0899772567"
              className="text-[#d4af37] font-semibold flex items-center gap-1 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              Hotline: 0899 772 567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
