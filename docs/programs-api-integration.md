# Programs API Integration

## Overview
تم دمج API للبرامج في صفحة البرامج الرئيسية وصفحة البرنامج الفردي.

## API Endpoint
- **Base URL**: `/program`
- **Response Format**: JSON مع pagination

## Response Structure
```json
{
  "status": "success",
  "data": {
    "programs": [
      {
        "_id": "string",
        "name": "string",
        "coverImage": {
          "_id": "string",
          "url": "string",
          "fileName": "string",
          "originalName": "string",
          "mimeType": "string",
          "size": "number"
        },
        "description": "string",
        "gallery": [
          {
            "_id": "string",
            "url": "string",
            "fileName": "string",
            "originalName": "string",
            "mimeType": "string",
            "size": "number"
          }
        ],
        "category": "string",
        "status": "string",
        "location": "string",
        "budget": "number",
        "startDate": "string",
        "endDate": "string",
        "manager": "string",
        "numberOfBeneficiary": "number",
        "content": "string",
        "goals": ["string"],
        "activities": ["string"],
        "isDeleted": "boolean",
        "deletedAt": "string | null",
        "created_By": "string",
        "createdAt": "string",
        "__v": "number"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  },
  "message": "string"
}
```

## Files Modified

### 1. `lib/types.ts`
- إضافة `ProgramImage` interface
- إضافة `Program` interface
- إضافة `ProgramsData` interface
- إضافة `ProgramsResponse` و `SingleProgramResponse` types

### 2. `lib/api.ts`
- إضافة `getPrograms()` function للبرامج مع pagination
- إضافة `getProgramById()` function للبرنامج الفردي
- تحديث imports لتشمل types الجديدة

### 3. `app/programs/page.tsx`
- إزالة البيانات الوهمية
- إضافة state management للبرامج
- إضافة loading و error handling
- تحديث عرض البيانات لاستخدام API
- إضافة helper functions لتنسيق البيانات

### 4. `app/programs/[id]/page.tsx`
- إزالة البيانات الوهمية
- إضافة state management للبرنامج الفردي
- إضافة loading و error handling
- تحديث عرض البيانات لاستخدام API
- تحديث معرض الصور لاستخدام gallery من API
- تحديث عرض الأهداف والأنشطة

## Features Added

### صفحة البرامج الرئيسية
- ✅ تحميل البرامج من API
- ✅ Loading state
- ✅ Error handling
- ✅ **البحث في البرامج** - شريط بحث تفاعلي
- ✅ **Pagination** - تنقل بين الصفحات مع عرض معلومات النتائج
- ✅ فلترة البرامج حسب الفئة والحالة
- ✅ عرض معلومات البرنامج (المستفيدين، المدة، الموقع، الميزانية)
- ✅ روابط للبرامج الفردية

### صفحة البرنامج الفردي
- ✅ تحميل البرنامج من API باستخدام ID
- ✅ Loading state
- ✅ Error handling
- ✅ عرض تفاصيل البرنامج الكاملة
- ✅ معرض الصور من gallery
- ✅ عرض الأهداف والأنشطة
- ✅ حساب التقدم الزمني للمشروع
- ✅ معلومات إضافية (المدير، تاريخ الإنشاء)

## Helper Functions
- `formatBudget()`: تنسيق الميزانية
- `calculateDuration()`: حساب مدة المشروع (محسن لعرض السنين والأشهر)
- `calculateProgress()`: حساب نسبة التقدم الزمني
- `getImageUrl()`: بناء URL الصور الكامل
- `handleSearch()`: معالجة البحث وإعادة تحميل البيانات
- `handlePageChange()`: معالجة تغيير الصفحات

## Environment Variables
تأكد من وجود المتغيرات التالية في `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_HOST_URL=http://localhost:3001
```

## Usage
1. تأكد من تشغيل API server
2. تأكد من صحة environment variables
3. قم بزيارة `/programs` لعرض قائمة البرامج
4. اضغط على أي برنامج للانتقال لصفحة التفاصيل

## New Features Added

### 🔍 Search Functionality
- **شريط البحث**: يسمح بالبحث في أسماء البرامج ووصفها
- **بحث فوري**: يتم البحث عند الكتابة مباشرة
- **إعادة تعيين الصفحة**: عند البحث يتم العودة للصفحة الأولى

### 📄 Pagination System
- **عرض محدود**: 9 برامج لكل صفحة
- **معلومات النتائج**: عرض عدد البرامج المعروضة من إجمالي البرامج
- **تنقل ذكي**: أزرار السابق/التالي مع أرقام الصفحات
- **عرض مرن**: يظهر حتى 5 صفحات في كل مرة

### 🎯 Enhanced User Experience
- **Loading states**: أثناء البحث وتغيير الصفحات
- **Error handling**: رسائل خطأ واضحة
- **Responsive design**: يعمل على جميع الأجهزة
- **Bilingual support**: دعم العربية والإنجليزية

## Notes
- جميع الصور تستخدم `getImageUrl()` helper function
- يتم التعامل مع الأخطاء وعرض رسائل مناسبة
- يتم عرض loading states أثناء التحميل
- تم الحفاظ على التصميم الأصلي مع تحديث البيانات
- البحث والفلترة تتم على مستوى API لتحسين الأداء
- Pagination يحسن الأداء عند وجود عدد كبير من البرامج
