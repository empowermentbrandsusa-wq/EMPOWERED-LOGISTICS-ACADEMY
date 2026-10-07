import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Package, Search, ArrowUpRight } from "lucide-react";
const primaryNav = [
  ["Follow a package", "/journey"],
  ["Follow the money", "/money"],
  ["Find your lane", "/opportunities"],
  ["Start a carrier", "/academy/carrier"],
  ["Tools", "/tools"],
  ["Resources", "/resources"],
];
const exploreNav = [
  ["Academy home", "/academy"],
  ["Carrier master course", "/academy/carrier"],
  ["Warehouse master course", "/academy/warehouse"],
  ["Vehicle center", "/vehicles"],
  ["Start with what you have", "/start/start-small"],
  ["Business registration", "/start/business-registration"],
  ["Partner proposal", "/proposal"],
  ["Your progress", "/progress"],
  ["About", "/about"],
];
export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document
      .querySelectorAll("details.nav-group[open],details.mobile-menu[open]")
      .forEach((el) => el.removeAttribute("open"));
    const main = document.querySelector<HTMLElement>("main");
    if (location.pathname !== "/") main?.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      const heading = document.querySelector("h1")?.textContent;
      document.title =
        location.pathname === "/"
          ? "Empowered Logistics Academy — Every order creates opportunity"
          : `${heading || "Empowered Logistics Academy"} | Empowered Logistics Academy`;
    });
  }, [location.pathname]);
  const closeOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      const detail = (event.target as HTMLElement).closest("details");
      detail?.removeAttribute("open");
      detail?.querySelector("summary")?.focus();
    }
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" onKeyDown={closeOnEscape}>
        <div className="header-top">
          <Link
            className="brand"
            to="/"
            aria-label="Empowered Logistics Academy home"
          >
            <span className="brand-mark">
              <Package size={25} />
            </span>
            <span>
              EMPOWERED<span className="brand-sub">LOGISTICS ACADEMY</span>
            </span>
          </Link>
          <div className="header-actions">
            <Link to="/search" className="search-link">
              <Search size={18} />
              <span>Search the academy</span>
            </Link>
            <ButtonCta />
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">Menu ☰</summary>
            <nav aria-label="Mobile navigation">
              <Link to="/">Home</Link>
              {primaryNav.map(([label, to]) => (
                <Link key={label} to={to}>
                  {label}
                </Link>
              ))}
              <div>
                <strong>Explore the Academy</strong>
                {exploreNav.map(([label, to]) => (
                  <Link key={label} to={to}>
                    {label}
                  </Link>
                ))}
              </div>
              <Link to="/search">Search</Link>
            </nav>
          </details>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          {primaryNav.map(([label, to]) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
          <details className="nav-group" name="desktop-navigation">
            <summary>
              Explore <span aria-hidden="true">⌄</span>
            </summary>
            <div className="mega-panel">
              <p className="eyebrow">Go deeper</p>
              <div>
                {exploreNav.map(([label, to]) => (
                  <Link key={label} to={to}>
                    {label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        {location.pathname !== "/" && (
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={"/" + location.pathname.split("/")[1]}>
              {location.pathname.split("/")[1].replace(/-/g, " ")}
            </Link>
            {location.pathname.split("/").length > 2 && (
              <>
                <span>/</span>
                <span>
                  {location.pathname
                    .split("/")
                    .slice(2)
                    .join(" / ")
                    .replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>
        )}
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-title">
          Every order
          <br />
          <em>creates opportunity.</em>
        </div>
        <div>
          <p>Learn the system. Find your lane. Build your business.</p>
          <div className="footer-links">
            <Link to="/about">Our purpose</Link>
            <Link to="/resources">Our sources</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/progress">Your learning</Link>
          </div>
          <p className="small">
            © {new Date().getFullYear()} Empowered Logistics Academy.
            <br />
            Education and assumption-based models. Verify current requirements
            with the responsible agency and qualified professionals.
          </p>
        </div>
      </footer>
    </>
  );
}
function ButtonCta() {
  return (
    <Link className="button compact" to="/find-your-lane">
      Find your lane <ArrowUpRight size={16} />
    </Link>
  );
}
