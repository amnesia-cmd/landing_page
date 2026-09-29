import React, { useState } from 'react';

interface ResilientCosmicImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  caption?: string;
  telemetryTag?: string;
}

export const ResilientCosmicImage: React.FC<ResilientCosmicImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-video',
  caption,
  telemetryTag,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border border-white/10 bg-slate-950 group`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 text-center">
          <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <p className="text-sm font-medium text-slate-200 max-w-xs">{alt}</p>
        </div>
      )}

      {/* Measured contrast scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050811]/90 via-[#050811]/25 to-transparent" />

      {(telemetryTag || caption) && (
        <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-4 pointer-events-none">
          {caption && (
            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
              {caption}
            </p>
          )}
          {telemetryTag && (
            <span className="text-[11px] font-mono tabular-nums text-cyan-300/90 shrink-0">
              {telemetryTag}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
