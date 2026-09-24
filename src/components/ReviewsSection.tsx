import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, Heart, User, Send, Check } from 'lucide-react';
import { REVIEWS as INITIAL_REVIEWS } from '../data/reviews';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [author, setAuthor] = useState('');
  const [roomCode, setRoomCode] = useState('Mission 001');
  const [rating, setRating] = useState(5);
  const [stayType, setStayType] = useState('Qua đêm');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      roomCode,
      roomName: roomCode,
      rating,
      date: 'Vừa xong',
      stayType,
      comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAddingReview(false);
      setAuthor('');
      setComment('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
          <span>Trải Nghiệm Từ Khách Hàng</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          ĐÁNH GIÁ & CẢM NHẬN
        </h2>
        <div className="flex items-center gap-2 mt-3 text-sm text-[#a0a0b2]">
          <div className="flex items-center text-[#d4af37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
            ))}
          </div>
          <span className="font-bold text-white">4.9 / 5.0</span>
          <span>· Dựa trên hơn 420 lượt khách lưu trú tại Bà Rịa</span>
        </div>
      </div>

      {/* Action to open review form */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddingReview(!isAddingReview)}
          className="px-4 py-2 rounded-xl bg-[#1c1c28] hover:bg-[#252535] text-xs font-medium text-[#d4af37] border border-[#d4af37]/30 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isAddingReview ? 'Đóng form' : 'Viết đánh giá của bạn'}</span>
        </button>
      </div>

      {/* Review Submission Form Drawer */}
      {isAddingReview && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-[#14141c] border border-[#2d2d3e] rounded-2xl p-6 mb-8 max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200"
        >
          <h3 className="text-sm font-bold text-white font-cinzel">
            Chia Sẻ Trải Nghiệm Của Bạn Tại 007
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#9d9dae] block mb-1">Tên của bạn hoặc cặp đôi</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="VD: Tuấn & Linh"
                className="w-full bg-[#1b1b26] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs text-[#9d9dae] block mb-1">Phòng bạn đã trải nghiệm</label>
              <select
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full bg-[#1b1b26] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Mission 001">Mission 001 · GoldenEye</option>
                <option value="Mission 002">Mission 002 · Casino Royale</option>
                <option value="Mission 003">Mission 003 · Skyfall</option>
                <option value="007 DNA">007 DNA Signature</option>
                <option value="Mission 004">Mission 004 · Spectre Noir</option>
                <option value="Mission 005">Mission 005 · Quantum</option>
                <option value="Mission 006">Mission 006 · No Time To Die</option>
                <option value="007 SOUL">007 SOUL Loft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#9d9dae] block mb-1">Đánh giá sao</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#1b1b26] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value={5}>5 Sao - Rất Tuyệt Vời</option>
                <option value={4}>4 Sao - Hài Lòng</option>
                <option value={3}>3 Sao - Tạm Được</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#9d9dae] block mb-1">Gói lưu trú</label>
              <select
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="w-full bg-[#1b1b26] border border-[#323246] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Qua đêm">Qua đêm (20h - 11h)</option>
                <option value="Theo ngày">Theo ngày (14h - 12h)</option>
                <option value="Theo giờ (3h)">Theo giờ (3h)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-[#9d9dae] block mb-1">Nhận xét chi tiết</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cảm nhận về bồn tắm, máy chiếu, quy trình tự check-in..."
              className="w-full bg-[#1b1b26] border border-[#323246] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitted}
              className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã gửi thành công!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Nhận Xét</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#13131b] border border-[#262635] hover:border-[#d4af37]/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Card Header: Author info & Stars */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#363649]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                    <span className="text-[10px] text-[#7d7d8e]">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center text-[#d4af37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                  ))}
                </div>
              </div>

              {/* Room Tag */}
              <div className="text-[10px] font-medium text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-0.5 rounded w-fit mb-3">
                {rev.roomCode} · {rev.stayType}
              </div>

              {/* Comment */}
              <p className="text-xs text-[#b3b3c4] font-light leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[#20202c] flex items-center justify-between text-[10px] text-[#78788a]">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> Đã xác thực lưu trú
              </span>
              <span>Bà Rịa Staycation</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
