import nodemailer from "nodemailer"
import { mailIds, pass, senderMailId, user } from "./config.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass
    }
})


export const sendMail = (stoppedServer) => {

    const mailOptns = {
        from: senderMailId,
        to: mailIds.join(","),
        subject: `🚨 Server Down Alert: ${stoppedServer}`,
        text: `
        Server Down Alert

        The following server is currently unavailable:

        Server: ${stoppedServer}
        Status: DOWN
        Detected At: ${new Date().toLocaleString()}

        Please check the server and take the necessary action to restore the service.

        This is an automated alert from the Health Monitoring Service.
        `.trim()
    };

    try {
        transporter.sendMail(mailOptns, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    } catch (error) {
        console.error("error sending mail", error)
    }
}