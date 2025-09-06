import { SliderImagesResponse, PartnersResponse, ActivitiesResponse, SingleActivityResponse, SettingsResponse } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3001';
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log('Fetching from URL:', url); // Debug log
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response
      );
    }

    const data = await response.json();
    console.log('API Response data:', data); // Debug log
    
    // Handle the typo in API response status
    if (data.status === 'sucsess') {
      data.status = 'success';
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error); // Debug log
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      undefined
    );
  }
}

export const api = {
  // Get slider images
  getSliderImages: (): Promise<SliderImagesResponse> => {
    return fetchApi<SliderImagesResponse>('/slider-image');
  },
  // Get partners
  getPartners: (): Promise<PartnersResponse> => {
    return fetchApi<PartnersResponse>('/partner');
  },
  // Get activities/news
  getActivities: (lastXElement: number = 3): Promise<ActivitiesResponse> => {
    return fetchApi<ActivitiesResponse>(`/activity?lastXElement=${lastXElement}`);
  },
  // Get activities with pagination and search
  getActivitiesPaginated: (page: number = 1, limit: number = 9, search?: string): Promise<ActivitiesResponse> => {
    let endpoint = `/activity?page=${page}&limit=${limit}`;
    if (search && search.trim()) {
      endpoint += `&search=${encodeURIComponent(search.trim())}`;
    }
    return fetchApi<ActivitiesResponse>(endpoint);
  },
  // Get specific activity by ID
  getActivityById: (id: string): Promise<SingleActivityResponse> => {
    return fetchApi<SingleActivityResponse>(`/activity/${id}`);
  },
  // Get website settings
  getSettings: (): Promise<SettingsResponse> => {
    return fetchApi<SettingsResponse>('/setting');
  },
};

// Helper function to construct full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/placeholder.svg';
  
  
  // Construct full URL with base URL
  return `${HOST_URL}/${imagePath}`;
};
