import axios from "axios"
const IP = import.meta.env.VITE_SERVER_IP;

async function get_files() {
    return await axios.get(IP + "/api/firmware/files").then(
        (respose) => respose.data
    ).catch((error) => {
        return "Error"
    })
}

/**
 * Deletes the given file from the backend
 * @param {json} file_info 
 * @returns 
 */
async function delete_file(file_info) {
    try {
        const server_res = await axios.post(IP + "/api/firmware/delete/", { file_info })
        return {
            erro: false,
            message: server_res
        }
    } catch (e) {
        console.log(e);
        return {
            error: true,
            message: e
        }
    }
}

export {
    get_files,
    delete_file
}