import React from "react";
import AdminLayout from "../../../adminLayout/AdminLayout";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { month: "Tháng 1", users: 400, blogs: 50 },
  { month: "Tháng 2", users: 300, blogs: 40 },
  { month: "Tháng 3", users: 500, blogs: 60 },
  { month: "Tháng 4", users: 200, blogs: 30 },
  { month: "Tháng 5", users: 700, blogs: 80 },
  { month: "Tháng 6", users: 600, blogs: 70 },
  { month: "Tháng 7", users: 450, blogs: 55 },
  { month: "Tháng 8", users: 380, blogs: 45 },
  { month: "Tháng 9", users: 520, blogs: 65 },
  { month: "Tháng 10", users: 610, blogs: 75 },
  { month: "Tháng 11", users: 580, blogs: 68 },
  { month: "Tháng 12", users: 640, blogs: 85 },
];

export default function Page() {
  return (
    <AdminLayout>
      <BarChart
        xAxis={[{ scaleType: "band", data: data.map((item) => item.month) }]}
        series={[
          {
            data: data.map((item) => item.users),
            label: "Users",
            color: "#8884d8",
          },
          {
            data: data.map((item) => item.blogs),
            label: "Blogs",
            color: "#82ca9d",
          },
        ]}
        width={1000}
        height={500}
      />
    </AdminLayout>
  );
}
