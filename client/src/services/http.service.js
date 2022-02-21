import axios from "axios";
import { toast } from "react-toastify"; // для вывода ошибки на фронте для пользователя
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

// axios.defaults.baseURL = configFile.apiEndpoint; // через сервер

// -----эта часть кода для запросов в FareBase------
// axios.defaults.baseURL = configFile.FireBaseEndpoint;
// --добавляем url адрес не глобальному axios, а к экземпляру и получаем http -- метод создания инстанса, для создания нескольких вариантов
const http = axios.create({
    baseURL: configFile.FireBaseEndpoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < new Date()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                localStorageService.setTokens({
                    expiresIn: data.expires_in,
                    idToken: data.id_token,
                    localId: data.user_id,
                    refreshToken: data.refresh_token
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// трансформация из объекта в массив
function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
}
// -------------------
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
