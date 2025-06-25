import React from 'react';
import Button from '@/components/Button';
import { Plus, FilterFunnel01, Settings01, SwitchVertical01 } from '@untitled-ui/icons-react';

export default function ButtonDemo() {
  return (
    <main style={{ padding: 32, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Button Demo</h1>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Primary</h2>
        <Button variant="primary" size="sm">Primary Small</Button>{' '}
        <Button variant="primary" size="md">Primary Medium</Button>{' '}
        <Button variant="primary" size="lg">Primary Large</Button>{' '}
        <Button variant="primary" size="md" icon={<Plus />}>Primary w/ Icon</Button>{' '}
        <Button variant="primary" size="md" icon={<Plus />} iconOnly aria-label="Add" />
        <Button variant="primary" size="md" disabled>Primary Disabled</Button>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Secondary</h2>
        <Button variant="secondary" size="sm">Secondary Small</Button>{' '}
        <Button variant="secondary" size="md">Secondary Medium</Button>{' '}
        <Button variant="secondary" size="lg">Secondary Large</Button>{' '}
        <Button variant="secondary" size="md" icon={<FilterFunnel01 />}>Secondary w/ Icon</Button>{' '}
        <Button variant="secondary" size="md" icon={<FilterFunnel01 />} iconOnly aria-label="Filter" />
        <Button variant="secondary" size="md" disabled>Secondary Disabled</Button>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Tertiary</h2>
        <Button variant="tertiary" size="sm">Tertiary Small</Button>{' '}
        <Button variant="tertiary" size="md">Tertiary Medium</Button>{' '}
        <Button variant="tertiary" size="lg">Tertiary Large</Button>{' '}
        <Button variant="tertiary" size="md" icon={<Settings01 />}>Tertiary w/ Icon</Button>{' '}
        <Button variant="tertiary" size="md" icon={<Settings01 />} iconOnly aria-label="Settings" />
        <Button variant="tertiary" size="md" disabled>Tertiary Disabled</Button>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Delete</h2>
        <Button variant="delete-primary" size="md">Delete Primary</Button>{' '}
        <Button variant="delete-secondary" size="md">Delete Secondary</Button>{' '}
        <Button variant="delete-primary" size="md" icon={<SwitchVertical01 />}>Delete w/ Icon</Button>{' '}
        <Button variant="delete-primary" size="md" icon={<SwitchVertical01 />} iconOnly aria-label="Delete" />
        <Button variant="delete-primary" size="md" disabled>Delete Disabled</Button>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Link</h2>
        <Button variant="link-color" size="md">Link Color</Button>{' '}
        <Button variant="link-gray" size="md">Link Gray</Button>{' '}
        <Button variant="link-color" size="md" disabled>Link Disabled</Button>
      </section>
    </main>
  );
} 