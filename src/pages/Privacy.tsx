import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Privacy Policy — ClawSkills" description="ClawSkills privacy policy. How we handle your data, cookies, and analytics." canonical="https://openclaw-skillshub.com/privacy" />
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Last updated:</strong> March 1, 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
            <p>ClawSkills collects minimal data to provide and improve our service. We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Usage analytics (page views, interactions) via Google Analytics</li>
              <li>Device and browser information for performance optimization</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Data</h2>
            <p>We use collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Send newsletter updates (with your consent)</li>
              <li>Analyze site performance and improve user experience</li>
              <li>Detect and prevent abuse</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Cookies</h2>
            <p>We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand usage patterns. You can disable cookies in your browser settings.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Third-Party Services</h2>
            <p>We use Google Analytics for usage statistics. Google's privacy policy applies to data they collect. We do not sell your data to third parties.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Data Retention</h2>
            <p>Newsletter subscriber data is retained until you unsubscribe. Analytics data is retained according to Google Analytics' default retention policies.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Your Rights</h2>
            <p>You may request deletion of your data or unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email or contacting us.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
            <p>For privacy-related inquiries, reach out via our community Discord or GitHub.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
