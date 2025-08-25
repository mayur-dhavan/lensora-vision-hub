
import { Helmet } from "react-helmet-async";
import { SEO_DEFAULTS, BRAND_NAME } from "@/lib/constants";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image,
  url = "",
  type = "website"
}: SEOHeadProps) => {
  const seoTitle = title ? `${title} - ${BRAND_NAME}` : SEO_DEFAULTS.title;
  const seoDescription = description || SEO_DEFAULTS.description;
  const seoKeywords = keywords || SEO_DEFAULTS.keywords;
  const seoUrl = `${window.location.origin}${url}`;
  
  // Use a default image if none provided, ensure it's absolute
  const defaultImage = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  const seoImage = image 
    ? (image.startsWith('http') ? image : `${window.location.origin}${image}`)
    : defaultImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND_NAME} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={BRAND_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEOHead;
