'use client';

import { Job } from '@/models/Job';

interface JobPostingJsonLdProps {
  job: Job;
}

const JobPostingJsonLd: React.FC<JobPostingJsonLdProps> = ({ job }) => {
  // Convert employment type to Schema.org format
  const getEmploymentType = (type: string) => {
    const types: { [key: string]: string } = {
      'full': 'FULL_TIME',
      'part': 'PART_TIME',
      'contract': 'CONTRACTOR',
      'temporary': 'TEMPORARY',
      'intern': 'INTERN',
    };
    return types[type.toLowerCase()] || type.toUpperCase();
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    validThrough: job.expiresOn,

    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city,
        addressCountry: job.country,
        postalCode: job.postalCode,
        streetAddress: job.street,
        ...(job.state && { addressRegion: job.state }),
      },
    },
    employmentType: getEmploymentType(job.type),
    // Add salary if available
    ...(job.salary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          value: job.salary,
          unitText: 'YEAR',
        },
      },
    }),
    // Add contact information if available
    ...(job.contactEmail && {
      applicationContact: {
        '@type': 'ContactPoint',
        email: job.contactEmail,
        ...(job.contactPhone && { telephone: job.contactPhone }),
        ...(job.contactName && { name: job.contactName }),
      },
    }),
    // Add direct apply link if available
    ...(job.applyLink && {
      applicationUrl: job.applyLink
    }),
    // Add experience level if available
    ...(job.seniority && {
      experienceRequirements: job.seniority
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JobPostingJsonLd;
