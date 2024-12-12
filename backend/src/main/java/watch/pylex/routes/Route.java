package watch.pylex.routes;

import spark.Request;
import spark.Response;

public abstract class Route {
    protected final String path;
    protected final String method;

    public Route(String path, String method) {
        this.path = path;
        this.method = method;
    }

    public String getPath() {
        return path;
    }

    public String getMethod() {
        return method;
    }

    public abstract Object handle(Request request, Response response);
}

