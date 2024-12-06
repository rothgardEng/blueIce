export default function robots(){
  return {
    rules: [
      {
        userAgent: "*",
        allow: '/',
        disallow: ["/auth", "/auth/admin"]
      }
    ],
    sitemap: `${process.env.SITE_MAP}/sitemap.xml`
  }
}
