import httpService from "./http.service";

export const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const res = await httpService.get(professionEndPoint);
        return res.data;
    }
};
export default professionService;
