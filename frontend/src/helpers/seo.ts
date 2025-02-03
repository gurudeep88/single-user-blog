import { APP_NAME, FB_APP_ID, OG_TYPE } from "@/config";
import { Metadata } from "next";

export async function generateUniqueMetadata({
    title, description, ogTitle, canonicalBaseUrl, ogBaseUrl, ogImage, pathname 
}: {
  title: string, description: string, ogTitle: string; canonicalBaseUrl: string, ogBaseUrl: string, ogImage: string; pathname: string
}): Promise<Metadata> {
    return {
      title: `${title} | ${APP_NAME}`,
      description,
      openGraph: {
        title: `${ogTitle}`,
        description,
        url: `${ogBaseUrl}${pathname}`,
        siteName: `${APP_NAME}`,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
            secureUrl: ogImage,
            type: 'images/jpg'
          },
        ],
        type: `${OG_TYPE}`,
      },
      alternates: {
        canonical: `${canonicalBaseUrl}${pathname}`,
      },
      facebook: {
        appId: `${FB_APP_ID}`
      }
    };
  }