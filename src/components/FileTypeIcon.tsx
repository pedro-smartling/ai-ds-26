'use client';

import React from 'react';

export type FileTypeIconType = 'default' | 'gray' | 'solid';

interface FileTypeIconProps {
  /** File extension label (e.g. 'PDF', 'IMG', 'DOC') */
  extension: string;
  /** Visual type */
  type?: FileTypeIconType;
  /** Container size in px */
  size?: number;
}

/* ── Per-extension badge color (Default & Solid types) ───────────────── */
const EXTENSION_COLORS: Record<string, string> = {
  // Images — violet
  IMG: '#6d28d9', JPG: '#6d28d9', JPEG: '#6d28d9', PNG: '#6d28d9',
  WEBP: '#6d28d9', TIFF: '#6d28d9', GIF: '#6d28d9', SVG: '#6d28d9', EPS: '#6d28d9',
  // Documents
  PDF: '#d92d20',
  DOC: '#155eef', DOCX: '#155eef',
  TXT: '#344054',
  CSV: '#099250',
  XLS: '#099250', XLSX: '#099250',
  PPT: '#e62e05', PPTX: '#e62e05',
  // Design
  FIG: '#6d28d9',
  AI: '#e62e05', PSD: '#155eef', INDD: '#dd2590', AEP: '#6d28d9',
  // Media
  MP3: '#dd2590', WAV: '#dd2590',
  MP4: '#155eef', MPEG: '#155eef', AVI: '#155eef', MKV: '#155eef',
  // Development — indigo
  HTML: '#444ce7', CSS: '#444ce7', RSS: '#444ce7', SQL: '#444ce7',
  JS: '#444ce7', JSON: '#444ce7', JAVA: '#444ce7', XML: '#444ce7',
  EXE: '#344054', DMG: '#344054',
  // Archive — gray
  ZIP: '#344054', RAR: '#344054',
};

const DEFAULT_COLOR = '#6d28d9';

function getExtensionColor(extension: string): string {
  return EXTENSION_COLORS[extension.toUpperCase()] ?? DEFAULT_COLOR;
}

/* ── Page SVG shapes ─────────────────────────────────────────────────── */

/** White page with folded corner and gray stroke */
function DefaultPage() {
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z" fill="white" />
      <path d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z" fill="var(--color-neutral-200, #e5e5e5)" />
      <path d="M4 0.5H19.5V8C19.5 10.4853 21.5147 12.5 24 12.5H31.5V36C31.5 37.933 29.933 39.5 28 39.5H4C2.067 39.5 0.5 37.933 0.5 36V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="var(--color-neutral-300, #d4d4d4)" />
    </svg>
  );
}

/** Gray filled page */
function GrayPage() {
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z" fill="var(--color-neutral-200, #eaecf0)" />
      <path d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z" fill="var(--color-neutral-300, #d4d4d4)" />
    </svg>
  );
}

/** Solid colored page */
function SolidPage({ color }: { color: string }) {
  // Lighten the fold corner slightly by using opacity
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z" fill={color} />
      <path d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

export default function FileTypeIcon({ extension, type = 'default', size = 40 }: FileTypeIconProps) {
  const scale = size / 40;
  const color = getExtensionColor(extension);

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
    }}>
      {/* Page shape */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
      }}>
        {type === 'default' && <DefaultPage />}
        {type === 'gray' && <GrayPage />}
        {type === 'solid' && <SolidPage color={color} />}
      </div>

      {/* Extension label */}
      {type === 'default' ? (
        /* Badge style — colored pill with white text */
        <div style={{
          position: 'absolute',
          bottom: `${6 * scale}px`,
          left: `${1 * scale}px`,
          backgroundColor: color,
          borderRadius: `${2 * scale}px`,
          padding: `${2 * scale}px ${3 * scale}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 700,
            fontSize: `${10 * scale}px`,
            lineHeight: 1,
            color: 'white',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {extension}
          </span>
        </div>
      ) : (
        /* Text directly on page — gray or solid */
        <div style={{
          position: 'absolute',
          bottom: `${6 * scale}px`,
          left: `${4 * scale}px`,
          right: `${4 * scale}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 700,
            fontSize: `${9 * scale}px`,
            lineHeight: 1,
            color: type === 'gray' ? 'var(--color-neutral-700, #344054)' : 'white',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {extension}
          </span>
        </div>
      )}
    </div>
  );
}
