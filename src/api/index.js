import axios from 'axios';

const client = axios.create({
  baseURL: 'https://heartrate-backend.vercel.app',
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

export { client };
