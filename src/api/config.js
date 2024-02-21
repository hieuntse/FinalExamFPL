import axios from "axios";

const instance = axios.create({
    baseURL: " http://localhost:3000",
});

//Add a request interceptor
instance.interceptors.request.use(function (config) {
    //do something before request is sent
    return config;
}, function (error) {
    //do something with request error
    return Promise.reject(error);
});
//add a respone interceptor
instance.interceptors.response.use(function (data) {
    return data;
}, function (error) {
    //any status codes that fslls out side the range of 2xx cause this function to trigger 
    //do something with response error
    return Promise.reject(error);

});
export default instance; 