import Setting from "@/views/Setting";
import CourseDetails from "../views/CourseDetails";
import Dashboard from "../views/Dashboard";
import HomePage from "../views/Home";

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
];

export const PRIVATE_ROUTES: Array<IRoute> = [
  {
    name: "dashboard",
    path: "/dashboard",
    Element: Dashboard,
    requireAdmin: true,
  },
];
