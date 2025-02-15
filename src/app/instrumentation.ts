// import {Registry,collectDefaultMetrics} from "prom-client";
//
// declare global {
//     var metrics: {
//         registry: Registry,
//     } | undefined;
// }
// export async function register(){
//     console.log("registering instrumentation");
//     // if(process.env.NEXT_RUNTIME === 'nodejs'){
//     //     console.log("Done")
//     // }
//     const prometheusRegistry = new Registry();
//     collectDefaultMetrics({
//         register: prometheusRegistry,
//     });
//     globalThis.metrics = {
//         registry: prometheusRegistry
//     }
// }



// import type { Logger } from 'pino';
import { Registry, collectDefaultMetrics, Counter } from 'prom-client';
// import { registerOTel } from '@vercel/otel';

declare global {
    // var usage is required for global declaration
    // eslint-disable-next-line no-var
    // var logger: Logger | undefined;

    // eslint-disable-next-line no-var
    var metrics: {
        registry: Registry;
        userSignups: Counter;
        categoryPopularity: Counter;
    } | undefined;
}

export async function register() {
    console.log("Registering");
    if (process.env.NEXT_RUNTIME === "nodejs") {
        console.log("Inside Node.js runtime");

        // const pino = (await import('pino')).default;
        // const pinoLoki = (await import('pino-loki')).default;
        //
        // const transport = pinoLoki({
        //     host: 'http://localhost:3100', // Loki server address
        //     batching: true, // Enable batching of logs for better performance
        //     interval: 5, // Send logs every 5 seconds when batching
        //     labels: { app: 'next-app' } // Add application label to all logs
        // })
        //
        // const logger = pino(transport);
        // globalThis.logger = logger;

        const prometheusRegistry = new Registry();
        collectDefaultMetrics({
            register: prometheusRegistry
        });

        // User signups counter
        const userSignups = new Counter({
            name: 'user_signups_total',
            help: 'Total number of user signups',
            labelNames: ['plan_type', 'referral_source'],
            registers: [prometheusRegistry]
        });
        const categoryPopularity = new Counter({
            name: 'popular_category',
            help: 'Total number of clicks on category posts',
            labelNames: ['category_name', 'date'],
            registers: [prometheusRegistry]
        });

        prometheusRegistry.registerMetric(userSignups);

        globalThis.metrics = {
            registry: prometheusRegistry,
            userSignups,
            categoryPopularity
        }
        // console.log("Metrics registered:", globalThis.metrics);

        // vercel otel for traces
        // registerOTel();
    }else {
        console.log("Not in Node.js runtime");
    }
}
