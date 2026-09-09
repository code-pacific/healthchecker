import nodeCron from "node-cron";
import healthchecker from "./services/healthchecker.js";
import { sendMail } from "./mailTransporter.js";

export const scheduler = () => {
    const time = "* * * * *"
    nodeCron.schedule(time,async ()=>{
        console.log("scheduler ran")
        const res = await healthchecker.sajaHealth()
        console.log("res",res)
        if(!res){
            sendMail("saja")
        }
    })
}