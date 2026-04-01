'use client';

import React from 'react';
import { User } from 'lucide-react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  /** Fallback initials when no src is provided */
  initials?: string;
}

const SIZE_MAP: Record<AvatarSize, { dim: number; iconSize: number }> = {
  xs:  { dim: 24, iconSize: 12 },
  sm:  { dim: 32, iconSize: 16 },
  md:  { dim: 40, iconSize: 20 },
  lg:  { dim: 48, iconSize: 24 },
  xl:  { dim: 64, iconSize: 28 },
  xxl: { dim: 64, iconSize: 28 },
};

export default function Avatar({
  src,
  alt = '',
  size = 'md',
  initials,
}: AvatarProps) {
  const s = SIZE_MAP[size];

  return (
    <div style={{
      position: 'relative',
      width: s.dim,
      height: s.dim,
      borderRadius: 200,
      flexShrink: 0,
      overflow: 'clip',
    }}>
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 200,
              display: 'block',
            }}
          />
          {/* Contrast border */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 200,
            border: '0.75px solid var(--color-border-solid)',
            opacity: 0.08,
            pointerEvents: 'none',
          }} />
        </>
      ) : initials ? (
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 200,
          backgroundColor: 'var(--color-surface-moderate)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body-strong)',
          fontSize: s.dim * 0.4,
          color: 'var(--color-text-moderate)',
        }}>
          {initials}
        </div>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 200,
          backgroundColor: 'var(--color-surface-moderate)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-foreground-moderate)',
        }}>
          <User width={s.iconSize} height={s.iconSize} />
        </div>
      )}
    </div>
  );
}
