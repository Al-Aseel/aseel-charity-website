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

// Programs Types
export interface ProgramImage {
  _id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface Program {
  _id: string;
  name: string;
  coverImage: ProgramImage;
  description: string;
  gallery: ProgramImage[];
  category: {
    id: string;
    name: string;
  };
  status: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  manager: string;
  numberOfBeneficiary: number;
  content: string;
  goals: string[];
  activities: string[];
  isDeleted: boolean;
  deletedAt: string | null;
  created_By: string;
  createdAt: string;
  __v: number;
}

export interface ProgramsData {
  programs: Program[];
  categories?: Array<{
    name: string;
    ids: Array<{ id: string; type: string }>;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ProgramsResponse = ApiResponse<ProgramsData>;
export type SingleProgramResponse = ApiResponse<Program>;

// Reports Types
export interface ReportFile {
  _id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface Report {
  _id: string;
  title: string;
  type: string;
  author: string;
  createdAt: string;
  status: string;
  file: ReportFile | null;
  isDeleted: boolean;
  deletedAt: string | null;
  __v: number;
}

export interface ReportsData {
  reports: Report[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ReportsResponse = ApiResponse<ReportsData>;

// Archive (combined programs + activities)
export interface ArchivePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  counts?: {
    program?: number;
    activity?: number;
  };
}

export interface ArchiveFilters {
  search: string | null;
  types: string[];
}

export interface ArchiveData {
  data: (Program | Activity)[];
  categories?: Array<{
    name: string;
    ids: Array<{ id: string; type: string }>;
  }>;
  pagination: ArchivePagination;
  filters: ArchiveFilters;
}

export type ArchiveResponse = ApiResponse<ArchiveData>;