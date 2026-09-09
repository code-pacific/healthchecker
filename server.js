import server from "./src/app.js"
import { PORT } from "./src/config.js"
const startServer = () => {
    try {
        server.listen(PORT,()=>{
            console.info("Server is live")
        })
    } catch (error) {
        console.error("Error Starting Server",error)
    }
}

startServer()