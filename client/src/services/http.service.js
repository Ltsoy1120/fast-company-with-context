import axios from "axios";
import { toast } from "react-toastify"; // для вывода ошибки на фронте для пользователя
import configFile from "../config.json";

// axios.defaults.baseURL = configFile.apiEndpoint; // через сервер

// -----эта часть кода для запросов в FareBase------
axios.defaults.baseURL = configFile.FireBaseEndpoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// трансформация из объекта в массив
function transformData(data) {
    return data
        ? Object.keys(data).map((key) => {
              return { ...data[key] };
          })
        : [];
}
// -------------------
axios.interceptors.response.use(
    // (res) => res, // первоначальный вариант для обычного запроса с сервера, ниже для FareBase
    (res) => {
        res.data = { content: transformData(res.data) };
        return res;
    },
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
