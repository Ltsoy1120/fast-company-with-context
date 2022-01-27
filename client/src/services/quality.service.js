import httpService from "./http.service";

export const qualityEndPoint = "quality/";

const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;
