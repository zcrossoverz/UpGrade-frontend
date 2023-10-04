import Setting from "@/views/Setting";
import CourseDetails from "../views/CourseDetails";
import Dashboard from "../views/Dashboard";
import HomePage from "../views/Home";
import MyCourses from "@/views/MyCourses";
import Learning from "@/views/Learning";
import Cart from "@/views/Cart";

interface IRoute {
  name: string;
  path: string;
  Element: () => JSX.Element;
  requireAdmin?: boolean;
}

export const PUBLIC_ROUTES: Array<IRoute> = [
  {
    name: "home",
    path: "/",
    Element: HomePage,
  },
  {
    name: "course detail",
    path: "/c",
    Element: CourseDetails,
  },
  {
    name: "course detail",
    path: "/s",
    Element: Setting,
  },
  {
    name: "course detail",
    path: "/my-courses",
    Element: MyCourses,
  },
  {
    name: "course detail",
    path: "/learning/:id",
    Element: Learning,
  },
  {
    name: "course detail",
    path: "/cart",
    Element: Cart,
  },
];

export const PRIVATE_ROUTES: Array<IRoute> = [
  {
    name: "dashboard",
    path: "/dashboard",
    Element: Dashboard,
    requireAdmin: true,
  },
];
