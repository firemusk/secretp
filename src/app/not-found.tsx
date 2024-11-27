export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back home
      </a>
    </div>
  );
}
