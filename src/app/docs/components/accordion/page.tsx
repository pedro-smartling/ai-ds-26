'use client';

import React from 'react';
import Accordion, { AccordionItem } from '@/components/Accordion';
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

const sampleContent = (
  <p style={{
    margin: 0,
    fontSize: 'var(--font-size-s)',
    color: 'var(--color-text-moderate)',
    lineHeight: 'var(--line-height-body-s)',
  }}>
    Yes, you can try us for free for 30 days. If you want, we will provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
  </p>
);

const faqItems = [
  { title: 'Is there a free trial available?', content: sampleContent },
  { title: 'Can I change my plan later?', content: <p style={{ margin: 0, fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', lineHeight: 'var(--line-height-body-s)' }}>Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.</p> },
  { title: 'What is your cancellation policy?', content: <p style={{ margin: 0, fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', lineHeight: 'var(--line-height-body-s)' }}>We understand that things change. You can cancel your plan at any time and we will refund your payment within 30 days.</p> },
  { title: 'Can other info be added to an invoice?', content: <p style={{ margin: 0, fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', lineHeight: 'var(--line-height-body-s)' }}>At the moment, the only way to add additional information to invoices is to add the information to the workspace name.</p> },
];

export default function AccordionPage() {
  return (
    <div>
      <PageHeader
        title="Accordion"
        description="Expandable sections that show and hide content. Supports left/right icon positioning, optional dividers, and both controlled and uncontrolled usage."
      />

      {/* Icon left (default) */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Icon left')}
        {sectionDesc('Default layout with the plus/minus toggle icon on the left side.')}
        <PreviewBox>
          <Accordion>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} title={item.title} defaultExpanded={i === 0}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </PreviewBox>
      </section>

      {/* Icon right */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Icon right')}
        {sectionDesc('Toggle icon positioned on the right — useful when the title should lead visually.')}
        <PreviewBox>
          <Accordion>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} title={item.title} iconPosition="right" defaultExpanded={i === 0}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </PreviewBox>
      </section>

      {/* With dividers */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With dividers')}
        {sectionDesc('A top border separates each item. Combine with either icon position.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>Icon left + divider</p>
              <Accordion>
                {faqItems.slice(0, 3).map((item, i) => (
                  <AccordionItem key={i} title={item.title} divider defaultExpanded={i === 0}>
                    {item.content}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>Icon right + divider</p>
              <Accordion>
                {faqItems.slice(0, 3).map((item, i) => (
                  <AccordionItem key={i} title={item.title} iconPosition="right" divider defaultExpanded={i === 0}>
                    {item.content}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* No icon */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('No icon')}
        {sectionDesc('Hide the toggle icon entirely. The full row is still clickable.')}
        <PreviewBox>
          <Accordion>
            {faqItems.slice(0, 3).map((item, i) => (
              <AccordionItem key={i} title={item.title} icon={false} divider defaultExpanded={i === 0}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('AccordionItem Props')}
        <PropsTable rows={[
          { name: 'title', type: 'string', required: true, description: 'Header text for the accordion item.' },
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Content revealed when expanded.' },
          { name: 'icon', type: 'boolean', default: 'true', description: 'Show the plus/minus circle toggle icon.' },
          { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", description: 'Side of the header where the icon renders.' },
          { name: 'divider', type: 'boolean', default: 'false', description: 'Show a top border separator.' },
          { name: 'expanded', type: 'boolean', description: 'Controlled expanded state. Omit for uncontrolled.' },
          { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Initial expanded state (uncontrolled mode).' },
          { name: 'onToggle', type: '(expanded: boolean) => void', description: 'Called when the item is toggled.' },
        ]} />
      </section>
    </div>
  );
}
