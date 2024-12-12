package watch.pylex;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class CommandHandler {
    private static final Logger logger = LogManager.getLogger(CommandHandler.class);

    public static void handleCommand(String command) {
        switch (command.toLowerCase()) {
            case "help":
                logger.info("Available commands: help, status, stop");
                break;
            case "status":
                logger.info("Server is running");
                break;
            case "stop":
                logger.info("Stopping server...");
                Main.stopApp();
                break;
            case "exit":
                logger.info("Stopping server...");
                Main.stopApp();
                break;
            case "quit":
                logger.info("Stopping server...");
                Main.stopApp();
                break;
            case "open":
                logger.info("Opening browser...");
                try {
                    java.awt.Desktop.getDesktop().browse(new java.net.URI("http://127.0.0.0:300"));
                } catch (Exception e) {
                    logger.error("Could not open browser: " + e.getMessage());
                }
                break;
            default:
                logger.info("Unknown command. Type 'help' for a list of commands.");
        }
    }
}