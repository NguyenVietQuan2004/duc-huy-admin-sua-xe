"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, DollarSign } from "lucide-react";
function Content() {
  return (
    <div>
      <main className=" grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">New Customers</div>
              <Progress value={83} className="mt-2" />
              <div className="text-sm text-right text-gray-500 mt-1">83%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total Income</div>
                  <div className="text-2xl font-bold">$680</div>
                  <div className="text-green-500 text-sm">+18%</div>
                </div>
                <DollarSign className="text-pink-500 w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-2">This Week</div>
              {/* Add bar chart component here */}
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <BarChart2 className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4">Revenue by Product</div>
              <div className="text-sm text-gray-500">Assigned | Progress | Priority | Budget</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4">Daily Activities</div>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">
                  <span className="text-indigo-500 font-medium">09:46</span> Payment received from John Doe of $385.90
                </li>
                <li>
                  <span className="text-yellow-500 font-medium">09:46</span> New sale recorded
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Content;
