"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, PhoneCall, FileText, Gift, CalendarCheck, ShoppingCart } from "lucide-react";

function Content() {
  return (
    <div>
      <main className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tổng số lượng đơn đặt hàng */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Tổng số lượng đơn đặt lịch</div>
                  <div className="text-2xl font-bold">86</div>
                </div>
                <ShoppingCart className="text-green-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Tổng số lượng liên hệ */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Tổng số lượng liên hệ</div>
                  <div className="text-2xl font-bold">680</div>
                </div>
                <PhoneCall className="text-blue-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Tổng số lượng bài viết */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Tổng số lượng bài viết</div>
                  <div className="text-2xl font-bold">680</div>
                </div>
                <FileText className="text-purple-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tổng số lượng bài viết khuyến mại */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold mb-1">Tổng số bài viết khuyến mại</div>
                  <div className="text-sm text-gray-500">54</div>
                </div>
                <Gift className="text-red-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Tổng số lượng đặt lịch */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold mb-1">Tổng số lượng dịch vụ</div>
                  <div className="text-sm text-gray-500">97</div>
                </div>
                <CalendarCheck className="text-amber-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Content;
