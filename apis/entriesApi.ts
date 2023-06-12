import axios from "axios";

const entriesApí = axios.create({
    baseURL: '/api'
})

export default entriesApí;