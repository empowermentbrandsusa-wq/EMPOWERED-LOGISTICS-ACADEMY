import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./styles.css";
const Journey = lazy(() => import("./pages/Journey"));
const Opportunities = lazy(() => import("./pages/Opportunities"));
const Academy = lazy(() => import("./pages/Academy"));
const Tools = lazy(() => import("./pages/Tools"));
const Resources = lazy(() => import("./pages/Resources"));
const Guides = lazy(() => import("./pages/Guides"));
const Search = lazy(() => import("./pages/Search"));
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <section className="page-head">
        <h1>This view could not load.</h1>
        <p>
          Your saved learning stays on your device. Try refreshing the page.
        </p>
        <button className="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </section>
    ) : (
      this.props.children
    );
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="page-head" role="status">
              Loading your next step…
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="journey" element={<Journey />} />
              <Route path="opportunities/*" element={<Opportunities />} />
              <Route path="academy/*" element={<Academy />} />
              <Route path="tools/*" element={<Tools />} />
              <Route path="resources/*" element={<Resources />} />
              <Route path="search" element={<Search />} />
              {[
                "money",
                "proposal",
                "vehicles",
                "start/*",
                "find-your-lane",
                "glossary",
                "progress",
                "partners",
                "about",
                "privacy",
                "*",
              ].map((path) => (
                <Route key={path} path={path} element={<Guides />} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
