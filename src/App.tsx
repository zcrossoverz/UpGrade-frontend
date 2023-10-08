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

function App() {
  const login = true;
  const admin = true;

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
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          {PUBLIC_ROUTES.map(({ name, path, Element }) => (
            <Route key={name} path={path} element={<Element />} />
          ))}
          {PRIVATE_ROUTES.map(({ name, path, Element, requireAdmin }) => {
            return login && (!requireAdmin || (requireAdmin && admin)) ? (
              <Route key={name} path={path} element={<Element />} />
            ) : (
              <Route key={"error"} path={path} element={<NotFound />} />
            );
          })}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
