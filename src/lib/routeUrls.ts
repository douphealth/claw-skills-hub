export const SITE_URL = "https://openclaw-skillshub.com";

export const categoryPath = (categorySlug: string) => `/skills/${categorySlug}/`;

export const skillPath = (categorySlug: string, skillSlug: string) =>
  `${categoryPath(categorySlug)}${skillSlug}/`;

export const categoryUrl = (categorySlug: string) => `${SITE_URL}${categoryPath(categorySlug)}`;

export const skillUrl = (categorySlug: string, skillSlug: string) =>
  `${SITE_URL}${skillPath(categorySlug, skillSlug)}`;
