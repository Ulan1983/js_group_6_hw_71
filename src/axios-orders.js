import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: 'https://burger-builder-ulan-beltaev.firebaseio.com/'
});

export default axiosOrders;