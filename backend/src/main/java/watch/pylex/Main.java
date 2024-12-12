package watch.pylex;

import static spark.Spark.*;

import java.io.Console;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.config.Configurator;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import watch.pylex.router.Router;
import watch.pylex.router.RouterAnswer;
import watch.pylex.routes.HelloRoute;

public class Main {
    private static final Logger logger = LogManager.getLogger(Main.class);
    private static final Config config = new Config();

    public static void main(String[] args) {
        setupLogging();
        setupServer();
        startCommandLine();
    }

    private static void setupLogging() {
        Configurator.setRootLevel(org.apache.logging.log4j.Level.getLevel(config.getLogLevel().toUpperCase()));
    }
    static void stopApp() {
        stop();
        logger.info("Server stopped");
        System.exit(0);
    }
    private static void setupServer() {
        port(config.getPort());
        ipAddress(config.getHost());

        Router router = new Router();
        router.addRoute(new HelloRoute());
        router.setupRoutes();
        notFound((req, res) -> {
            return RouterAnswer.NotFound(res, "The requested resource could not be found", null);
        });

        get("/", (req, res) -> {
            return RouterAnswer.OK(res, "Server is running", null);
        });

        logger.info("Server started on {}:{}", config.getHost(), config.getPort());
    }

    private static void startCommandLine() {
        try {
            Terminal terminal = TerminalBuilder.terminal();
            LineReader lineReader = LineReaderBuilder.builder()
                    .terminal(terminal)
                    .option(org.jline.reader.LineReader.Option.DISABLE_EVENT_EXPANSION, false)
                    .build();

            Console console = System.console();
            if (console == null) {
                logger.error("No console available");
                return;
            }

            String username = console.readLine("Enter username: ");
            String password = new String(console.readPassword("Enter password: "));
            
            // Securely clear the password from memory after use
            char[] passwordChars = password.toCharArray();
            password = null;
            for (int i = 0; i < passwordChars.length; i++) {
                passwordChars[i] = '\0';
            }
            // ANSI color codes
            String GREEN = "\u001B[32m";
            String BLUE = "\u001B[34m";
            String RESET = "\u001B[0m";
            String RED = "\u001B[31m";
            String YELLOW = "\u001B[33m";
            String CYAN = "\u001B[36m";


            System.out.println(GREEN + "Logged in as: " + username + RESET);
            String prompt = BLUE + "┌──(" + GREEN + username + YELLOW+"@"+ CYAN +"pylexwatch" + BLUE + ")-[" + RESET + "~" + BLUE + "]\n└─" + RED + "# " + RESET;

            String line;

            boolean running = true;
            while (running && (line = lineReader.readLine(prompt)) != null) {
                line = line.trim();
                if ("!stopcli".equalsIgnoreCase(line)) {
                    running = false;
                    System.out.println("Shutting down...");
                } else {
                    CommandHandler.handleCommand(line);
                }
            }
        } catch (Exception e) {
            logger.error("Error in command-line interface", e);
            logger.warn("Do not press Ctrl+C to exit the application!!!!!!!!!!!");
            logger.info("Shutting down...");
            stop();
            try {
                Thread.sleep(2000);
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
            stopApp();
        }
    }
}

