import axios from "axios";


const instance = axios.create({
  baseURL:'http://localhost:3001/',
  timeout:1000
})


export async function get(url) {
  const {data} = await instance.get(url)
  return data
}

