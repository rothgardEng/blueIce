const host = process.env.DOMAIN_PREFIX;
export default function sitemap() {
  return [
    {
      url: `${host}`,
      alternates: {
        languages: {
          en: `${host}/en`,
          es: `${host}/es`,
        },
      },
    },
    {
      url: `${host}/call`,
      alternates: {
        languages: {
          en: `${host}/en/call`,
          es: `${host}/es/call`,
        },
      },
    },
    {
      url: `${host}/news`,
      alternates: {
        languages: {
          en: `${host}/en/news`,
          es: `${host}/es/news`,
        },
      },
    },
    {
      url: `${host}/recs`,
      alternates: {
        languages: {
          en: `${host}/en/recs`,
          es: `${host}/es/recs`,
        },
      },
    },
    {
      url: `${host}/united`,
      alternates: {
        languages: {
          en: `${host}/en/united`,
          es: `${host}/es/united`,
        },
      },
    },
    {
      url: `${host}/joinus`,
      alternates: {
        languages: {
          en: `${host}/en/joinus`,
          es: `${host}/es/joinus`,
        },
      },
    },
   ]
}
