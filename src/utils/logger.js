import log from "loglevel";
import chalk from "chalk";

// Set the default log level (e.g., 'info' for production, 'debug' for development)
log.setDefaultLevel(log.levels.INFO);

// Customize log format and colors
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
	const rawMethod = originalFactory(methodName, logLevel, loggerName);

	return function (message) {
		const timestamp = new Date().toISOString();
		let formattedMessage = `${timestamp} [${methodName.toUpperCase()}]: ${message}`;

		// Apply colors using chalk
		switch (methodName) {
			case "info":
				formattedMessage = chalk.blue(formattedMessage);
				break;
			case "error":
				formattedMessage = chalk.red(formattedMessage);
				break;
			case "debug":
				formattedMessage = chalk.green(formattedMessage);
				break;
			default:
				break;
		}

		rawMethod(formattedMessage);
	};
};

// Rebuild the logger with the custom method factory
log.setLevel(log.getLevel()); // Apply the customizations

// Export the configured logger as `logger`
export default log;
