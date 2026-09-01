import React from 'react';
import { Icons } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/business';

interface MobileBottomBarProps {
  onFindStore: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onFindStore }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-mds-border/80 shadow-elevated px-3 py-2">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-mds-sand/80 text-mds-charcoal hover:bg-mds-sand active:scale-95 transition-all text-center"
        >
          <Icons.Phone className="w-4 h-4 text-mds-primary mb-0.5" />
          <span className="text-[11px] font-bold">Call MDS</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.generalWhatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 active:scale-95 transition-all text-center border border-emerald-200/60"
        >
          <Icons.WhatsApp className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Find Store */}
        <button
          onClick={onFindStore}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-mds-primary text-white hover:bg-mds-accent active:scale-95 transition-all text-center shadow-sm"
        >
          <Icons.MapPin className="w-4 h-4 text-emerald-300 mb-0.5" />
          <span className="text-[11px] font-bold">3 Stores</span>
        </button>
      </div>
    </div>
  );
};
