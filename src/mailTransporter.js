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
        subject: `Alert ${stoppedServer} has stopped`,
        text: `${stoppedServer} Server Stopped Please check`
    }

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