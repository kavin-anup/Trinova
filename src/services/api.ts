const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('admin_token');
};

// Helper function to set auth token
const setToken = (token: string) => {
  localStorage.setItem('admin_token', token);
};

// Helper function to remove auth token
const removeToken = () => {
  localStorage.removeItem('admin_token');
};

// Generic fetch wrapper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  const headers = new Headers(options.headers as HeadersInit);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.data?.token) {
      setToken(response.data.token);
    }
    return response;
  },

  logout: () => {
    removeToken();
  },

  getCurrentAdmin: () => apiRequest('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// Hero Slides API
export const heroSlidesAPI = {
  getAll: () => apiRequest('/hero-slides/admin'),
  getPublic: () => apiRequest('/hero-slides'),
  create: (data: any) =>
    apiRequest('/hero-slides/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/hero-slides/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/hero-slides/admin/${id}`, {
      method: 'DELETE',
    }),
  reorder: (slides: Array<{ id: string; order_index: number }>) =>
    apiRequest('/hero-slides/admin/reorder', {
      method: 'PUT',
      body: JSON.stringify({ slides }),
    }),
};

// Home Page Content API
export const homeContentAPI = {
  get: () => apiRequest('/home-content'),
  getAll: () => apiRequest('/home-content/admin'),
  update: (sectionKey: string, contentValue: any, contentType?: string, imageUrl?: string | null) => {
    // Ensure contentValue is a plain string, not an object or JSON
    let cleanValue = contentValue;
    if (typeof contentValue === 'object' && contentValue !== null) {
      cleanValue = contentValue.contentValue || contentValue.value || JSON.stringify(contentValue);
    }
    
    return apiRequest('/home-content/admin', {
      method: 'PUT',
      body: JSON.stringify({ 
        sectionKey, 
        contentValue: cleanValue, 
        contentType: contentType || 'text', 
        imageUrl: imageUrl || null 
      }),
    });
  },
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/home-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Services Page Content API
export const servicesContentAPI = {
  get: () => apiRequest('/services-content'),
  getAll: () => apiRequest('/services-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/services-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// EMS Page Content API
export const emsContentAPI = {
  get: () => apiRequest('/ems-content'),
  getAll: () => apiRequest('/ems-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/ems-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// AI Page Content API
export const aiContentAPI = {
  get: () => apiRequest('/ai-content'),
  getAll: () => apiRequest('/ai-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/ai-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Our Edge Page Content API
export const ourEdgeContentAPI = {
  get: () => apiRequest('/our-edge-content'),
  getAll: () => apiRequest('/our-edge-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/our-edge-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Testimonials Page Content API
export const testimonialsContentAPI = {
  get: () => apiRequest('/testimonials-content'),
  getAll: () => apiRequest('/testimonials-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/testimonials-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Contact Page Content API
export const contactContentAPI = {
  get: () => apiRequest('/contact-content'),
  getAll: () => apiRequest('/contact-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/contact-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Blogs Content API (Hero Section)
export const blogsContentAPI = {
  get: () => apiRequest('/blogs-content'),
  getAll: () => apiRequest('/blogs-content/admin'),
  bulkUpdate: (sections: Array<{ sectionKey: string; contentValue: any; contentType?: string; imageUrl?: string }>) =>
    apiRequest('/blogs-content/admin/bulk', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    }),
};

// Blogs API (Articles)
export const blogsAPI = {
  getAll: () => apiRequest('/blogs/admin/all'),
  getPublic: () => apiRequest('/blogs'),
  getById: (id: string) => apiRequest(`/blogs/${id}`),
  getByIdAdmin: (id: string) => apiRequest(`/blogs/admin/${id}`),
  create: (data: any) =>
    apiRequest('/blogs/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/blogs/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/blogs/admin/${id}`, {
      method: 'DELETE',
    }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiRequest('/services/admin'),
  getPublic: () => apiRequest('/services'),
  create: (data: any) =>
    apiRequest('/services/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/services/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/services/admin/${id}`, {
      method: 'DELETE',
    }),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiRequest('/testimonials/admin'),
  getPublic: () => apiRequest('/testimonials'),
  create: (data: any) =>
    apiRequest('/testimonials/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/testimonials/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/testimonials/admin/${id}`, {
      method: 'DELETE',
    }),
};

// Inquiries API
export const inquiriesAPI = {
  // Public: Submit contact form (no auth required)
  submit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
  }) =>
    apiRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Admin endpoints (auth required)
  getAll: (params?: { status?: string; isRead?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.isRead) queryParams.append('isRead', params.isRead);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    const query = queryParams.toString();
    return apiRequest(`/inquiries/admin${query ? `?${query}` : ''}`);
  },
  getOne: (id: string) => apiRequest(`/inquiries/admin/${id}`),
  update: (id: string, data: any) =>
    apiRequest(`/inquiries/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/inquiries/admin/${id}`, {
      method: 'DELETE',
    }),
  exportCSV: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/inquiries/admin/export/csv`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Export failed');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File, category?: string) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);
    if (category) formData.append('category', category);

    const response = await fetch(`${API_URL}/upload/admin`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadVideo: async (file: File, category?: string) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file); // Backend uses same endpoint for images and videos
    if (category) formData.append('category', category);

    const response = await fetch(`${API_URL}/upload/admin`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadMultiple: async (files: File[], category?: string) => {
    const token = getToken();
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    if (category) formData.append('category', category);

    const response = await fetch(`${API_URL}/upload/admin/multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  getAllMedia: (params?: { category?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    const query = queryParams.toString();
    return apiRequest(`/upload/admin/media${query ? `?${query}` : ''}`);
  },

  deleteMedia: (id: string) =>
    apiRequest(`/upload/admin/media/${id}`, {
      method: 'DELETE',
    }),

  getImageUrl: (filename: string) => `${API_URL}/media/${filename}`,
};

// Site Config API
export const siteConfigAPI = {
  get: () => apiRequest('/site-config'),
  update: (config: Record<string, any>) =>
    apiRequest('/site-config/admin', {
      method: 'PUT',
      body: JSON.stringify({ config }),
    }),
};

// Content API
export const contentAPI = {
  getAll: (section?: string) =>
    apiRequest(section ? `/content/${section}` : '/content'),
  create: (data: any) =>
    apiRequest('/content/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest(`/content/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest(`/content/admin/${id}`, {
      method: 'DELETE',
    }),
};

export { getToken, removeToken };
export default apiRequest;

