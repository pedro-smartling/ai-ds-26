'use client';

import React, { useState } from 'react';
import Toast from '@/components/Toast';
import Button from '@/components/Button';
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

function InteractiveDemo() {
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error'; message: string }[]>([]);
  let counter = 0;

  const addToast = (type: 'success' | 'error') => {
    const id = ++counter + Date.now();
    const message = type === 'success' ? 'Job saved successfully' : 'Unable to save changes';
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
      <div style={{ display: 'flex', gap: 'var(--dimension-tier-5)' }}>
        <Button variant="primary" size="sm" onClick={() => addToast('success')}>Show success</Button>
        <Button variant="delete-primary" size="sm" onClick={() => addToast('error')}>Show error</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-5)', minHeight: 60 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={4000}
            onDismiss={() => removeToast(t.id)}
            actions={[
              { label: 'See more', onClick: () => {} },
              { label: 'Close it', onClick: () => removeToast(t.id) },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToastPage() {
  return (
    <div>
      <PageHeader
        title="Toast"
        description="Toasts display temporary, non-intrusive feedback about system events. They auto-dismiss with a progress bar and support optional action buttons."
      />

      {/* Interactive */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive')}
        {sectionDesc('Click the buttons to trigger toasts. They auto-dismiss after 4 seconds with a progress indicator.')}
        <PreviewBox>
          <InteractiveDemo />
        </PreviewBox>
      </section>

      {/* Success */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Success')}
        {sectionDesc('Green icon and progress bar. Use to confirm completed actions like saves, submissions, or deletions.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            <Toast
              message="Job saved successfully"
              type="success"
              duration={0}
              actions={[
                { label: 'See more', onClick: () => {} },
                { label: 'Close it', onClick: () => {} },
              ]}
            />
            <Toast
              message="Changes published"
              type="success"
              duration={0}
            />
          </div>
        </PreviewBox>
      </section>

      {/* Error */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Error')}
        {sectionDesc('Red icon and progress bar. Use for failures that do not require immediate user action.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            <Toast
              message="Unable to save changes"
              type="error"
              duration={0}
              actions={[{ label: 'Retry', onClick: () => {} }]}
            />
            <Toast
              message="Network connection lost"
              type="error"
              duration={0}
            />
          </div>
        </PreviewBox>
      </section>

      {/* Without actions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without actions')}
        {sectionDesc('When no actions are provided, the toast shows only the icon, message, and progress bar.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            <Toast message="File uploaded" type="success" duration={0} />
            <Toast message="Import failed" type="error" duration={0} />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'message', type: 'string', required: true, description: 'Toast message text.' },
          { name: 'type', type: "'success' | 'error'", default: "'success'", description: 'Visual type controlling icon, colors, and progress bar.' },
          { name: 'actions', type: 'ToastAction[]', description: 'Array of { label, onClick } action buttons. Rendered as underlined text links.' },
          { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration in ms. Set to 0 to disable.' },
          { name: 'onDismiss', type: '() => void', description: 'Called when the toast auto-dismisses or is closed.' },
          { name: 'visible', type: 'boolean', default: 'true', description: 'Controls visibility. Set to false to hide.' },
        ]} />
      </section>
    </div>
  );
}
