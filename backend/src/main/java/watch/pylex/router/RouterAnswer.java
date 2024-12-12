package watch.pylex.router;

import java.util.HashMap;
import java.util.Map;
import spark.Response;
import com.google.gson.Gson;

public class RouterAnswer {
    private static void setResponseProperties(Response response, int status, String jsonBody) {
        response.status(status);
        response.type("application/json");
        response.body(jsonBody);
    }

    private static Object sendManualResponse(Response res, int status, String error, String message, Boolean success,
            Map<String, Object> extraContent) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("code", status);
            response.put("error", error);
            response.put("message", message);
            response.put("success", success);

            if (extraContent != null) {
                response.putAll(extraContent);
            }

            String jsonResponse = new Gson().toJson(response);
            setResponseProperties(res, status, jsonResponse);
            return jsonResponse;
        } catch (Exception e) {
            String errorResponse = new Gson().toJson(Map.of(
                    "code", 500,
                    "error", "Internal Server Error",
                    "message", "An internal server error occurred: " + e,
                    "success", false));
            setResponseProperties(res, 500, errorResponse);
            return errorResponse;
        }
    }

    public static Object BadRequest(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 400,
                "The server cannot or will not process the request due to an apparent client error",
                message, false, extraContent);
    }

    public static Object Forbidden(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 403,
                "The request contained valid data and was understood by the server, but the server is refusing action",
                message, false, extraContent);
    }

    public static Object OK(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 200, "The request has succeeded", message, true, extraContent);
    }

    public static Object Created(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 201,
                "The request has been fulfilled and has resulted in one or more new resources being created",
                message, true, extraContent);
    }

    public static Object NoContent(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 204,
                "The server successfully processed the request and is not returning any content",
                message, true, extraContent);
    }

    public static Object InternalServerError(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 500, "The server has encountered a situation it doesn't know how to handle",
                message, false, extraContent);
    }

    public static Object NotFound(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 404,
                "The requested resource could not be found but may be available in the future",
                message, false, extraContent);
    }

    public static Object Unauthorized(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 401,
                "The request has not been applied because it lacks valid authentication credentials for the target resource",
                message, false, extraContent);
    }

    public static Object MethodNotAllowed(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 405,
                "The method received in the request-line is known by the origin server but not supported by the target resource",
                message, false, extraContent);
    }

    public static Object Conflict(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 409,
                "The request could not be completed due to a conflict with the current state of the target resource",
                message, false, extraContent);
    }

    public static Object Gone(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 410,
                "Access to the target resource is no longer available at the origin server and no forwarding address is known",
                message, false, extraContent);
    }

    public static Object UnsupportedMediaType(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 415,
                "The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource",
                message, false, extraContent);
    }

    public static Object UnprocessableEntity(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 422,
                "The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions",
                message, false, extraContent);
    }

    public static Object TooManyRequests(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 429, "The user has sent too many requests in a given amount of time",
                message, false, extraContent);
    }

    public static Object ServiceUnavailable(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 503,
                "The server is currently unable to handle the request due to a temporary overload or maintenance of the server",
                message, false, extraContent);
    }

    public static Object GatewayTimeout(Response res, String message, Map<String, Object> extraContent) {
        return sendManualResponse(res, 504,
                "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request",
                message, false, extraContent);
    }

    public static Object Custom(Response res, int status, String error, String message, Boolean success,
            Map<String, Object> extraContent) {
        return sendManualResponse(res, status, error, message, success, extraContent);
    }

}
