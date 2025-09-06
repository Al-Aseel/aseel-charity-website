// API Response Types
export interface ApiResponse<T> {
  status: string; // Note: API returns "sucsess" (typo) instead of "success"
  data: T;
  message: string;
}

export interface SliderImage {
  _id: string;
  title: string;
  description: string;
  image: {
    _id: string;
    url: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
  isActive: boolean;
  isMainImage: boolean;
  createdBy: string;
  isDeleted: boolean;
  deletedAt: string | null;
  __v: number;
}

export interface SliderImagesData {
  sliderImages: SliderImage[];
}

// Updated to match actual API response structure
export type SliderImagesResponse = ApiResponse<SliderImage[]>;

// Component Types
export interface HeroSlide {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  image: string;
  cta: {
    ar: string;
    en: string;
  };
}

// Partners
export interface PartnerLogo {
  _id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface PartnerItem {
  _id: string;
  name_ar: string;
  name_en: string;
  type: string;
  website: string | null;
  status: string;
  logo: PartnerLogo | null;
  __v: number;
}

export interface PartnersData {
  partners: PartnerItem[];
}

export type PartnersResponse = ApiResponse<PartnersData>;

// Activities/News Types
export interface ActivityImage {
  _id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface Activity {
  _id: string;
  name: string;
  coverImage: ActivityImage;
  gallery: ActivityImage[];
  type: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
  category: string;
  status: string;
  content: string;
  keywords: string[];
  isSpecial: boolean;
  author: string;
  createdAt: string;
  created_by: string;
  __v: number;
}

export interface ActivitiesData {
  activities: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ActivitiesResponse = ApiResponse<ActivitiesData>;

// Single Activity Response
export type SingleActivityResponse = ApiResponse<Activity>;

// Settings Types
export interface WebsiteLogo {
  _id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface WebsiteSettings {
  websiteName_ar: string;
  websiteName_en: string;
  websiteLogo: WebsiteLogo;
  contactNumber: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  whatsappNumber: string;
  website: string;
  description: string;
  mainColor: string;
}

export type SettingsResponse = ApiResponse<WebsiteSettings>;