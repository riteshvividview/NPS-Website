"use client";
import RouteJourney from "./RouteJourney";
import { useState } from "react";
import { transportRoutes } from "@/content/pages/transportRoutes";
import s from "./Programs.module.css";

export default function TransportExplorer() {
  const [selected, setSelected] = useState(1);
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const routes = transportRoutes.filter(
    (r) => !term || r.stops.some((x) => x.toLowerCase().includes(term)),
  );
  const route = routes.find((r) => r.id === selected) || routes[0];
  return (
    <>
      <label className={s.searchLabel}>
        Find your neighbourhood
        <input
          className={s.search}
          type="search"
          placeholder="Try Ameerpet, Moti Nagar or Kukatpally"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <p className={s.caption} aria-live="polite">
        {term
          ? `${routes.length} matching route${routes.length === 1 ? "" : "s"}`
          : "Choose a route to explore its stops."}
      </p>
      <div className={s.routeLayout}>
        <nav className={s.routeMenu} aria-label="School bus routes">
          {routes.map((r) => (
            <button
              key={r.id}
              aria-pressed={route?.id === r.id}
              aria-controls="route-stops"
              onClick={() => {
                setSelected(r.id);
                requestAnimationFrame(() => {
                  const panel = document.getElementById("route-stops");
                  if (!panel) return;
                  window.scrollTo({
                    top: window.scrollY + panel.getBoundingClientRect().top - 110,
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                  });
                });
              }}
            >
              <span>Route {String(r.id).padStart(2, "0")}</span>
              <small>
                {r.stops.length
                  ? `${r.stops.length} stops`
                  : "Enquire for details"}
              </small>
            </button>
          ))}
        </nav>
        <div className={s.routePanel} id="route-stops">
          {!route ? (
            <div className={s.routeEmpty}>
              <h3>No matching stops.</h3>
              <p>
                Try another locality or contact the school to ask about
                transport coverage.
              </p>
              <button className={s.button} onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
          ) : (
            <>
              <span className={s.eyebrow}>
                THE SCHOOL RUN / {String(route.id).padStart(2, "0")}
              </span>
              <h3>Route {route.id}</h3>
              {route.stops.length ? (
                <>
                  <p className={s.caption}>
                    Schematic stop guide, in the supplied route order. Map links
                    search the locality; they do not mark an exact pickup point.
                  </p>
                  <RouteJourney
                    key={route.id}
                    stops={route.stops}
                    term={term}
                  />
                </>
              ) : (
                <div className={s.routeEmpty}>
                  <p>
                    Route 8’s stop details are not available here yet. Please
                    contact the school for the latest route information.
                  </p>
                  <a className={s.button} href="tel:+914023413543">
                    Ask about Route 8 ↗
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
