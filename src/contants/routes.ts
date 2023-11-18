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
import UnitManagement from "@/views/AdminDashboard/pages/CourseManagement/UnitManagement";
import TopicManagement from "@/views/AdminDashboard/pages/CourseManagement/TopicManagement";
import CourseDetailPage from "@/views/AdminDashboard/pages/CourseManagement/courses/CourseDetailPage";
import ApprovalRequest from "@/views/AdminDashboard/pages/ApprovalRequest";

interface IRoute {
  name: string;
  path: string;
  Element: () => JSX.Element;
  requireAdmin?: boolean;
  adminRoute?: boolean;
  hiddenInMenu?: boolean;
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
  {
    name: "Tương tác",
    path: "/communication",
    Element: Communication,
    adminRoute: true,
  },
  {
    name: "Hiệu suất",
    path: "/performance",
    Element: Performance,
    adminRoute: true,
    children: [
      {
        name: "Học viên",
        path: "/performance/question",
        Element: Student,
        adminRoute: true,
      },
      {
        name: "Đánh giá",
        path: "/performance/question",
        Element: Review,
        adminRoute: true,
      },
    ],
  },
  {
    name: "Công cụ",
    path: "/tools",
    Element: Tools,
    adminRoute: true,
  },
  {
    name: "Người dùng",
    path: "/tools",
    Element: Tools,
    requireAdmin: true,
    adminRoute: true,
  },
  {
    name: "Đơn xét duyệt",
    path: "/approval-request",
    Element: ApprovalRequest,
    requireAdmin: true,
    adminRoute: true,
  },
];
