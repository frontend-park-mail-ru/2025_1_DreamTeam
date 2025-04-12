import { setPage } from "./App";
import NotFoundView from "./nonFound";

type RouteState = string;

type Route = {
  state: RouteState;
  path: string;
  view: () => void;
};

class Router {
  private routes: Route[] = [];
  private notFoundView: () => void = NotFoundView;

  constructor() {
    console.log("Router constructor");

    window.addEventListener("popstate", (event: PopStateEvent) => {
      const path = location.pathname;
      const matched = this.matchPathToRoute(path);

      if (matched) {
        const { state, view, params } = matched;
        setPage(state);
        view();
        return;
      }

      const state = event.state?.page || "MainMenu";
      this.goByState(state, false);
    });
  }

  register(path: string, state: RouteState, view: () => void) {
    this.routes.push({ path, state, view });
  }

  setNotFoundView(view: () => void) {
    this.notFoundView = view;
  }

  start() {
    const path = location.pathname;
    const matched = this.matchPathToRoute(path);

    if (matched) {
      const { state, view, params } = matched;
      setPage(state);
      view();
      return;
    } else {
      this.notFoundView();
    }

    const state = history.state?.page || "MainMenu";
    this.goByState(state, false);
  }

  goByState(state: RouteState, pushHistory = true) {
    const route = this.routes.find((r) => r.state === state);
    console.log("GoByState", state, pushHistory, route);

    if (!route) {
      console.error(`Маршрут ${state} не найден`);
      return;
    }

    setPage(route.state);

    if (pushHistory) {
      history.pushState({ page: route.state }, "", route.path);
    }

    route.view();
  }

  matchPathToRoute(
    pathname: string
  ): (Route & { params: Record<string, string> }) | null {
    for (const route of this.routes) {
      const paramRegex = route.path.replace(/\{(\w+)\}/g, "(?<$1>[^/]+)");
      const fullRegex = new RegExp(`^${paramRegex}$`);
      const match = pathname.match(fullRegex);

      if (match) {
        const params = match.groups || {};
        return { ...route, params };
      }
    }
    return null;
  }

  back() {
    history.back();
  }

  forward() {
    history.forward();
  }
}

export const router = new Router();
