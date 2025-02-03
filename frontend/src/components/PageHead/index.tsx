'use client';
import { APP_NAME, FB_APP_ID, OG_TYPE } from '@/config'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import React from 'react'

export const PageHead = ({
  title, description, ogTitle, canonicalBaseUrl, ogBaseUrl, ogImage 
}: {
  title: string, description: string, ogTitle: string; canonicalBaseUrl: string, ogBaseUrl: string, ogImage: string
}) => {
  const pathname = usePathname();
  return (
    <Head>
        <title>{`${title} | ${APP_NAME}`}</title>
        <meta name='description' content = {description} />
        <meta property='og:title' content={`${ogTitle} | ${APP_NAME}`} />
        <link rel="canonical" href={`${canonicalBaseUrl}${pathname}`} />
        <meta property='og:description' content = {description} />
        <meta property='og:type' content={OG_TYPE} />
        <meta property='og:url' content={`${ogBaseUrl}${pathname}`} />
        <meta property='og:site-name' content={`${APP_NAME}`} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:image:secure_url' content={ogImage}/>
        <meta property='og:image:type' content='images/jpg'/>
        <meta property='fb:app_id' content={FB_APP_ID} />
    </Head>
  )
}

export default PageHead