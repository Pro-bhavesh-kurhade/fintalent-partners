import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SubPageBarProps {
  badge: string;
  secondaryLabel?: string;
  onBackHome: () => void;
  onSecondaryAction?: () => void;
}

export const SubPageBar: React.FC<SubPageBarProps> = ({
  badge,
  secondaryLabel,
  onBackHome,
  onSecondaryAction,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="px-3 sm:px-6 pt-3">
      <div
        className={`max-w-7xl mx-auto rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border ${
          isDark
            ? 'bg-[#111522]/90 border-white/12 text-white'
            : 'bg-white border-[1.5px] border-[#0D1017] text-[#0D1017] shadow-[3px_3px_0px_0px_#0D1017]'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-white/10 hover:bg-[#C8FF32] hover:text-[#090B10] text-white'
                : 'bg-[#0D1017] hover:bg-[#3B5BFF] text-[#C8FF32] hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-mono opacity-40">/</span>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B4A]">
            {badge}
          </span>
        </div>

        {secondaryLabel && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-[#C8FF32] text-[#090B10] hover:bg-[#b8f21e]'
                : 'bg-[#FAF7F0] hover:bg-[#C8FF32] text-[#0D1017] border border-[#0D1017]/25'
            }`}
          >
            <span>{secondaryLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
