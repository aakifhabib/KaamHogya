import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageMetaBar } from '@/components/PageMetaBar';
import { ClientProcessFallback } from '@/components/process/ClientProcessFallback';
import { ProcessDetailView } from '@/components/process/ProcessDetailView';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import {
  getProcessBySlug,
  getProcessSummaries,
  getRelatedProcesses,
} from '@/lib/data';
import { formatPKR } from '@/lib/format';

export const dynamic = 'force-dynamic';

interface ProcessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProcessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: process } = await getProcessBySlug(slug);
  if (!process) {
    return {
      title: `Process Guide | ${SITE_NAME}`,
      description: 'Step-by-step Pakistani government document guide on KaamHoGaya.pk.',
    };
  }

  const canonical = `${SITE_URL}/process/${process.slug}`;
  const description = `${process.title}: Official Normal fee ${formatPKR(
    process.fee_normal
  )}, ${process.documents.length} required documents, ${
    process.steps.length
  } counter-by-counter steps, office address (${process.office_name}), and historical citizen wait reports.`;

  return {
    title: `${process.title} — Exact Fee, Documents & Step-by-Step Guide`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: `${process.title} | ${SITE_NAME}`,
      description,
      modifiedTime: process.last_updated,
    },
  };
}

export default async function ProcessDetailPage({ params }: ProcessPageProps) {
  const { slug } = await params;
  const { data: process, source } = await getProcessBySlug(slug);

  if (!process) {
    if (source === 'supabase') {
      notFound();
    }
    const { data: allProcs } = await getProcessSummaries();
    return (
      <ClientProcessFallback
        slug={slug}
        fallbackRelated={allProcs.slice(0, 3)}
      />
    );
  }

  const related = await getRelatedProcesses(process, 3);
  const totalStepMinutes = process.steps.reduce((acc, s) => acc + s.time_minutes, 0);

  // Schema.org HowTo JSON-LD
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: process.title,
    description: process.summary,
    totalTime: `PT${Math.max(5, totalStepMinutes)}M`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'PKR',
      value: String(process.fee_normal),
    },
    supply: process.documents.map((doc) => ({
      '@type': 'HowToSupply',
      name: `${doc.name} (${doc.type === 'original' ? 'Original' : 'Photocopy'} × ${
        doc.copies_needed
      })`,
    })),
    step: process.steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.step_number,
      name: step.title,
      text: step.description,
    })),
  };

  // Schema.org FAQPage JSON-LD
  const faqJsonLd =
    process.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: process.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <PageMetaBar
        breadcrumbs={[
          { label: 'All Processes', href: '/processes' },
          { label: process.city, href: `/city/${process.city.toLowerCase()}` },
          { label: process.title },
        ]}
        lastUpdated={process.last_updated}
        sourceUrl={process.official_source_url}
      />

      <ProcessDetailView initialProcess={process} relatedProcesses={related} />
    </>
  );
}
