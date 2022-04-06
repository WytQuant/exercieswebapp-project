import Axios from 'axios';

const client = Axios.create({
    baseURL: 'http://localhost:4001',
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    }
});

const fetchData = async () => {
   const response = await client.get('/users/me/records');
   return response;
};

export {client, fetchData};

