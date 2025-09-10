import { SliderImagesResponse, PartnersResponse, ActivitiesResponse, SingleActivityResponse, SettingsResponse, ProgramsResponse, SingleProgramResponse, ReportsResponse, ArchiveResponse, SearchResponse } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 30000); // 30s default for slow networks
const MAX_RETRIES = Number(process.env.NEXT_PUBLIC_API_MAX_RETRIES ?? 2);
const RETRY_BACKOFF_MS = Number(process.env.NEXT_PUBLIC_API_RETRY_BACKOFF_MS ?? 1000);
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(status?: number) {
  if (status === undefined) return true; // network error
  if (status === 408 || status === 429) return true;
  if (status >= 500 && status < 600) return true;
  return false;
}

async function fetchWithTimeout(input: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const controller = new AbortController();
  const timeout = init.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const { timeoutMs, signal, ...rest } = init as any;
    const response = await fetch(input, { ...rest, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log('Fetching from URL:', url); // Debug log
  
  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        next: { revalidate: 300 }, // Revalidate every 5 minutes
        timeoutMs: DEFAULT_TIMEOUT_MS,
      } as any);

      if (!response.ok) {
        const apiError = new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          response
        );
        if (shouldRetry(response.status) && attempt < MAX_RETRIES) {
          const backoff = RETRY_BACKOFF_MS * Math.pow(2, attempt);
          await sleep(backoff);
          continue;
        }
        throw apiError;
      }

      const data = await response.json();
      console.log('API Response data:', data); // Debug log
      
      // Handle the typo in API response status
      if (data.status === 'sucsess') {
        data.status = 'success';
      }
      
      return data;
    } catch (error) {
      lastError = error;
      console.error('API Error:', error); // Debug log
      const status = error instanceof ApiError ? error.status : undefined;
      if (shouldRetry(status) && attempt < MAX_RETRIES) {
        const backoff = RETRY_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(backoff);
        continue;
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        undefined
      );
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Unknown error');
}

async function postApi<TResponse, TBody>(endpoint: string, body: TBody): Promise<TResponse> {
  const url = `${BASE_URL}${endpoint}`;
  console.log('Posting to URL:', url, 'with body:', body);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        timeoutMs: DEFAULT_TIMEOUT_MS,
      } as any);

      if (!response.ok) {
        const apiError = new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          response
        );
        if (shouldRetry(response.status) && attempt < MAX_RETRIES) {
          const backoff = RETRY_BACKOFF_MS * Math.pow(2, attempt);
          await sleep(backoff);
          continue;
        }
        throw apiError;
      }

      const data = await response.json();
      console.log('API POST Response data:', data);

      if (data.status === 'sucsess') {
        data.status = 'success';
      }

      return data;
    } catch (error) {
      console.error('API POST Error:', error);
      const status = error instanceof ApiError ? error.status : undefined;
      if (shouldRetry(status) && attempt < MAX_RETRIES) {
        const backoff = RETRY_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(backoff);
        continue;
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        undefined
      );
    }
  }
  throw new ApiError('Network error: exceeded retries');
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
  // Get programs with pagination and search
  getPrograms: (page: number = 1, limit: number = 10, search?: string): Promise<ProgramsResponse> => {
    let endpoint = `/program?page=${page}&limit=${limit}`;
    if (search && search.trim()) {
      endpoint += `&search=${encodeURIComponent(search.trim())}`;
    }
    return fetchApi<ProgramsResponse>(endpoint);
  },
  // Get specific program by ID
  getProgramById: (id: string): Promise<SingleProgramResponse> => {
    return fetchApi<SingleProgramResponse>(`/program/${id}`);
  },
  // Get reports with pagination and search
  getReports: (page: number = 1, limit: number = 10, search?: string, type?: string): Promise<ReportsResponse> => {
    let endpoint = `/report?page=${page}&limit=${limit}`;
    
    // Add search parameter if provided
    if (search && search.trim()) {
      const encodedSearch = encodeURIComponent(search.trim());
      endpoint += `&search=${encodedSearch}`;
      console.log('Search parameter added:', { original: search.trim(), encoded: encodedSearch });
    }
    
    // Add type parameter if provided and not 'all'
    if (type && type !== 'all') {
      const encodedType = encodeURIComponent(type);
      endpoint += `&type=${encodedType}`;
      console.log('Type parameter added:', { original: type, encoded: encodedType });
    }
    
    console.log('Final endpoint:', endpoint);
    return fetchApi<ReportsResponse>(endpoint);
  },
  // Send contact message
  sendMessage: (payload: { name: string; email: string; message: string; subject: string; contactInfo?: string }): Promise<any> => {
    return postApi<any, typeof payload>('/message', payload);
  },
  // Get archive combined data (program + activity)
  getArchive: (
    page: number = 1,
    limit: number = 9,
    types: string[] = ['program','activity'],
    search?: string,
    categoryId?: string
  ): Promise<ArchiveResponse> => {
    let endpoint = `/data?type=${encodeURIComponent(types.join(','))}&page=${page}&limit=${limit}`;
    if (search && search.trim()) {
      endpoint += `&search=${encodeURIComponent(search.trim())}`;
    }
    if (categoryId) {
      endpoint += `&category=${encodeURIComponent(categoryId)}`;
    }
    return fetchApi<ArchiveResponse>(endpoint);
  },
  // Global search
  globalSearch: (
    search?: string,
    categoryIdsCsv?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<SearchResponse> => {
    let endpoint = `/search?page=${page}&limit=${limit}`;
    if (search && search.trim()) {
      endpoint += `&search=${encodeURIComponent(search.trim())}`;
    }
    if (categoryIdsCsv && categoryIdsCsv.trim()) {
      endpoint += `&category=${encodeURIComponent(categoryIdsCsv.trim())}`;
    }
    return fetchApi<SearchResponse>(endpoint);
  },
};

// Helper function to construct full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/placeholder.svg';
  
  
  // Construct full URL with base URL
  return `${HOST_URL}/${imagePath}`;
};
