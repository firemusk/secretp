import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  // Add any paths you want to be public (not require authentication)
  publicRoutes: ["/", "/blog", "/blog/:id*", "/api/(.*)"],
});

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/new-listing',
    '/new-listing/form',
    '/new-listing/:orgId*',
    '/new-company',
    '/jobs/:orgId*',
    '/jobs/edit/:jobId*',
    '/show/:jobId*',
    '/pricing',
    '/user',
    '/checkout',
    '/api/checkout_sessions',
    '/list-prices',
    '/job-listings',
    '/job-cancel',
    '/job-success',
    //This might need fixing -- it was a Madan quick SEO solution
    '/blog',
    '/blog/:id*'
  ]
};
