import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, Users, ShieldCheck, Heart, Sparkles, AlertCircle, Copy, ArrowRight, ArrowLeft, Phone, QrCode } from 'lucide-react';
import { Room, StayType, AddonService, BookingDetails } from '../types';
import { ROOMS } from '../data/rooms';
import { ADDON_SERVICES } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: Room | null;
  preselectedStayType?: StayType;
  initialCheckInDate?: string;
  initialGuestsCount?: number;
  onBookingConfirmed: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
  preselectedStayType = 'overnight',
  initialCheckInDate,
  initialGuestsCount = 2,
  onBookingConfirmed,
}) => {
  if (!isOpen) return null;

  // Step management (1: Room & Time, 2: Addons, 3: Guest Info & Review, 4: Confirmed)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preselectedRoom ? preselectedRoom.id : ROOMS[0].id
  );
  const [stayType, setStayType] = useState<StayType>(preselectedStayType);
  const [checkInDate, setCheckInDate] = useState<string>(
    initialCheckInDate || new Date().toISOString().split('T')[0]
  );
  const [checkInTime, setCheckInTime] = useState<string>('20:00');
  const [guestsCount, setGuestsCount] = useState<number>(initialGuestsCount);

  // Addons state
  const [selectedAddons, setSelectedAddons] = useState<{ [id: string]: number }>({});

  // Customer information
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerIdentity, setCustomerIdentity] = useState('');
  const [notes, setNotes] = useState('');

  // Discount code
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'cash_arrival'>('vietqr');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Find active room object
  const activeRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Adjust default checkin time based on stay type
  useEffect(() => {
    if (stayType === 'overnight') {
      setCheckInTime('20:00');
    } else if (stayType === 'daily') {
      setCheckInTime('14:00');
    } else if (stayType === 'hourly') {
      setCheckInTime('13:00');
    }
  }, [stayType]);

  // Pricing calculation
  const getBasePrice = () => {
    switch (stayType) {
      case 'hourly':
        return activeRoom.price.hourly3h;
      case 'overnight':
        return activeRoom.price.overnight;
      case 'daily':
        return activeRoom.price.daily;
    }
  };

  const basePrice = getBasePrice();

  // Addons total
  const addonsPrice = Object.entries(selectedAddons).reduce((sum, [id, qty]) => {
    const item = ADDON_SERVICES.find((s) => s.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Extra guest surcharge (70,000 VND if 3 guests)
  const extraGuestSurcharge = guestsCount > 2 ? 70000 : 0;

  // Subtotal before discount
  const subtotal = basePrice + addonsPrice + extraGuestSurcharge;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const totalPrice = Math.max(0, subtotal - discountAmount);

  // Coupon apply
  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'STAY007' || code === '007VIP' || code === 'MISSION007') {
      setDiscountPercent(10);
      setCouponSuccess('Áp dụng thành công mã ưu đãi 10%!');
    } else {
      setCouponError('Mã không hợp lệ hoặc đã hết lượt dùng');
      setDiscountPercent(0);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const next = { ...prev };
      if (next[addonId]) {
        delete next[addonId];
      } else {
        next[addonId] = 1;
      }
      return next;
    });
  };

  // Submit and create booking
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const roomShortCode = activeRoom.code.replace('Mission ', 'MS').replace('007 ', '');
    const bookingCode = `007-${roomShortCode}-${randomSuffix}`;
    const generatedPin = Math.floor(100000 + Math.random() * 900000) + '#';

    // Calculate checkout details
    let checkOutDate = checkInDate;
    let checkOutTime = '12:00';
    if (stayType === 'overnight') {
      const d = new Date(checkInDate);
      d.setDate(d.getDate() + 1);
      checkOutDate = d.toISOString().split('T')[0];
      checkOutTime = '11:00';
    } else if (stayType === 'daily') {
      const d = new Date(checkInDate);
      d.setDate(d.getDate() + 1);
      checkOutDate = d.toISOString().split('T')[0];
      checkOutTime = '12:00';
    } else {
      // 3 hours later
      const hour = parseInt(checkInTime.split(':')[0]) + 3;
      checkOutTime = `${hour}:00`;
    }

    const addonList = Object.entries(selectedAddons).map(([id, qty]) => {
      const service = ADDON_SERVICES.find((s) => s.id === id)!;
      return { addon: service, quantity: qty };
    });

    const newBooking: BookingDetails = {
      bookingCode,
      room: activeRoom,
      stayType,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      guestsCount,
      customerName,
      customerPhone,
      customerIdentity: customerIdentity || 'Đăng ký sau khi nhận phòng',
      notes,
      selectedAddons: addonList,
      basePrice,
      addonsPrice,
      extraGuestSurcharge,
      discountAmount,
      totalPrice,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toLocaleString('vi-VN'),
      doorPinCode: generatedPin,
      wifiPassword: '007staycation',
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setStep(4);
  };

  const copyBookingCode = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-[#111117] border border-[#2d2d3e] rounded-2xl w-full max-w-3xl max-h-[94vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222f] bg-[#14141c]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-extrabold flex items-center justify-center text-xs">
              007
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-cinzel">
                {step === 4 ? 'Đặt Phòng Thành Công' : 'Đặt Phòng Trực Tuyến · 007 Staycation'}
              </h2>
              <p className="text-[11px] text-[#9a9ab0]">
                {step === 4
                  ? 'Mã phòng & mật khẩu khóa số đã sẵn sàng'
                  : `Bước ${step} / 3: ${
                      step === 1
                        ? 'Chọn Phòng & Thời Gian'
                        : step === 2
                        ? 'Dịch Vụ Lãng Mạn Đi Kèm'
                        : 'Thông Tin Khách & Thanh Toán'
                    }`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888899] hover:text-white bg-[#1a1a24] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {/* STEP 1: ROOM & TIME */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Select Room */}
              <div>
                <label className="text-xs font-semibold text-[#c0c0d2] block mb-2 uppercase tracking-wider">
                  Chọn Mission Phòng Nghỉ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {ROOMS.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRoomId(r.id)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        selectedRoomId === r.id
                          ? 'bg-[#20202e] border-[#d4af37] shadow-md shadow-[#d4af37]/10'
                          : 'bg-[#15151e] border-[#292938] hover:border-[#3d3d52]'
                      }`}
                    >
                      <img
                        src={r.images[0]}
                        alt={r.name}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-cinzel text-xs font-bold text-white truncate">
                            {r.code}
                          </span>
                          <span className="text-[11px] font-semibold text-[#d4af37]">
                            {stayType === 'hourly'
                              ? `${r.price.hourly3h.toLocaleString('vi-VN')}đ`
                              : stayType === 'overnight'
                              ? `${r.price.overnight.toLocaleString('vi-VN')}đ`
                              : `${r.price.daily.toLocaleString('vi-VN')}đ`}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9090a2] truncate">{r.name}</p>
                        <p className="text-[10px] text-[#6d6d7e] truncate">{r.branchName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stay Type Selection */}
              <div>
                <label className="text-xs font-semibold text-[#c0c0d2] block mb-2 uppercase tracking-wider">
                  Hình Thức Lưu Trú
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setStayType('hourly')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      stayType === 'hourly'
                        ? 'bg-[#20202e] border-[#d4af37]'
                        : 'bg-[#15151e] border-[#292938]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Gói Theo Giờ (3h)</span>
                      <Clock className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-[11px] text-[#8e8e9e]">Nghỉ trưa/hẹn hò nhanh</div>
                    <div className="text-xs font-bold text-[#d4af37] mt-2">
                      {activeRoom.price.hourly3h.toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  <div
                    onClick={() => setStayType('overnight')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      stayType === 'overnight'
                        ? 'bg-[#20202e] border-[#d4af37]'
                        : 'bg-[#15151e] border-[#292938]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Gói Qua Đêm</span>
                      <span className="text-[9px] bg-[#d4af37] text-black font-bold px-1.5 py-0.2 rounded">
                        Hot
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8e8e9e]">20:00 - 11:00 hôm sau</div>
                    <div className="text-xs font-bold text-[#d4af37] mt-2">
                      {activeRoom.price.overnight.toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  <div
                    onClick={() => setStayType('daily')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      stayType === 'daily'
                        ? 'bg-[#20202e] border-[#d4af37]'
                        : 'bg-[#15151e] border-[#292938]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Gói Cả Ngày Đêm</span>
                      <Calendar className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="text-[11px] text-[#8e8e9e]">14:00 - 12:00 hôm sau</div>
                    <div className="text-xs font-bold text-[#d4af37] mt-2">
                      {activeRoom.price.daily.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#a0a0b0] block mb-1">
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#a0a0b0] block mb-1">
                    Giờ nhận phòng dự kiến
                  </label>
                  <input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#a0a0b0] block mb-1">
                    Số lượng khách
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value={1}>1 Khách</option>
                    <option value={2}>2 Khách (Tiêu chuẩn)</option>
                    <option value={3}>3 Khách (+70.000đ phụ thu)</option>
                  </select>
                </div>
              </div>

              {/* Summary of Step 1 */}
              <div className="bg-[#181824] p-3.5 rounded-xl border border-[#2b2b3b] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8c8c9e]">Tạm tính giá phòng:</span>
                  <div className="font-semibold text-white">
                    {activeRoom.code} · {activeRoom.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-[#d4af37] font-cinzel">
                    {basePrice.toLocaleString('vi-VN')}đ
                  </div>
                  {extraGuestSurcharge > 0 && (
                    <div className="text-[10px] text-[#a0a0b2]">+70.000đ phụ thu khách thứ 3</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ADDONS & UPGRADES */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white font-cinzel mb-1 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#d4af37]" /> Dịch Vụ Setup Hẹn Hò & Thư Giãn
                </h3>
                <p className="text-xs text-[#9d9dae]">
                  Bạn có muốn tạo bất ngờ cho người thương? Tích chọn để chúng tôi chuẩn bị sẵn sàng trước khi bạn nhận phòng.
                </p>
              </div>

              <div className="space-y-3">
                {ADDON_SERVICES.map((addon) => {
                  const isSelected = !!selectedAddons[addon.id];
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#20202e] border-[#d4af37]'
                          : 'bg-[#15151e] border-[#292938] hover:border-[#3b3b4f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#d4af37] border-[#d4af37] text-black'
                              : 'border-[#444456] bg-[#1a1a24]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <img
                          src={addon.image}
                          alt={addon.name}
                          className="w-14 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{addon.name}</h4>
                          <p className="text-[11px] text-[#9090a2] line-clamp-1">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-[#d4af37] font-cinzel">
                          +{addon.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#181824] p-3.5 rounded-xl border border-[#2b2b3b] flex items-center justify-between text-xs">
                <span className="text-[#8c8c9e]">Tổng tiền dịch vụ thêm:</span>
                <span className="font-bold text-[#d4af37] font-cinzel">
                  +{addonsPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST INFO & CONFIRMATION */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-5">
              {/* Customer details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#c0c0d2] uppercase tracking-wider">
                  Thông Tin Người Đặt (Bảo Mật 100%)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#a0a0b2] block mb-1">
                      Họ và tên quý khách <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a0a0b2] block mb-1">
                      Số điện thoại / Zalo nhận mã mở cửa <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0989 123 456"
                      className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#a0a0b2] block mb-1">
                      Số CCCD / Hộ chiếu (Đăng ký tạm trú 16+)
                    </label>
                    <input
                      type="text"
                      value={customerIdentity}
                      onChange={(e) => setCustomerIdentity(e.target.value)}
                      placeholder="0790..."
                      className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a0a0b2] block mb-1">
                      Yêu cầu bí mật hoặc lời nhắn
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Setup nến lúc 20:00, chữ chúc mừng..."
                      className="w-full bg-[#181822] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Coupon Code Box */}
              <div className="bg-[#171722] p-3.5 rounded-xl border border-[#2b2b3a] space-y-2">
                <label className="text-xs text-[#a0a0b2] block font-medium">
                  Mã Giảm Giá / Thẻ Hội Viên 007
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập mã 'STAY007' để giảm 10%"
                    className="flex-1 bg-[#121218] border border-[#303042] rounded-lg px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-[#252536] hover:bg-[#323246] text-xs text-[#d4af37] font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </div>
                {couponSuccess && <p className="text-[11px] text-emerald-400">{couponSuccess}</p>}
                {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#c0c0d2] block uppercase tracking-wider">
                  Phương Thức Thanh Toán
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'vietqr'
                        ? 'bg-[#20202e] border-[#d4af37]'
                        : 'bg-[#15151e] border-[#292938]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <QrCode className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-xs font-bold text-white">Chuyển Khoản VietQR</span>
                    </div>
                    <p className="text-[10px] text-[#8e8e9e]">
                      Tự động xác nhận & cấp mã Smartlock lập tức
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cash_arrival')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cash_arrival'
                        ? 'bg-[#20202e] border-[#d4af37]'
                        : 'bg-[#15151e] border-[#292938]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-xs font-bold text-white">Giữ Chỗ & Xác Nhận Zalo</span>
                    </div>
                    <p className="text-[10px] text-[#8e8e9e]">
                      Nhân viên 007 sẽ liên hệ Zalo giữ phòng
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Bill */}
              <div className="bg-[#151520] border border-[#2c2c3e] rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#a0a0b2]">
                  <span>
                    Giá phòng ({activeRoom.code} ·{' '}
                    {stayType === 'hourly'
                      ? '3 Giờ'
                      : stayType === 'overnight'
                      ? 'Qua Đêm'
                      : 'Ngày Đêm'}
                    )
                  </span>
                  <span className="text-white font-medium">{basePrice.toLocaleString('vi-VN')}đ</span>
                </div>

                {extraGuestSurcharge > 0 && (
                  <div className="flex justify-between text-[#a0a0b2]">
                    <span>Phụ thu khách thứ 3:</span>
                    <span className="text-white font-medium">+70.000đ</span>
                  </div>
                )}

                {addonsPrice > 0 && (
                  <div className="flex justify-between text-[#a0a0b2]">
                    <span>Dịch vụ hẹn hò lãng mạn:</span>
                    <span className="text-white font-medium">
                      +{addonsPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Ưu đãi voucher ({discountPercent}%):</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#252536] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Tổng cộng thanh toán:</span>
                  <span className="font-cinzel text-xl font-bold text-[#d4af37]">
                    {totalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: BOOKING CONFIRMED & ACCESS CREDENTIALS */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#34d399] flex items-center justify-center mx-auto shadow-lg shadow-[#10b981]/10">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  ĐẶT PHÒNG THÀNH CÔNG!
                </h3>
                <p className="text-xs text-[#a0a0b2] mt-1">
                  Mã mật lệnh của bạn đã được ghi nhận vào hệ thống Smartlock 007
                </p>
              </div>

              {/* Booking Code Card */}
              <div className="bg-[#181826] border border-[#d4af37]/40 rounded-2xl p-5 max-w-md mx-auto shadow-xl">
                <div className="text-xs text-[#8c8c9e] uppercase tracking-wider mb-1">
                  Mã Đặt Phòng Của Bạn
                </div>
                <div className="font-mono text-2xl font-bold text-[#d4af37] tracking-wider mb-2">
                  {confirmedBooking.bookingCode}
                </div>
                <button
                  onClick={copyBookingCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#242436] hover:bg-[#303046] text-xs text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép mã</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép mã phòng</span>
                    </>
                  )}
                </button>
              </div>

              {/* Smartlock Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto text-xs">
                <div className="bg-[#151520] p-4 rounded-xl border border-[#2b2b3d]">
                  <div className="text-[#888898] mb-1">Mật khẩu khóa số (PIN):</div>
                  <div className="font-mono text-xl font-bold text-[#d4af37]">
                    {confirmedBooking.doorPinCode}
                  </div>
                  <div className="text-[10px] text-[#707080] mt-1">
                    Bấm số trên khóa rồi kết thúc bằng phím #
                  </div>
                </div>

                <div className="bg-[#151520] p-4 rounded-xl border border-[#2b2b3d]">
                  <div className="text-[#888898] mb-1">Phòng & Địa chỉ:</div>
                  <div className="font-semibold text-white truncate">
                    {confirmedBooking.room.name}
                  </div>
                  <div className="text-[10px] text-[#8e8e9e] truncate mt-1">
                    {confirmedBooking.room.branchAddress}
                  </div>
                </div>
              </div>

              {/* VietQR Bank Payment Information */}
              <div className="bg-[#14141d] border border-[#2a2a3c] rounded-2xl p-4 max-w-md mx-auto text-left">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#222230]">
                  <QrCode className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Thông Tin Chuyển Khoản Tự Động
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#b0b0c2]">
                  <div className="flex justify-between">
                    <span>Ngân hàng:</span>
                    <span className="text-white font-semibold">MB BANK (Quân Đội)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số tài khoản:</span>
                    <span className="text-[#d4af37] font-mono font-bold">0899772567</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ tài khoản:</span>
                    <span className="text-white font-semibold">007 STAYCATION</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số tiền:</span>
                    <span className="text-[#d4af37] font-bold">
                      {confirmedBooking.totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nội dung CK:</span>
                    <span className="text-white font-mono font-semibold">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://zalo.me/0899772567?text=${encodeURIComponent(
                    `Xin chào 007 Staycation, tôi đã đặt phòng mã: ${confirmedBooking.bookingCode}, tên: ${confirmedBooking.customerName}, SĐT: ${confirmedBooking.customerPhone}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#0068ff] hover:bg-[#0052cc] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Xác Nhận Qua Zalo Hotline</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#222230] hover:bg-[#2c2c3e] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Đóng & Hoàn Tất
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="p-4 sm:p-5 border-t border-[#22222f] bg-[#14141c] flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2.5 rounded-xl bg-[#1e1e2b] hover:bg-[#282838] text-xs text-[#c0c0d0] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-md shadow-[#d4af37]/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Tiếp tục chọn dịch vụ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-md shadow-[#d4af37]/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Tiếp tục: Điền thông tin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ba9028] hover:from-[#e4bd47] hover:to-[#c69a30] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Hoàn Tất Đặt Phòng</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
