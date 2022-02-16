import axios from "axios";

export default async function getTestCode() {
    return await axios.get("/testCode");
}