'use client';

import React, { useState } from 'react';
import FloatNotification from '@/components/FloatNotification';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';

const sectionTitle = (text: string) => (
  <h2 style={{
    fontSize: 'var(--font-size-l)',
    fontWeight: 'var(--font-weight-heading)',
    color: 'var(--color-text-main)',
    margin: '0 0 var(--dimension-tier-6)',
  }}>{text}</h2>
);

const sectionDesc = (text: string) => (
  <p style={{
    fontSize: 'var(--font-size-s)',
    color: 'var(--color-text-moderate)',
    margin: '0 0 var(--dimension-tier-7)',
    lineHeight: 'var(--line-height-body-s)',
  }}>{text}</p>
);

const SUPPORTING_TEXT = "We're running into some difficulties at the moment so you might see some delays.";

function DismissDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body-strong)',
          fontSize: 'var(--font-size-s)',
          color: 'var(--color-text-link)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--space-page-inside-xs) 0',
        }}
      >
        Show notification again
      </button>
    );
  }
  return (
    <FloatNotification
      type="default"
      title="Submitting job"
      dateTime="2 mins ago"
      supportingText={SUPPORTING_TEXT}
      avatarSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
      actions={[
        { label: 'Dismiss', variant: 'gray', onClick: () => setVisible(false) },
        { label: 'See more', variant: 'color' },
      ]}
      onDismiss={() => setVisible(false)}
    />
  );
}

function ProgressDemo() {
  const [progress, setProgress] = useState(40);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
      <FloatNotification
        type="progress"
        title="Submitting job"
        dateTime="2 mins ago"
        supportingText={SUPPORTING_TEXT}
        progress={progress}
        actions={[
          { label: 'Cancel', variant: 'gray' },
          { label: 'See more', variant: 'color' },
        ]}
        onDismiss={() => {}}
      />
      <div style={{ display: 'flex', gap: 'var(--dimension-tier-5)', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>Progress:</span>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ flex: 1, maxWidth: 200 }}
        />
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 32 }}>{progress}%</span>
      </div>
    </div>
  );
}

export default function FloatNotificationPage() {
  return (
    <div>
      <PageHeader
        title="Float Notification"
        description="Float notifications are elevated cards that appear as overlays to inform users about background processes, status changes, or time-sensitive events. They support five types: default (with avatar), warning, success, progress, and error."
      />

      {/* All types */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Types')}
        {sectionDesc('Five types: default shows a user avatar, warning/success/error show a colored featured icon with accent bar, and progress shows an upload icon with a progress bar.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <FloatNotification
              type="default"
              title="Submitting job"
              dateTime="2 mins ago"
              supportingText={SUPPORTING_TEXT}
              avatarSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
              actions={[
                { label: 'Dismiss', variant: 'gray' },
                { label: 'See more', variant: 'color' },
              ]}
              onDismiss={() => {}}
            />
            <FloatNotification
              type="warning"
              title="Submitting job"
              dateTime="2 mins ago"
              supportingText={SUPPORTING_TEXT}
              actions={[{ label: 'Dismiss', variant: 'gray' }]}
              onDismiss={() => {}}
            />
            <FloatNotification
              type="success"
              title="Submitting job"
              dateTime="2 mins ago"
              supportingText={SUPPORTING_TEXT}
              actions={[{ label: 'Dismiss', variant: 'gray' }]}
              onDismiss={() => {}}
            />
            <FloatNotification
              type="progress"
              title="Submitting job"
              dateTime="2 mins ago"
              supportingText={SUPPORTING_TEXT}
              progress={40}
              actions={[
                { label: 'Cancel', variant: 'gray' },
                { label: 'See more', variant: 'color' },
              ]}
              onDismiss={() => {}}
            />
            <FloatNotification
              type="error"
              title="Submitting job"
              dateTime="2 mins ago"
              supportingText={SUPPORTING_TEXT}
              actions={[{ label: 'Dismiss', variant: 'gray' }]}
              onDismiss={() => {}}
            />
          </div>
        </PreviewBox>
      </section>

      {/* Interactive dismiss */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Dismissible')}
        {sectionDesc('Click the X or "Dismiss" to remove the notification. Click the link to bring it back.')}
        <PreviewBox>
          <DismissDemo />
        </PreviewBox>
      </section>

      {/* Progress */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Progress')}
        {sectionDesc('The progress variant includes a ProgressBar. Drag the slider to adjust the value.')}
        <PreviewBox>
          <ProgressDemo />
        </PreviewBox>
      </section>

      {/* Without actions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without actions')}
        {sectionDesc('Notifications without action links — dismiss-only via the X button.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <FloatNotification
              type="success"
              title="Job completed"
              dateTime="Just now"
              supportingText="All 42 files have been successfully processed."
              onDismiss={() => {}}
            />
            <FloatNotification
              type="error"
              title="Upload failed"
              dateTime="1 min ago"
              supportingText="The file exceeded the maximum size limit of 50MB."
              onDismiss={() => {}}
            />
          </div>
        </PreviewBox>
      </section>

      {/* Minimal */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Minimal')}
        {sectionDesc('Title and timestamp only — no supporting text, actions, or dismiss button.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <FloatNotification type="warning" title="Session expiring" dateTime="5 mins" />
            <FloatNotification type="success" title="Changes saved" dateTime="Just now" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'title', type: 'string', required: true, description: 'Notification title (bold).' },
          { name: 'dateTime', type: 'string', description: 'Timestamp text shown next to the title.' },
          { name: 'supportingText', type: 'string', description: 'Secondary description below the title.' },
          { name: 'type', type: "'default' | 'warning' | 'success' | 'progress' | 'error'", default: "'default'", description: 'Controls accent bar color, leading icon, and layout.' },
          { name: 'actions', type: "{ label: string; variant?: 'gray' | 'color'; onClick?: () => void }[]", description: 'Action buttons below the text. Gray variant for secondary, color for primary.' },
          { name: 'avatarSrc', type: 'string', description: 'Avatar image URL for default type.' },
          { name: 'progress', type: 'number', default: '40', description: 'Progress bar value (0–100) for progress type.' },
          { name: 'onDismiss', type: '() => void', description: 'Called when the X dismiss button is clicked. If omitted, no X button is shown.' },
        ]} />
      </section>
    </div>
  );
}
