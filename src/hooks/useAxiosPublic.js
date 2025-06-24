import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
