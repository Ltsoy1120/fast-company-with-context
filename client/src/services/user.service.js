import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (content) => {
        const { data } = await httpService.put(
            userEndPoint + localStorageService.getUserId(),
            content
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    }
    // delete: async (id) => {
    //     const { data } = await httpService.delete(userEndPoint + id);
    //     return data;
    // }
};

export default userService;
