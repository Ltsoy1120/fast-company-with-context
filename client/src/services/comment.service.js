import httpService from "./http.service";

export const commentEndPoint = "comment/";

const commentService = {
    create: async (payload) => {
        const { data } = await httpService.put(
            commentEndPoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        // params задаем по документации firebase
        return data;
    },
    remove: async (id) => {
        const { data } = await httpService.delete(commentEndPoint + id);
        return data;
    }
};

export default commentService;
