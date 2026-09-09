class HealthChecker {
    async sajaHealth() {
        try {
            const response = await fetch("https://api.saja.biz/saja/checkHealth")
            return true
        } catch (error) {
            console.log("error",error)
            return false
        }
    }
}

export default new HealthChecker