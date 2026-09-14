const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const siteUrl = new URL(
  deploymentUrl
    ? deploymentUrl.startsWith("http")
      ? deploymentUrl
      : `https://${deploymentUrl}`
    : "http://localhost:3000",
);
