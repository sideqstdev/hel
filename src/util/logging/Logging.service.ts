import {createLogger, Logger, transports, format} from 'winston'

const isDev: boolean = process.env.DEV_MODE === "true"

const LoggingService: Logger = createLogger({
    level: isDev? "debug" : "info",
    exitOnError: false,
    transports: [
        new transports.Console({
            format: format.combine(
                format.errors({stack: true}),
                format.colorize(),
                format.simple(),
            )
        }),
        new transports.File({
            filename: `log/error.log`, level: `error`,
        }),
        new transports.File({
            filename: `log/console.log`,
        })
    ]
})

export default LoggingService