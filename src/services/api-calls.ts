import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getLatestRanks = async () => {
  const res = await apiInstance.get("/dashboard/ranks");
  return res.data;
};

const getCurrentCheckpoints = async () => {
  const res = await apiInstance.get("/dashboard/checkpoints");
  return res.data;
};

export default {
  getLatestRanks,
  getCurrentCheckpoints
};
