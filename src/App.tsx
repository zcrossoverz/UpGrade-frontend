import { Routes, Route } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./contants/routes";
import NotFound from "./components/404/NotFound";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const login = true;
  const admin = true;
  return (
    <>
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
    </>
  );
}

export default App;
