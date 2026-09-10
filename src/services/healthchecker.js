import axios from "axios"
import { checkServers } from "../config.js"

class HealthChecker {
    async checkHealth(api) {
        
        try {
            const response = await axios.get(api, {
                timeout: 10000
            })
            if (response.status >= 200 && response.status <= 300) {
                return true
            }
            else {
                return true
            }
        } catch (error) {
            return false
        }
    }
}

export default new HealthChecker