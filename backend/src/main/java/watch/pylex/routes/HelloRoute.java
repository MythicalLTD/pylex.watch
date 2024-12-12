package watch.pylex.routes;

import spark.Request;
import spark.Response;
import watch.pylex.router.RouterAnswer;

public class HelloRoute extends Route {

       public HelloRoute() {
        super("/api/hello", "GET");
    }

    @Override
    public Object handle(Request request, Response response) {
        return RouterAnswer.OK(response, "Hello, World!", null);
    }
    
}
