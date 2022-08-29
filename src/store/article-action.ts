import {GET, POST, PUT, DELETE} from "./fetch-action";

interface PostArticle {
    id?: string,
    title: string,
    body: string,
}
const createTokenHeader = (token:string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

export const getPageList = (pageNum: string) => {
    const URL = `/article/page?page=${pageNum}`;
    const response = GET(URL, {});
    return response;
}

export const getDetailArticle = (articleId:string, token?:string) => {
    const URL = `/article/one?id=${articleId}`;
    if(!token) {
        const response = GET(URL, {});
        return response;
    } else {
        const response = GET(URL, createTokenHeader(token));
        return response;
    }
}

export const createArtcile = (token: string, article: PostArticle) => {
    const URL = "/article/";
    const response = POST(URL, article, createTokenHeader(token));
    return response;
}

export const getChangeArticle = (token: string, articleId: string) => {
    const URL = `/article/change?id=${articleId}`;
    const response = GET(URL, createTokenHeader(token));
    return response;
}

export const changeArtcile = (token: string, article: PostArticle) => {
    const URL = "/article/";
    const response = PUT(URL, article, createTokenHeader(token));
    return response;
}

export const deleteArticle = (token:string, articleId: string) => {
    const URL = `/article/one?id=${articleId}`;
    const response = DELETE(URL, createTokenHeader(token));
    return response;
}