import { Routes, Route } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./contants/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./components/404/NotFound";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getToken } from "./utils/authentication";
import AdminDashboard from "./views/AdminDashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAdmin } = useAuth();

  const tokenExists = getToken() !== null;

  return (
    <>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        {PUBLIC_ROUTES.map(({ name, path, Element }) => (
          <Route key={name} path={path} element={<Element />} />
        ))}
        {PRIVATE_ROUTES.filter(
          ({ adminRoute }) => adminRoute === undefined || false
        ).map(({ name, path, Element }) => {
          return tokenExists ? (
            <Route key={name} path={path} element={<Element />} />
          ) : (
            <Route key={"error"} path={path} element={<NotFound />} />
          );
        })}
        {tokenExists && (
          <Route path='/admin' element={<AdminDashboard />}>
            {PRIVATE_ROUTES.filter(({ adminRoute }) => adminRoute === true).map(
              ({ name, path, Element, requireAdmin, children, params }) => {
                return tokenExists &&
                  (!requireAdmin || (requireAdmin && isAdmin)) ? (
                  children !== undefined ? (
                    <>
                      {children.map((child) => (
                        <Route
                          key={child.name}
                          path={path.replace("/", "") + child.path}
                          element={<child.Element />}
                        />
                      ))}
                      {params !== undefined && (
                        <Route
                          key={name}
                          path={`${path.replace("/", "")}${params.map(
                            (e) => `/:${e}`
                          )}`}
                          element={<Element />}
                        />
                      )}
                      <Route
                        key={name}
                        path={`${path.replace("/", "")}`}
                        element={<Element />}
                      />
                    </>
                  ) : (
                    <Route
                      key={name}
                      path={path.replace("/", "")}
                      element={<Element />}
                    />
                  )
                ) : (
                  <Route
                    key={"error"}
                    path={path.replace("/", "")}
                    element={<NotFound />}
                  />
                );
              }
            )}
          </Route>
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

function MainApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default MainApp;
