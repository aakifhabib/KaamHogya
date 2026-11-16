'use client';

import { DISCLAIMER_SHORT, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import { formatDate, formatPKR } from '@/lib/format';
import type { ProcessDocument, ProcessRecord } from '@/types/database';

export interface PdfChecklistInput {
  process: ProcessRecord;
  selectedCity: string;
  documents: ProcessDocument[];
  checkedIds: Record<string, boolean>;
  customItems?: Array<{ id: string; text: string; checked: boolean }>;
}

/**
 * Generates a crisp, mobile-friendly downloadable PDF checklist using jsPDF
 * loaded lazily on click to keep initial mobile bundle ultra-light.
 */
export async function downloadChecklistPdf({
  process,
  selectedCity,
  documents,
  checkedIds,
  customItems = [],
}: PdfChecklistInput): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // Brand Header Band (#0B5C3F)
  doc.setFillColor(11, 92, 63);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(SITE_NAME, margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(219, 240, 230);
  doc.text(SITE_TAGLINE, margin, 19.5);

  doc.setFontSize(8.5);
  doc.setTextColor(245, 179, 1);
  doc.text(
    `Citizen Document Checklist  |  Updated: ${formatDate(process.last_updated)}`,
    margin,
    25.5
  );

  y = 40;

  // Title & Selected City
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize(process.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6.5 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  doc.text(
    `Selected City: ${selectedCity}   |   Category: ${process.category}   |   Time Needed: ${process.time_required}`,
    margin,
    y
  );
  y += 7;

  // Office & Fee Summary Box
  doc.setFillColor(246, 248, 246);
  doc.setDrawColor(209, 224, 216);
  doc.roundedRect(margin, y, contentWidth, 30, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(11, 92, 63);
  doc.text('OFFICE & FEE SNAPSHOT', margin + 4, y + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(17, 24, 39);
  const officeLine = doc.splitTextToSize(
    `Office: ${process.office_name} — ${process.office_address}`,
    contentWidth - 8
  );
  doc.text(officeLine.slice(0, 2), margin + 4, y + 12.5);

  doc.text(
    `Timings: ${process.office_timings}   |   Best Day: ${process.best_day_to_go}`,
    margin + 4,
    y + 21.5
  );
  doc.text(
    `Official Fees — Normal: ${formatPKR(process.fee_normal)} | Urgent: ${formatPKR(
      process.fee_urgent,
      false
    )} | Executive: ${formatPKR(process.fee_executive, false)}`,
    margin + 4,
    y + 27
  );

  y += 38;

  // Section Title: Required Documents
  const checkedCount = documents.filter((d) => checkedIds[d.id]).length;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(11, 92, 63);
  doc.text(
    `DOCUMENTS TO CARRY (${checkedCount}/${documents.length} READY)`,
    margin,
    y
  );
  y += 6;

  // Document rows
  for (const item of documents) {
    const isChecked = Boolean(checkedIds[item.id]);
    const noteLines = item.note ? doc.splitTextToSize(item.note, contentWidth - 14) : [];
    const nameLines = doc.splitTextToSize(item.name, contentWidth - 46);
    const rowHeight = Math.max(12, nameLines.length * 5 + noteLines.length * 4 + 6);

    if (y + rowHeight > pageHeight - 32) {
      doc.addPage();
      y = 20;
    }

    // Row container
    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(isChecked ? 240 : 255, isChecked ? 250 : 255, isChecked ? 245 : 255);
    doc.roundedRect(margin, y, contentWidth, rowHeight, 1.8, 1.8, 'FD');

    // Checkbox graphic
    doc.setDrawColor(11, 92, 63);
    doc.setLineWidth(0.4);
    if (isChecked) {
      doc.setFillColor(11, 92, 63);
      doc.rect(margin + 3.5, y + 3.5, 4.5, 4.5, 'FD');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('v', margin + 4.8, y + 6.8);
    } else {
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + 3.5, y + 3.5, 4.5, 4.5, 'FD');
    }

    // Document name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(17, 24, 39);
    doc.text(nameLines, margin + 11, y + 6.8);

    // Type & Copies badge on right
    const badgeLabel = `${item.type === 'original' ? 'ORIGINAL' : 'PHOTOCOPY'} x${
      item.copies_needed
    }`;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    if (item.type === 'original') {
      doc.setTextColor(11, 92, 63);
    } else {
      doc.setTextColor(146, 64, 14);
    }
    doc.text(badgeLabel, pageWidth - margin - 3, y + 6.5, { align: 'right' });

    // Note text
    if (noteLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(75, 85, 99);
      doc.text(noteLines, margin + 11, y + 6.8 + nameLines.length * 4.5);
    }

    y += rowHeight + 2.5;
  }

  // Optional custom reminders
  if (customItems.length > 0) {
    if (y + 20 > pageHeight - 32) {
      doc.addPage();
      y = 20;
    }
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(11, 92, 63);
    doc.text('MY PERSONAL REMINDERS', margin, y);
    y += 5.5;

    for (const ci of customItems) {
      if (y + 10 > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(17, 24, 39);
      doc.text(`${ci.checked ? '[x]' : '[ ]'}  ${ci.text}`, margin + 2, y);
      y += 5.5;
    }
  }

  // Footer with official source & disclaimer
  const footerY = Math.max(y + 8, pageHeight - 25);
  if (footerY > pageHeight - 22) {
    doc.addPage();
  }
  const actualFooterY = pageHeight - 22;

  doc.setDrawColor(209, 213, 219);
  doc.line(margin, actualFooterY - 3, pageWidth - margin, actualFooterY - 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 92, 63);
  doc.text(`Official Source: ${process.official_source_url}`, margin, actualFooterY + 1.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(107, 114, 128);
  const discLines = doc.splitTextToSize(DISCLAIMER_SHORT, contentWidth);
  doc.text(discLines, margin, actualFooterY + 6.5);

  const filename = `${process.slug}-${selectedCity.toLowerCase()}-checklist.pdf`;
  try {
    doc.save(filename);
  } catch {
    // Mobile browser fallback using Blob object URL
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}
