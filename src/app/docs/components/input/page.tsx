'use client';

import React from 'react';
import Input from '@/components/Input';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { Mail, Lock, Search } from 'lucide-react';

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

export default function InputPage() {
  return (
    <div>
      <PageHeader
        title="Input"
        description="Text input fields with optional labels, hint text, error messages, and leading/trailing icons. Focus state uses an amber ring with a 2px white gap."
      />

      {/* Default — shows both sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Default')}
        {sectionDesc('Basic input with label and placeholder. Two sizes: md (44px, default) and sm (40px).')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="Email address" placeholder="you@example.com" />
            <Input label="Email address" placeholder="you@example.com" inputSize="sm" />
          </div>
        </PreviewBox>
      </section>

      {/* Hint text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With hint text')}
        {sectionDesc('Hint text sits between the label and input, providing guidance before the user interacts.')}
        <PreviewBox>
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <Input
              label="Username"
              hintText="Must be 3–20 characters, letters and numbers only."
              placeholder="johndoe"
            />
          </div>
        </PreviewBox>
      </section>

      {/* Focus state */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Focus state')}
        {sectionDesc('On focus: 2px solid black border + amber focus ring (2px white gap, 6px amber spread). Click the input below.')}
        <PreviewBox>
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <Input
              label="Label"
              hintText="This is a hint message text to guide users."
              placeholder="Click to focus…"
            />
          </div>
        </PreviewBox>
      </section>

      {/* Error state */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Error state')}
        {sectionDesc('Error message appears above the input field with an alert icon. Border turns red. Focus ring remains amber.')}
        <PreviewBox>
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <Input
              label="Email address"
              hintText="This is a hint message text to guide users."
              defaultValue="invalid-email"
              errorText="This is an error message text."
            />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled')}
        {sectionDesc('Disabled inputs are non-interactive. Label, hint text, and value all dim to the disabled color.')}
        <PreviewBox>
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <Input
              label="Account ID"
              hintText="This is a hint message text to guide users."
              defaultValue="This is text to fill the input."
              state="disabled"
            />
          </div>
        </PreviewBox>
      </section>

      {/* Read-only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Read-only')}
        {sectionDesc('Read-only removes the border entirely. Text uses medium weight and moderate color — distinct from disabled.')}
        <PreviewBox>
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <Input
              label="API Key"
              hintText="This is a hint message text to guide users."
              defaultValue="sk-live-xxxxxxxxxxxxxxxx"
              state="readonly"
            />
          </div>
        </PreviewBox>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With icons')}
        {sectionDesc('Leading and trailing icons reinforce input purpose.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="Search" placeholder="Search…" leadingIcon={<Search width={16} height={16} />} />
            <Input label="Email" placeholder="you@example.com" leadingIcon={<Mail width={16} height={16} />} />
            <Input label="Password" type="password" placeholder="••••••••" trailingIcon={<Lock width={16} height={16} />} />
          </div>
        </PreviewBox>
      </section>

      {/* Domain type */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Type: Domain')}
        {sectionDesc('A left add-on shows a URL prefix (default: https://). Useful for domain or URL inputs where the scheme is fixed.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="Website" inputType="domain" placeholder="yoursite.com" />
            <Input label="Custom prefix" inputType="domain" prefix="app://" placeholder="yoursite.com" />
            <Input label="Disabled" inputType="domain" defaultValue="yoursite.com" state="disabled" />
          </div>
        </PreviewBox>
      </section>

      {/* Copy type */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Type: Copy')}
        {sectionDesc('A right add-on Copy button writes the input value to the clipboard. Shows "Copied!" feedback for 2 seconds.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="API Key" inputType="copy" defaultValue="sk-live-abc123xyz456" />
            <Input label="With hint" inputType="copy" hintText="Share this link with your team." defaultValue="https://app.example.com/invite/abc" />
            <Input label="Disabled" inputType="copy" defaultValue="sk-live-abc123xyz456" state="disabled" />
          </div>
        </PreviewBox>
      </section>

      {/* Currency type */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Type: Currency')}
        {sectionDesc('Inline currency symbol on the left and a currency code dropdown on the right. Use currencySymbol and currencyCode to customise.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="Amount" inputType="currency" placeholder="0.00" />
            <Input label="EUR amount" inputType="currency" currencySymbol="€" currencyCode="EUR" placeholder="0.00" />
            <Input label="Disabled" inputType="currency" defaultValue="1,250.00" state="disabled" />
          </div>
        </PreviewBox>
      </section>

      {/* Phone type */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Type: Phone')}
        {sectionDesc('A country code dropdown on the left lets users select their region. Use countryCode to set the default.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '320px', width: '100%' }}>
            <Input label="Phone number" inputType="phone" placeholder="+1 (555) 000-0000" />
            <Input label="UK number" inputType="phone" countryCode="GBR" placeholder="+44 20 0000 0000" />
            <Input label="Disabled" inputType="phone" defaultValue="+1 (555) 000-0000" state="disabled" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text rendered above the input.' },
          { name: 'hintText', type: 'string', description: 'Hint text shown below the label and above the input field.' },
          { name: 'helperText', type: 'string', description: 'Helper text shown below the input (hidden when errorText is present).' },
          { name: 'errorText', type: 'string', description: 'Error message shown above the input with an alert icon. Triggers the error border.' },
          { name: 'inputType', type: "'default' | 'domain' | 'copy' | 'currency' | 'phone'", default: "'default'", description: 'Structural variant of the input.' },
          { name: 'leadingIcon', type: 'React.ReactNode', description: 'Icon rendered inside the left edge of the input (default type only).' },
          { name: 'trailingIcon', type: 'React.ReactNode', description: 'Icon rendered inside the right edge of the input (default type only).' },
          { name: 'inputSize', type: "'sm' | 'md'", default: "'md'", description: 'Input height: 40px (sm) or 44px (md).' },
          { name: 'state', type: "'default' | 'disabled' | 'error' | 'readonly'", default: "'default'", description: 'Visual and interaction state.' },
          { name: 'prefix', type: 'string', default: "'https://'", description: 'Domain type: text shown in the left add-on.' },
          { name: 'currencySymbol', type: 'string', default: "'$'", description: 'Currency type: symbol shown left of the amount.' },
          { name: 'currencyCode', type: 'string', default: "'USD'", description: 'Currency type: code shown in the right dropdown.' },
          { name: 'countryCode', type: 'string', default: "'USA'", description: 'Phone type: country code shown in the left dropdown.' },
          { name: 'onCopy', type: '() => void', description: 'Copy type: custom handler when Copy is clicked (overrides clipboard write).' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled — equivalent to state="disabled".' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Native readOnly — equivalent to state="readonly".' },
          { name: '...props', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes are forwarded.' },
        ]} />
      </section>
    </div>
  );
}
