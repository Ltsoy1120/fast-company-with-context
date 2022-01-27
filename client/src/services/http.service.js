import axios from "axios";
import { toast } from "react-toastify"; // для вывода ошибки на фронте для пользователя
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedError) {
            console.log(error);
            toast.error("Something was wrong. Try it later"); // для вывода ошибки на фронте для пользователя
            // toast.info("Something was wrong. Try it later") // для инфо
            // toast("Unexpected error");  // красивое сообщение
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
