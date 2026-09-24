import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../data/services';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Hỏi Đáp Thường Gặp</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          CÂU HỎI VỀ 007 STAYCATION
        </h2>
        <p className="text-[#9e9eaf] text-xs sm:text-sm mt-2 font-light">
          Những thắc mắc phổ biến về quy trình nhận phòng tự động, tiện ích và các quy định.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#14141d] border border-[#262637] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-semibold text-white hover:text-[#d4af37] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4af37] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-[#a8a8b8] leading-relaxed font-light border-t border-[#1e1e2c] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
