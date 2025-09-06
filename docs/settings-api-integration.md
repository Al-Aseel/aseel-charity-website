# Settings API Integration

هذا الدليل يوضح كيفية استخدام API integration للإعدادات العامة في الموقع.

## البنية

### 1. Types (lib/types.ts)
```typescript
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
```

### 2. API Function (lib/api.ts)
```typescript
// Get website settings
getSettings: (): Promise<SettingsResponse> => {
  return fetchApi<SettingsResponse>('/setting');
}
```

### 3. Settings Provider (components/settings-provider.tsx)
يوفر context للإعدادات مع الوظائف التالية:
- `settings`: بيانات الإعدادات
- `loading`: حالة التحميل
- `error`: رسائل الخطأ
- `getLogoUrl()`: الحصول على رابط الشعار
- `getWebsiteName(lang)`: الحصول على اسم الموقع باللغة المطلوبة
- `getDescription()`: الحصول على وصف الموقع
- `getMainColor()`: الحصول على اللون الرئيسي للموقع
- `refreshSettings()`: إعادة تحميل الإعدادات

## الاستخدام

### 1. في المكونات
```tsx
import { useSettings } from '@/components/settings-provider';

export default function MyComponent() {
  const { 
    settings, 
    loading, 
    error, 
    getLogoUrl, 
    getWebsiteName, 
    getDescription, 
    getMainColor 
  } = useSettings();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <img src={getLogoUrl()} alt={getWebsiteName('ar')} />
      <h1>{getWebsiteName('ar')}</h1>
      <p>{getDescription()}</p>
      <p style={{ color: getMainColor() }}>اللون الرئيسي</p>
      <p>{settings?.email}</p>
    </div>
  );
}
```

### 2. في Layout
تم إضافة `SettingsProvider` في `app/layout.tsx` ليكون متاحاً في جميع أنحاء التطبيق.

### 3. مثال على مكون معلومات الاتصال
تم إنشاء `components/contact-info.tsx` كمثال على كيفية استخدام الإعدادات.

## الميزات

- **Cache**: الإعدادات يتم تخزينها مؤقتاً لمدة 5 دقائق
- **Error Handling**: معالجة شاملة للأخطاء
- **Loading States**: حالات تحميل مناسبة
- **Type Safety**: TypeScript types كاملة
- **Fallback Values**: قيم افتراضية في حالة عدم توفر البيانات
- **Suspense Integration**: عرض شاشة تحميل حتى نجاح جلب الإعدادات
- **Error Recovery**: إمكانية إعادة المحاولة في حالة الخطأ
- **Dynamic Description**: وصف ديناميكي للموقع من الإعدادات
- **Dynamic Theme Color**: لون رئيسي ديناميكي يتم تطبيقه على الموقع
- **CSS Custom Properties**: تحديث متغيرات CSS تلقائياً
- **Mobile Theme Color**: تحديث لون شريط الحالة في المتصفحات المحمولة
- **Dynamic Color System**: نظام ألوان ديناميكي يعتمد على mainColor
- **HSL Color Conversion**: تحويل hex إلى HSL لتطبيق أفضل للألوان
- **Custom CSS Classes**: classes مخصصة للون الرئيسي

## API Endpoint

```
GET /setting
```

### Response Format
```json
{
  "status": "sucsess",
  "data": {
    "websiteName_ar": "جمعية أصيل",
    "websiteName_en": "Aseel Foundations",
    "websiteLogo": {
      "_id": "68baf5d43245d0e1e027e793",
      "url": "setting/1757083092312-9fb8761b-a7cc-4486-872c-f7d055cc40f6.png",
      "fileName": "1757083092312-9fb8761b-a7cc-4486-872c-f7d055cc40f6.png",
      "originalName": "Screenshot 2025-08-23 220508.png",
      "mimeType": "image/jpeg",
      "size": 41089
    },
    "contactNumber": "+970594136074",
    "email": "abosido2@gmail.com",
    "address": "Yafa St, Gaza City, Northern Gaza Strip, Palestine",
    "facebook": "https://www.youtube.com/",
    "instagram": "https://www.youtube.com/",
    "twitter": "https://www.youtube.com/",
    "youtube": "https://www.youtube.com/",
    "whatsappNumber": "+972555555",
    "website": "http://www.localhost:3000",
    "description": "وصف الجمعية وصف الجمعية وصف الجمعية وصف الجمعيةوصف الجمعيةوصف الجمعيةوصف الجمعيةوصف الجمعية",
    "mainColor": "#EF4444"
  },
  "message": "تم جلب إعدادات الموقع بنجاح"
}
```

**ملاحظة**: الـ API يرجع `"status": "sucsess"` (خطأ إملائي) بدلاً من `"success"`. تم التعامل مع هذا في الكود تلقائياً.

## Suspense Integration

تم إضافة نظام Suspense لتحسين تجربة المستخدم:

### 1. Loading State (`components/settings-loading.tsx`)
- شاشة تحميل أنيقة مع spinner
- placeholder للشعار واسم الموقع
- رسالة تحميل باللغة العربية

### 2. Error State (`components/settings-error.tsx`)
- عرض رسالة خطأ واضحة
- زر إعادة المحاولة
- تصميم متسق مع باقي التطبيق

### 3. App Content (`components/app-content.tsx`)
- مكون منفصل للمحتوى الرئيسي
- يحتوي على Header و Footer و Main content
- يتم عرضه فقط بعد نجاح تحميل الإعدادات

### 4. Flow
```
1. تحميل التطبيق
2. عرض SettingsLoading
3. جلب الإعدادات من API
4. في حالة النجاح: عرض AppContent
5. في حالة الخطأ: عرض SettingsError مع إمكانية إعادة المحاولة
```

## Dynamic Color System

تم إنشاء نظام ألوان ديناميكي يعتمد على `mainColor` من الإعدادات:

### 1. CSS Custom Properties
```css
:root {
  --primary: [h] [s]% [l]%; /* يتم تحديثه ديناميكياً */
  --primary-foreground: 0 0% 100%;
  --ring: [h] [s]% [l]%; /* للتركيز */
  --accent: [h] [s]% [l+20]%; /* لون أفتح */
}
```

### 2. Custom CSS Classes
```css
.text-primary-custom { color: hsl(var(--primary)); }
.bg-primary-custom { background-color: hsl(var(--primary)); }
.border-primary-custom { border-color: hsl(var(--primary)); }
.hover-primary-custom:hover { background-color: hsl(var(--primary)); }
.gradient-primary { background: linear-gradient(135deg, [mainColor] 0%, [mainColor]dd 100%); }
```

### 3. الاستخدام في المكونات
```tsx
import { useSettings } from '@/components/settings-provider';

export default function MyComponent() {
  const { getMainColor } = useSettings();

  return (
    <div>
      {/* استخدام CSS classes */}
      <Button className="bg-primary-custom text-white">
        زر باللون الرئيسي
      </Button>
      
      {/* استخدام inline styles */}
      <div style={{ backgroundColor: getMainColor() }}>
        خلفية باللون الرئيسي
      </div>
      
      {/* استخدام gradient */}
      <div className="gradient-primary">
        خلفية متدرجة
      </div>
    </div>
  );
}
```

## التحديثات المطبقة

1. ✅ إضافة types للإعدادات في `lib/types.ts`
2. ✅ إضافة API function في `lib/api.ts`
3. ✅ إنشاء SettingsProvider في `components/settings-provider.tsx`
4. ✅ تحديث `app/layout.tsx` لإضافة SettingsProvider
5. ✅ تحديث `components/header.tsx` لاستخدام الإعدادات
6. ✅ تحديث `components/footer.tsx` لاستخدام الإعدادات
7. ✅ إنشاء مكون مثال `components/contact-info.tsx`
8. ✅ إضافة YouTube إلى روابط الشبكات الاجتماعية في Footer
9. ✅ تصفية روابط الشبكات الاجتماعية الفارغة (عدم عرض الأيقونات إذا كانت الروابط فارغة)
10. ✅ إضافة Suspense لتحميل الإعدادات (عرض شاشة تحميل حتى نجاح جلب الإعدادات)
11. ✅ إضافة الحقول الجديدة: description و mainColor
12. ✅ إضافة ThemeColorProvider لتطبيق اللون الرئيسي ديناميكياً
13. ✅ تحديث الموقع بالكامل ليعتمد على mainColor من الإعدادات
14. ✅ إضافة CSS classes مخصصة للون الرئيسي
15. ✅ تحويل hex إلى HSL لتطبيق أفضل للألوان
