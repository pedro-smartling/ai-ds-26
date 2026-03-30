'use client';

import React from 'react';
import { Check } from 'lucide-react';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export interface StepItem {
  title: string;
  description?: string;
}

interface StepsProps {
  /** Array of step definitions */
  steps: StepItem[];
  /** Zero-based index of the current step */
  currentStep?: number;
  /** Orientation */
  orientation?: 'vertical' | 'horizontal';
}

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

/* ── Step indicator circle ────────────────────────────────────────────── */

function StepCircle({ index, status }: { index: number; status: StepStatus }) {
  const isActive = status === 'current';
  const isCompleted = status === 'completed';

  // Done = green, Active = brand purple, Default = white with gray border
  const bg = isCompleted
    ? 'var(--color-surface-success-solid)'
    : isActive
    ? 'var(--color-surface-brand-solid)'
    : 'var(--color-surface-main)';

  const border = isCompleted
    ? '1px solid var(--color-green-600, #16a34a)'
    : isActive
    ? '1px solid var(--color-border-transparent)'
    : '1px solid var(--color-border-disabled)';

  return (
    <div style={{
      width: 'var(--size-actions-xs)',
      height: 'var(--size-actions-xs)',
      borderRadius: 'var(--radius-full)',
      backgroundColor: bg,
      border,
      boxShadow: 'var(--shadow-xs)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxSizing: 'border-box',
    }}>
      {isCompleted ? (
        <Check size={16} strokeWidth={2.5} style={{ color: 'var(--color-foreground-white)' }} />
      ) : (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-heading)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: isActive ? 'var(--color-text-main-onbrand)' : 'var(--color-text-disabled)',
          textAlign: 'center',
        }}>
          {index + 1}
        </span>
      )}
    </div>
  );
}

/* ── Connector line ───────────────────────────────────────────────────── */

function connectorColor(status: StepStatus): string {
  // Done = green, Active = brand purple, Default = gray
  if (status === 'completed') return 'var(--color-surface-success-solid)';
  if (status === 'current') return 'var(--color-surface-brand-solid)';
  return 'var(--color-border-disabled)';
}

function VerticalConnector({ status }: { status: StepStatus }) {
  return (
    <div style={{
      width: 1,
      flex: 1,
      minHeight: 'var(--dimension-tier-9)',
      backgroundColor: connectorColor(status),
    }} />
  );
}

function HorizontalConnector({ status }: { status: StepStatus }) {
  return (
    <div style={{
      height: 1,
      flex: 1,
      minWidth: 'var(--dimension-tier-9)',
      backgroundColor: connectorColor(status),
    }} />
  );
}

/* ── Steps component ──────────────────────────────────────────────────── */

export default function Steps({ steps, currentStep = 0, orientation = 'vertical' }: StepsProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div style={{
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: isVertical ? 'stretch' : 'flex-start',
    }}>
      {steps.map((step, i) => {
        const status = getStatus(i, currentStep);
        const isLast = i === steps.length - 1;

        if (isVertical) {
          return (
            <div key={i} style={{
              display: 'flex',
              gap: 'var(--space-page-inside-m)',
              alignItems: 'stretch',
              minHeight: isLast ? undefined : 'var(--dimension-tier-17)',
            }}>
              {/* Left column: circle + line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <StepCircle index={i} status={status} />
                {!isLast && <VerticalConnector status={status} />}
              </div>

              {/* Right column: text */}
              <div style={{
                paddingBottom: isLast ? 0 : 'var(--dimension-tier-9)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-heading)',
                  fontSize: 'var(--font-size-l)',
                  lineHeight: 'var(--line-height-body-l)',
                  color: status === 'current' ? 'var(--color-text-main)' : 'var(--color-text-strong)',
                  margin: 0,
                }}>
                  {step.title}
                </p>
                {step.description && (
                  <p style={{
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-body)',
                    fontSize: 'var(--font-size-s)',
                    lineHeight: 'var(--line-height-body-s)',
                    color: status === 'current' ? 'var(--color-text-soft)' : 'var(--color-text-strong)',
                    margin: 0,
                  }}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        }

        // Horizontal
        return (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-page-inside-xs)',
              minWidth: 80,
            }}>
              <StepCircle index={i} status={status} />
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-heading)',
                fontSize: 'var(--font-size-s)',
                lineHeight: 'var(--line-height-body-s)',
                color: status === 'current' ? 'var(--color-text-main)' : 'var(--color-text-strong)',
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                {step.title}
              </p>
              {step.description && (
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-body)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: 'var(--line-height-body-xs)',
                  color: status === 'current' ? 'var(--color-text-soft)' : 'var(--color-text-strong)',
                  margin: 0,
                  textAlign: 'center',
                }}>
                  {step.description}
                </p>
              )}
            </div>
            {!isLast && (
              <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 11, flex: 1 }}>
                <HorizontalConnector status={status} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
