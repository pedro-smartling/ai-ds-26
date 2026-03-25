'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
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

export default function ModalPage() {
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openNoClose, setOpenNoClose] = useState(false);

  return (
    <div>
      <PageHeader
        title="Modal"
        description="Dialogs that overlay page content for focused tasks or confirmations. Three sizes with header, body, and footer slots."
      />

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Three sizes control the max width of the dialog panel: sm (400px), md (560px), lg (720px).')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-6)', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => setOpenSm(true)}>Open small</Button>
            <Button variant="secondary" onClick={() => setOpenMd(true)}>Open medium</Button>
            <Button variant="secondary" onClick={() => setOpenLg(true)}>Open large</Button>
          </div>
        </PreviewBox>

        <Modal
          isOpen={openSm}
          onClose={() => setOpenSm(false)}
          size="sm"
          title="Small modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpenSm(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpenSm(false)}>Confirm</Button>
            </>
          }
        >
          This is a small modal (400px max width). Use it for simple confirmations or short forms.
        </Modal>

        <Modal
          isOpen={openMd}
          onClose={() => setOpenMd(false)}
          size="md"
          title="Medium modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpenMd(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpenMd(false)}>Confirm</Button>
            </>
          }
        >
          This is a medium modal (560px max width). The default size — suited for most dialogs, forms, and confirmations.
        </Modal>

        <Modal
          isOpen={openLg}
          onClose={() => setOpenLg(false)}
          size="lg"
          title="Large modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpenLg(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpenLg(false)}>Save changes</Button>
            </>
          }
        >
          <p style={{ margin: '0 0 var(--dimension-tier-6)' }}>This is a large modal (720px max width). Use it for complex forms, multi-step flows, or content-rich dialogs that need more horizontal space.</p>
          <p style={{ margin: 0 }}>The body scrolls independently when content exceeds the viewport height.</p>
        </Modal>
      </section>

      {/* Confirmation */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Confirmation dialog')}
        {sectionDesc('Use a small modal with a destructive action in the footer for delete/destructive confirmations.')}
        <PreviewBox>
          <Button variant="delete-secondary" onClick={() => setOpenConfirm(true)}>Delete project</Button>
        </PreviewBox>

        <Modal
          isOpen={openConfirm}
          onClose={() => setOpenConfirm(false)}
          size="sm"
          title="Delete project?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpenConfirm(false)}>Cancel</Button>
              <Button variant="delete-primary" onClick={() => setOpenConfirm(false)}>Delete</Button>
            </>
          }
        >
          This action cannot be undone. All project data, translations, and settings will be permanently removed.
        </Modal>
      </section>

      {/* No close button */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without close button')}
        {sectionDesc('Set hideCloseButton to remove the X button. The modal can still close via the backdrop, Escape key, or custom footer actions.')}
        <PreviewBox>
          <Button variant="secondary" onClick={() => setOpenNoClose(true)}>Open (no X button)</Button>
        </PreviewBox>

        <Modal
          isOpen={openNoClose}
          onClose={() => setOpenNoClose(false)}
          size="sm"
          title="Session expiring"
          hideCloseButton
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpenNoClose(false)}>Sign out</Button>
              <Button variant="primary" onClick={() => setOpenNoClose(false)}>Stay signed in</Button>
            </>
          }
        >
          Your session will expire in 2 minutes. Would you like to extend it?
        </Modal>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'isOpen', type: 'boolean', required: true, description: 'Controls whether the modal is visible.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when the backdrop is clicked or Escape is pressed.' },
          { name: 'title', type: 'string', description: 'Heading text rendered in the modal header.' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Body content of the modal.' },
          { name: 'footer', type: 'React.ReactNode', description: 'Footer slot, rendered with right-aligned flex layout.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls max-width: 400px / 560px / 720px.' },
          { name: 'hideCloseButton', type: 'boolean', default: 'false', description: 'Hides the X close button in the header.' },
        ]} />
      </section>
    </div>
  );
}
