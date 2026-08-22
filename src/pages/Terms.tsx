import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Terms of Use — ClawSkills" description="ClawSkills terms of use. Rules and guidelines for using the OpenClaw skills directory." canonical="https://openclaw-skillshub.com/terms/" />
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Use</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Last updated:</strong> March 1, 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance</h2>
            <p>By accessing and using ClawSkills (openclaw-skillshub.com), you accept and agree to these Terms of Use. If you do not agree, please discontinue use of the site.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Description of Service</h2>
            <p>ClawSkills is an independent directory and resource hub for OpenClaw skills. We provide skill listings, tutorials, articles, and educational content. We are not affiliated with the OpenClaw project.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Disclaimer</h2>
            <p>All skill listings, ratings, and reviews are provided for informational purposes only. ClawSkills does not guarantee the security, functionality, or reliability of any listed skill. Users install skills at their own risk.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Intellectual Property</h2>
            <p>All original content on ClawSkills (articles, tutorials, guides, and design) is the property of ClawSkills. Skill data and descriptions are sourced from the OpenClaw ecosystem and remain the property of their respective authors.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. User Conduct</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scrape or reproduce content without permission</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to disrupt or compromise the service</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Limitation of Liability</h2>
            <p>ClawSkills is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our service or the installation of any skills listed on the platform.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
