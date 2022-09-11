import axios from "axios";

const rootPath = "http://localhost:8081"

export function activate(event, lessonId) {
    event.preventDefault()
    return axios.post(`${rootPath}/api/v1/lesson/${lessonId}/activate`)
}

export function currentLesson() {
    return axios.get(`${rootPath}/api/v1/currentLesson`)
}