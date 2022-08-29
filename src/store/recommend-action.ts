import { DELETE, GET, POST } from "./fetch-action";

const createTokenHeader = (token: string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token; 
        }
    }
}

export const getRecommends = (articleId: string, token?:string) => {
    const URL = `/recommends/list?id=${articleId}`;
    const response = (token ? GET(URL, createTokenHeader(token)) : GET(URL, {}));
    return response;
}

export const createRecommend = async (articleId:string, token: string) => {
    const URL = '/recommend/';
    const id = +articleId;
    const response = POST(URL, {id: id}, createTokenHeader(token));
    return response;
}

export const deleteRecommend = (articleId:string, token:string) => {
    const URL = `/recommend/one?id=${articleId}`;
    const response = DELETE(URL, createTokenHeader(token));
    return response; 
}