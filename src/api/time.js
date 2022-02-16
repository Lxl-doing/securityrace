import axios from "axios";

export default async function getRestTime() {
    return await axios.get("/time");
}

export async function getExamTime() {
    return await axios.get("/time/exam");
}