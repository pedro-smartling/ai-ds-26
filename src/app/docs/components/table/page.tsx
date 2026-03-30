'use client';

import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell, TableCheckboxCell } from '@/components/Table';
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

const sampleData = [
  { id: 1, name: 'Olivia Rhye', email: 'olivia@untitledui.com', role: 'Product Designer', status: 'Active', team: 'Design' },
  { id: 2, name: 'Phoenix Baker', email: 'phoenix@untitledui.com', role: 'Software Engineer', status: 'Active', team: 'Engineering' },
  { id: 3, name: 'Lana Steiner', email: 'lana@untitledui.com', role: 'VP of Sales', status: 'Active', team: 'Sales' },
  { id: 4, name: 'Demi Wilkinson', email: 'demi@untitledui.com', role: 'Frontend Developer', status: 'Inactive', team: 'Engineering' },
  { id: 5, name: 'Candice Wu', email: 'candice@untitledui.com', role: 'Backend Developer', status: 'Active', team: 'Engineering' },
];

function BasicTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Team</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.team}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SelectableTable() {
  const [selected, setSelected] = useState<number[]>([]);
  const allSelected = selected.length === sampleData.length;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? sampleData.map((r) => r.id) : []);
  };

  const toggleOne = (id: number, checked: boolean) => {
    setSelected((prev) => checked ? [...prev, id] : prev.filter((i) => i !== id));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCheckboxCell isHeader checked={allSelected} onChange={toggleAll} />
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id} selected={selected.includes(row.id)}>
            <TableCheckboxCell
              checked={selected.includes(row.id)}
              onChange={(checked) => toggleOne(row.id, checked)}
            />
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--dimension-tier-3)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-body-strong)',
              }}>
                <span style={{
                  width: 'var(--dimension-tier-5)',
                  height: 'var(--dimension-tier-5)',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: row.status === 'Active' ? 'var(--color-green-500)' : 'var(--color-neutral-300)',
                }} />
                {row.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function AlignedTable() {
  const nums = [
    { item: 'Enterprise plan', qty: 12, price: '$49.00', total: '$588.00' },
    { item: 'Additional seats', qty: 5, price: '$12.00', total: '$60.00' },
    { item: 'Premium support', qty: 1, price: '$199.00', total: '$199.00' },
  ];
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Item</TableHeaderCell>
          <TableHeaderCell align="right">Qty</TableHeaderCell>
          <TableHeaderCell align="right">Price</TableHeaderCell>
          <TableHeaderCell align="right">Total</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {nums.map((row) => (
          <TableRow key={row.item}>
            <TableCell>{row.item}</TableCell>
            <TableCell align="right">{row.qty}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function TablePage() {
  return (
    <div>
      <PageHeader
        title="Table"
        description="Tables display structured data in rows and columns. Supports checkboxes for row selection, column alignment, and status badges."
      />

      {/* Basic */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Basic')}
        {sectionDesc('A simple table with header and body rows. Header cells use semibold text on a subtle background; body cells use regular weight with bottom borders.')}
        <PreviewBox>
          <BasicTable />
        </PreviewBox>
      </section>

      {/* With checkboxes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With checkboxes')}
        {sectionDesc('Add a checkbox column for row selection. The header checkbox toggles all rows. Selected rows highlight with a brand tint.')}
        <PreviewBox>
          <SelectableTable />
        </PreviewBox>
      </section>

      {/* Alignment */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Column alignment')}
        {sectionDesc('Numeric columns can be right-aligned for easier scanning.')}
        <PreviewBox>
          <AlignedTable />
        </PreviewBox>
      </section>

      {/* Props */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Table Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'TableHead and TableBody elements.' },
        ]} />
      </section>

      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('TableHeaderCell Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', description: 'Header label text.' },
          { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment.' },
          { name: 'width', type: 'string | number', description: 'Fixed column width.' },
        ]} />
      </section>

      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('TableCell Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', description: 'Cell content.' },
          { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment.' },
          { name: 'width', type: 'string | number', description: 'Fixed column width.' },
        ]} />
      </section>

      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('TableRow Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'TableCell or TableHeaderCell elements.' },
          { name: 'selected', type: 'boolean', default: 'false', description: 'Highlights the row with a brand tint.' },
          { name: 'onClick', type: '() => void', description: 'Row click handler.' },
        ]} />
      </section>

      <section>
        {sectionTitle('TableCheckboxCell Props')}
        <PropsTable rows={[
          { name: 'checked', type: 'boolean', default: 'false', description: 'Checkbox state.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when checkbox is toggled.' },
          { name: 'isHeader', type: 'boolean', default: 'false', description: 'Renders as <th> with header styling.' },
        ]} />
      </section>
    </div>
  );
}
