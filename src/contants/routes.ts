import Setting from "@/views/Setting";
import CourseDetails from "../views/CourseDetails";
import HomePage from "../views/Home";
import Learning from "@/views/Learning";
import Cart from "@/views/Cart";
import MyLibrary from "@/views/MyLibrary";
import CourseManagement from "@/views/AdminDashboard/pages/CourseManagement";
import Dashboard from "@/views/AdminDashboard/pages/Dashboard";
import Communication from "@/views/AdminDashboard/pages/Communication";
import Performance from "@/views/AdminDashboard/pages/Performance";
import Tools from "@/views/AdminDashboard/pages/Tools";
import Student from "@/views/AdminDashboard/pages/Performance/Student";
import Review from "@/views/Learning/Review";

interface IRoute {
  name: string;
  path: string;
  Element: () => JSX.Element;
  requireAdmin?: boolean;
  children?: Array<IRoute>;
}

export const PUBLIC_ROUTES: Array<IRoute> = [
  {
    name: "home",
    path: "/",
    Element: HomePage,
  },
  {
    name: "course detail",
    path: "/course-details/:id",
    Element: CourseDetails,
  },
  {
    name: "course detail",
    path: "/cart",
    Element: Cart,
  },
];

export const PRIVATE_ROUTES: Array<IRoute> = [
  {
    name: "course detail",
    path: "/settings",
    Element: Setting,
  },
  {
    name: "course detail",
    path: "/my-library",
    Element: MyLibrary,
  },
  {
    name: "course detail",
    path: "/learning/:id",
    Element: Learning,
  },
  {
    name: "Tổng quan",
    path: "",
    Element: Dashboard,
    requireAdmin: true,
  },
  {
    name: "Khóa học",
    path: "/course-management",
    Element: CourseManagement,
    requireAdmin: true,
  },
  {
    name: "Tương tác",
    path: "/communication",
    Element: Communication,
    requireAdmin: true,
  },
  {
    name: "Hiệu suất",
    path: "/performance",
    Element: Performance,
    requireAdmin: true,
    children: [
      {
        name: "Học viên",
        path: "/performance/question",
        Element: Student,
        requireAdmin: true,
      },
      {
        name: "Đánh giá",
        path: "/performance/question",
        Element: Review,
        requireAdmin: true,
      },
    ],
  },
  {
    name: "Công cụ",
    path: "/tools",
    Element: Tools,
    requireAdmin: true,
  },
  {
    name: "Người dùng",
    path: "/tools",
    Element: Tools,
    requireAdmin: true,
  },
  {
    name: "Thiết lập",
    path: "/tools",
    Element: Tools,
    requireAdmin: true,
  },
];
