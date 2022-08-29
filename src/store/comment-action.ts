import { DELETE, GET, POST } from "./fetch-action"

type Comment = {
    articleId: string,
    body: string
}

const createTokenHeader = (token: string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token; 
        }
    }
}

export const getComments = (articleId:string, token?:string) => {
    const URL = `/comment/list?id=${articleId}`;
    const response = (token ? GET(URL, createTokenHeader(token)) : GET(URL, {}));
    return response;
}

export const createComment = (comment:Comment, token:string) => {
    const URL = '/comment/'
    const response = POST(URL, comment,  createTokenHeader(token));
    return response;
}

export const deleteComment = (commentId:string, token:string) => {
    const URL = '/comment/one?id=' + commentId;
    const response = DELETE(URL, createTokenHeader(token));
    return response;
}