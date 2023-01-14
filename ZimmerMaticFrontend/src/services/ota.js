import axios from "axios"
const IP = import.meta.env.VITE_SERVER_IP;

async function get_files() {
    return await axios.get(IP + "/api/firmware/files").then(
        (respose) => respose.data
    ).catch((error) => {
        return "Error"
    })
}

async function delete_file(file) {
    try {
        return await axios.post(IP + "/api/firmware/delete")
    } catch (error) {
        return "Fehler beim laden der Programme"
    }
}

export {
    get_files,
    delete_file
}