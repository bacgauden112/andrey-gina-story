export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white shadow-sm p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Wedding Admin</h1>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
