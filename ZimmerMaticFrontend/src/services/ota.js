import axios from "axios"
const IP = import.meta.env.VITE_SERVER_IP;

async function get_files() {
    try {
        return await axios.get(IP + "/api/firmware/files")
    } catch (error) {
        return "Fehler beim laden der Programme"
    }
}

export {
    get_files,
}