package watch.pylex.router;
import spark.Spark;
import watch.pylex.routes.Route;


import java.util.ArrayList;
import java.util.List;

public class Router {
    private final List<Route> routes;

    public Router() {
        this.routes = new ArrayList<>();
    }

    public void addRoute(Route route) {
        routes.add(route);
    }

    public void setupRoutes() {
        for (Route route : routes) {
            switch (route.getMethod().toLowerCase()) {
                case "get":
                    Spark.get(route.getPath(), route::handle);
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported HTTP method: " + route.getMethod());
            }
        }
    }
}