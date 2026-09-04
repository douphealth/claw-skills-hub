// Google Analytics 4 Configuration
// Replace 'YOUR-GA4-MEASUREMENT-ID' with your actual GA4 Measurement ID from analytics.google.com
export const GA_MEASUREMENT_ID = "G-EPPKCG2SE3";

type AnalyticsParams = Record<string, unknown>;
type AnalyticsCommand =
  | ["js", Date]
  | ["config", string, AnalyticsParams]
  | ["event", string, AnalyticsParams | undefined];

type AnalyticsWindow = Window & {
  dataLayer?: AnalyticsCommand[];
  gtag?: (...args: AnalyticsCommand) => void;
};

const getAnalyticsWindow = (): AnalyticsWindow | undefined =>
  typeof window === "undefined" ? undefined : (window as AnalyticsWindow);

// Initialize Google Analytics
export const initGA = () => {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow) return;

  // Load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  analyticsWindow.dataLayer ??= [];
  const gtag = (...args: AnalyticsCommand) => {
    analyticsWindow.dataLayer?.push(args);
  };
  analyticsWindow.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });

  console.log("✅ Google Analytics initialized:", GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path: string) => {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow?.gtag) return;

  analyticsWindow.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

// Track custom events
export const trackEvent = (eventName: string, eventParams?: AnalyticsParams) => {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow?.gtag) return;

  analyticsWindow.gtag("event", eventName, eventParams);
};

// Specific event trackers
export const trackSkillView = (skillName: string, category: string) => {
  trackEvent("skill_view", {
    skill_name: skillName,
    category,
  });
};

export const trackSkillClick = (skillId: string, skillName: string) => {
  trackEvent("skill_click", {
    skill_id: skillId,
    skill_name: skillName,
  });
};

export const trackArticleView = (articleTitle: string) => {
  trackEvent("article_view", {
    article_title: articleTitle,
  });
};

export const trackNewsletterSignup = () => {
  trackEvent("newsletter_signup", {
    method: "website",
  });
};

export const trackCategoryFilter = (category: string) => {
  trackEvent("category_filter", {
    selected_category: category,
  });
};
