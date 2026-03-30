'use client';

import React, { useState } from 'react';
import Steps, { StepItem } from '@/components/Steps';
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

const sampleSteps: StepItem[] = [
  { title: 'Account setup', description: 'Create your workspace and invite team members.' },
  { title: 'Connect source', description: 'Link your CMS, code repository, or file storage.' },
  { title: 'Configure languages', description: 'Choose source and target language pairs.' },
  { title: 'Set up workflow', description: 'Define translation steps and quality checks.' },
  { title: 'Review & launch', description: 'Verify settings and start translating.' },
];

const shortSteps: StepItem[] = [
  { title: 'Upload' },
  { title: 'Review' },
  { title: 'Publish' },
];

function InteractiveDemo() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
      <Steps steps={sampleSteps} currentStep={current} />
      <div style={{ display: 'flex', gap: 'var(--dimension-tier-5)' }}>
        <Button variant="secondary" size="sm" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
          Previous
        </Button>
        <Button variant="primary" size="sm" onClick={() => setCurrent(Math.min(sampleSteps.length - 1, current + 1))} disabled={current === sampleSteps.length - 1}>
          Next step
        </Button>
        <Button variant="link-gray" size="sm" onClick={() => setCurrent(0)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function HorizontalInteractive() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
      <Steps steps={shortSteps} currentStep={current} orientation="horizontal" />
      <div style={{ display: 'flex', gap: 'var(--dimension-tier-5)', justifyContent: 'center' }}>
        <Button variant="secondary" size="sm" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
          Previous
        </Button>
        <Button variant="primary" size="sm" onClick={() => setCurrent(Math.min(shortSteps.length - 1, current + 1))} disabled={current === shortSteps.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default function StepsPage() {
  return (
    <div>
      <PageHeader
        title="Steps"
        description="Steps display progress through a multi-step flow. Each step shows a numbered indicator, title, and optional description. Supports vertical and horizontal orientations."
      />

      {/* Interactive vertical */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive — Vertical')}
        {sectionDesc('Click Next/Previous to advance through the steps. Completed steps show a check icon, the current step has a brand-colored indicator, and upcoming steps are dimmed.')}
        <PreviewBox>
          <InteractiveDemo />
        </PreviewBox>
      </section>

      {/* Interactive horizontal */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive — Horizontal')}
        {sectionDesc('Horizontal orientation for compact flows with fewer steps. Connector lines stretch between step circles.')}
        <PreviewBox>
          <HorizontalInteractive />
        </PreviewBox>
      </section>

      {/* States */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Step states')}
        {sectionDesc('Three visual states: completed (check icon, brand circle), current (number, brand circle), and upcoming (number, gray border).')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-15)' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>At step 3</p>
              <Steps steps={sampleSteps} currentStep={2} />
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>All complete</p>
              <Steps steps={sampleSteps} currentStep={4} />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Without descriptions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without descriptions')}
        {sectionDesc('Steps work with just titles for a more compact display.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-15)' }}>
            <Steps
              steps={[{ title: 'Upload' }, { title: 'Review' }, { title: 'Approve' }, { title: 'Publish' }]}
              currentStep={1}
            />
            <Steps
              steps={[{ title: 'Upload' }, { title: 'Review' }, { title: 'Approve' }, { title: 'Publish' }]}
              currentStep={1}
              orientation="horizontal"
            />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'steps', type: 'StepItem[]', required: true, description: 'Array of step definitions. Each has a title and optional description.' },
          { name: 'currentStep', type: 'number', default: '0', description: 'Zero-based index of the current step. Steps before this are completed, after are upcoming.' },
          { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction of the step flow.' },
        ]} />

        <h3 style={{ fontSize: 'var(--font-size-m)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: 'var(--dimension-tier-9) 0 var(--dimension-tier-6)' }}>
          StepItem object
        </h3>
        <PropsTable rows={[
          { name: 'title', type: 'string', required: true, description: 'Step label text.' },
          { name: 'description', type: 'string', description: 'Optional secondary text below the title.' },
        ]} />
      </section>
    </div>
  );
}
