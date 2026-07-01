import api from "./axios";

export function getHome(categoryId) {
    return api.get("/home", {
        params: {
            categoryId,
        },
    });
}