import nodeCron from "node-cron";
import healthchecker from "./services/healthchecker.js";
import { sendMail } from "./mailTransporter.js";
import { checkServers } from "./config.js";

const mailSentServers = new Map();

const ALERT_COOLDOWN = 6 * 60 * 60 * 1000; // 6 hours

export const scheduler = () => {
    const time = "*/15 * * * *";

    nodeCron.schedule(time, async () => {

        for (const server of checkServers) {
            try {
                const isHealthy = await healthchecker.checkHealth(server.api);

                if (!isHealthy) {
                    const lastMailSent = mailSentServers.get(server.name);
                    const now = Date.now();
                    if (
                        lastMailSent &&
                        now - lastMailSent < ALERT_COOLDOWN
                    ) {
                        console.log(
                            `Alert already sent for ${server.name}. Skipping email.`
                        );

                        continue;
                    }
                    await sendMail(server.name);
                    mailSentServers.set(server.name, now);

                    console.log(
                        `Alert email sent for ${server.name}`
                    );
                } else {
                    console.log(`${server.name} is healthy`);
                    mailSentServers.delete(server.name);
                }

            } catch (error) {
                console.error(
                    `Health check error for ${server.name}:`,
                    error
                );
            }
        }
    });
};