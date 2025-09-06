"use client";

import { useSettings } from "./settings-provider";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ColorDemo() {
  const { getMainColor } = useSettings();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        عرض الألوان الديناميكية
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Color Card */}
        <Card>
          <CardHeader>
            <CardTitle>اللون الرئيسي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="w-full h-20 rounded-lg"
              style={{ backgroundColor: getMainColor() }}
            />
            <p className="text-sm text-muted-foreground">{getMainColor()}</p>
            <Button className="bg-primary-custom text-white w-full">
              زر باللون الرئيسي
            </Button>
          </CardContent>
        </Card>

        {/* Gradient Card */}
        <Card>
          <CardHeader>
            <CardTitle>تدرج اللون</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full h-20 rounded-lg gradient-primary" />
            <p className="text-sm text-muted-foreground">تدرج ديناميكي</p>
            <Button className="gradient-primary text-white w-full">
              زر متدرج
            </Button>
          </CardContent>
        </Card>

        {/* Text Color Card */}
        <Card>
          <CardHeader>
            <CardTitle>لون النص</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-primary-custom text-lg font-semibold">
              نص باللون الرئيسي
            </p>
            <p className="text-sm text-muted-foreground">
              يمكن استخدام اللون في النصوص
            </p>
            <Button
              variant="outline"
              className="border-primary-custom text-primary-custom w-full"
            >
              زر بحدود ملونة
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
