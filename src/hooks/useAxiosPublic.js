import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000/api",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;