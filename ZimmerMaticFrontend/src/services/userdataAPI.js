import axios from "axios"

const IP = import.meta.env.VITE_SERVER_IP;

async function change_user_password(username, old_password, new_password) {
    try {
        return await axios.post(IP + "/api/user/change_pw", {
            username: username,
            old_password: old_password,
            new_password: new_password
        }).then(response => response.data)
    } catch (error) {
        console.log("ERROR: ", error.response.status ,error.response.data);
        return "Axios Error"
    }
}
export { change_user_password }