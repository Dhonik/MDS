import React from 'react';

export const CardSkeleton: React.FC<{ count?: number; className?: string }> = ({ count = 3, className = 'h-64' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-white rounded-3xl p-6 border border-mds-border/70 shadow-soft animate-pulse flex flex-col justify-between ${className}`}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded-full w-20"></div>
              <div className="h-4 bg-emerald-100 rounded-full w-16"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-gray-100 rounded w-full"></div>
              <div className="h-3 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-full mt-4"></div>
        </div>
      ))}
    </>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = 'No Items Available',
  message,
  actionText,
  onAction,
}) => {
  return (
    <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-mds-border/70 shadow-soft max-w-xl mx-auto space-y-4 my-6">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-mds-primary mx-auto flex items-center justify-center">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h4 className="text-lg font-bold text-mds-charcoal font-heading">{title}</h4>
      <p className="text-xs sm:text-sm text-mds-muted leading-relaxed">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
