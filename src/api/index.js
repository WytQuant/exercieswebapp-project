import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4001",
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

const fetchData = async (username) => {
  const response = await client.post("/users/me/records", {
    username,
  });
  return response;
};

export { client, fetchData };
