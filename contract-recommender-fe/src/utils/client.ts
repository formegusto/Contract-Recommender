import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;
const client = axios.create({ baseURL: API_SERVER });

export default client;
