import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

// Match against pages that require authentication
export const config = {
  matcher: [
    // Paths that require authentication
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
    
    // Exclude public routes like '/', '/blog', etc.
    '/((?!api|blog|_next/static|_next/image|favicon.ico).*)', // Auth applied to everything except public routes
  ],
};
