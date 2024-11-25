import { NextResponse } from 'next/server';
import { JobModel } from '@/models/Job';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  const baseUrl = 'http://localhost:3000'; // Replace with your production domain when deploying
  
  // Static routes with priority and changefreq
  const staticRoutes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    // { path: '/about', priority: 0.6, changefreq: 'yearly' },
    { path: '/blog', priority: 1.0, changefreq: 'daily' },
    { path: '/fairpay', priority: 0.6, changefreq: 'monthly' },
  ];

  // Connect to the database
  await dbConnect();

  // Fetch job listings with relevant fields
  const jobs = await JobModel.find({}, 'slug status updatedAt').lean();

  // Generate job routes with dynamic prioritization and changefreq
  const jobRoutes = jobs.map((job) => {
    let priority = 0.7; // Default priority for active jobs
    let changefreq = 'daily'; // Default change frequency for active jobs

    // Adjust priority and changefreq based on job status or other conditions
    if (job.status === 'expired') {
      priority = 0.3;
      changefreq = 'never';
    } else if (new Date(job.updatedAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
      // Lower priority for jobs not updated in the last 30 days
      priority = 0.5;
    }

    return {
      path: `/jobs/${job.slug}`,
      priority,
      changefreq,
    };
  });

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...jobRoutes];

  // Generate XML for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(({ path, priority, changefreq }) => {
        return `
        <url>
          <loc>${baseUrl}${path}</loc>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>
      `;
      })
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
