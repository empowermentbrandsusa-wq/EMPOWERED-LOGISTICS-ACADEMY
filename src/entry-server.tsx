import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Opportunities from "./pages/Opportunities";
import Academy from "./pages/Academy";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Search from "./pages/Search";
import Guides from "./pages/Guides";
export function render(path: string) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="journey" element={<Journey />} />
          <Route path="opportunities/*" element={<Opportunities />} />
          <Route path="academy/*" element={<Academy />} />
          <Route path="tools/*" element={<Tools />} />
          <Route path="resources/*" element={<Resources />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<Guides />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}
