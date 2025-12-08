export interface OfferSchema {
  "@type": string;
  price?: string | number;
  priceCurrency?: string;
  [key: string]: any;
}

export interface WebApplicationSchema {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  applicationCategory?: string;
  offers?: OfferSchema;
  [key: string]: any;
}

export type StructuredData = WebApplicationSchema | Record<string, any>;

export interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}
