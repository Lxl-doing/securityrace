import axios from "axios";

export default async function getTest() {
    return await axios.get("/test");
}