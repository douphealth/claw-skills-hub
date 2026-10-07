import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Download, RefreshCw } from "lucide-react";

const proofPoints = [
  {
    icon: CreditCard,
    title: "Stripe-hosted checkout",
    text: "Payment details are collected by Stripe Checkout rather than by this website.",
  },
  {
    icon: ShieldCheck,
    title: "Verified fulfillment",
    text: "Premium access is granted only after Stripe confirms a successful payment.",
  },
  {
    icon: Download,
    title: "Private delivery",
    text: "Paid bundle downloads use short-lived signed URLs instead of public permanent files.",
  },
  {
    icon: RefreshCw,
    title: "Idempotent purchase records",
    text: "Webhook retries are safe: each Stripe Checkout Session maps to one purchase record.",
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">A payment flow built for reliability</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The paid flow is designed around Stripe confirmation and private delivery rather than browser-only success messages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofPoints.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-xl border bg-card"
            >
              <item.icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
