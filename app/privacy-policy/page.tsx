import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-gray-600 mt-1">Last updated: September 12, 2025</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our Privacy Policy. Your privacy is critically important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              The only personal information we currently collect is through our contact and newsletter subscription forms. This may include your name and email address.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to improve your experience on our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              By using our website, you consent to the use of cookies. You can choose to decline cookies, but this may impact your experience on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We take security seriously and take reasonable measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our Privacy Policy, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
