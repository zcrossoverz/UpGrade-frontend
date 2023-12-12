import Setting from "@/views/Setting";
import CourseDetails from "../views/CourseDetails";
import HomePage from "../views/Home";
import Learning from "@/views/Learning";
import Cart from "@/views/Cart";
import MyLibrary from "@/views/MyLibrary";
import CourseManagement from "@/views/AdminDashboard/pages/CourseManagement";
import Dashboard from "@/views/AdminDashboard/pages/Dashboard";
import Performance from "@/views/AdminDashboard/pages/Performance";
import Student from "@/views/AdminDashboard/pages/Performance/Student";
import UnitManagement from "@/views/AdminDashboard/pages/CourseManagement/UnitManagement";
import TopicManagement from "@/views/AdminDashboard/pages/CourseManagement/TopicManagement";
import CourseDetailPage from "@/views/AdminDashboard/pages/CourseManagement/courses/CourseDetailPage";
import ApprovalRequest from "@/views/AdminDashboard/pages/ApprovalRequest";
import Search from "@/views/Search";
import UserManagement from "@/views/AdminDashboard/pages/UserManagement";
import ReviewPerformancce from "@/views/AdminDashboard/pages/Performance/Review";

interface IRoute {
  name: string;
  path: string;
  Element: () => JSX.Element;
  requireAdmin?: boolean;
  adminRoute?: boolean;
  hiddenInMenu?: boolean;
  params?: string[];
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
    name: "tìm kiếm",
    path: "/search",
    Element: Search,
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
    path: "/learning/:course_id/:topic_id",
    Element: Learning,
  },
  {
    name: "Tổng quan",
    path: "/overview",
    Element: Dashboard,
    requireAdmin: true,
    adminRoute: true,
  },
  {
    name: "Khóa học",
    path: "/course-management",
    Element: CourseManagement,
    params: ["user_id"],
    adminRoute: true,
    children: [
      {
        name: "Quản lý nội dung khóa học",
        path: "/edit/:course_id",
        Element: UnitManagement,
        adminRoute: true,
        hiddenInMenu: true,
      },
      {
        name: "Quản lý nội dung chương",
        path: "/edit/:course_id/:unit_id",
        Element: TopicManagement,
        adminRoute: true,
        hiddenInMenu: true,
      },
      {
        name: "Chỉnh sửa khóa học",
        path: "/details/:course_id",
        Element: CourseDetailPage,
        adminRoute: true,
        hiddenInMenu: true,
      },
    ],
  },
  // {
  //   name: "Hiệu suất",
  //   path: "/performance",
  //   Element: Performance,
  //   adminRoute: true,
  //   children: [
  //     {
  //       name: "Tổng quan",
  //       path: "",
  //       Element: Performance,
  //       adminRoute: true,
  //     },
  //     {
  //       name: "Học viên",
  //       path: "/performance/question",
  //       Element: Student,
  //       adminRoute: true,
  //     },
  //     {
  //       name: "Đánh giá",
  //       path: "/performance/review",
  //       Element: ReviewPerformancce,
  //       adminRoute: true,
  //     },
  //   ],
  // },
  {
    name: "Kiểm duyệt",
    path: "/approval-request",
    Element: ApprovalRequest,
    requireAdmin: true,
    adminRoute: true,
  },
  {
    name: "Tài khoản",
    path: "/user-management",
    Element: UserManagement,
    requireAdmin: true,
    adminRoute: true,
  },
];
