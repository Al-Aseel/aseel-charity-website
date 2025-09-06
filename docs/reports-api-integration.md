# Reports API Integration

## Overview
This document describes the integration of the Reports API in the charity website.

## API Endpoint
```
GET /report
```

## Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number for pagination |
| `limit` | number | No | 10 | Number of reports per page |
| `search` | string | No | - | Search query for report titles |
| `type` | string | No | - | Filter by report type (financial, management, media) |

## Example URLs
```
# Get first page with default limit
/report?page=1&limit=10

# Search for reports
/report?page=1&limit=10&search=إضافة تقرير جديد

# Filter by type
/report?page=1&limit=10&type=financial

# Combined search and filter
/report?page=1&limit=10&type=financial&search=إضافة تقرير جديد
```

## Response Format
```json
{
  "status": "success",
  "data": {
    "reports": [
      {
        "_id": "68b54aa9ddfd620a98e2290b",
        "title": "إضافة تقرير جديد",
        "type": "financial",
        "author": "فريق الإعلام",
        "createdAt": "2025-09-01T00:00:00.000Z",
        "status": "published",
        "file": {
          "_id": "68b7f0cef8abf5743340de15",
          "url": "report/1756885198108-7ec4d8dd-9e68-4b57-bcf8-d433bc32d3fd.pdf",
          "fileName": "1756885198108-7ec4d8dd-9e68-4b57-bcf8-d433bc32d3fd.pdf",
          "originalName": "أصيل2.pdf",
          "mimeType": "application/pdf",
          "size": 595947
        },
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2,
      "totalPages": 1
    }
  },
  "message": "تم جلب التقارير بنجاح"
}
```

## Features Implemented

### 1. Search Functionality
- Real-time search with 500ms debounce
- Search in report titles
- Clear search button
- Search state management

### 2. Filtering
- Filter by report type (financial, management, media)
- Active filter display
- Remove individual filters

### 3. Pagination
- Smart pagination with page numbers
- Previous/Next navigation
- Quick jump to any page
- Page information display

### 4. User Experience
- Loading states with appropriate messages
- Error handling with retry options
- Empty state with helpful actions
- Active parameters display
- Responsive design

## Usage in Components

### API Function
```typescript
import { api } from '@/lib/api';

// Get reports with pagination and search
const response = await api.getReports(page, limit, search, type);
```

### Component State
```typescript
const [reports, setReports] = useState<Report[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [searchQuery, setSearchQuery] = useState("");
const [selectedType, setSelectedType] = useState("all");
```

## URL Encoding
The API properly handles URL encoding for Arabic text:
- Search queries are encoded using `encodeURIComponent()`
- Type parameters are encoded for consistency
- Special characters are properly handled

## Error Handling
- Network errors are caught and displayed
- API errors show appropriate messages
- Retry functionality for failed requests
- Different error messages for search vs. loading

## Performance Optimizations
- Debounced search to reduce API calls
- Proper loading states
- Efficient re-rendering with proper dependencies
- Console logging for debugging (can be removed in production)
