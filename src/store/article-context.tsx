import React, { useState } from "react";
import * as articleAction from "./article-action";

type Props = { 
    children?: React.ReactNode 
}
type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdDt: string,
    lastModifiedDt?: string,
    isWritten?: boolean
}

interface PostArticle {
    id? : string,
    title: string,
    body: string
} 

interface Ctx {
    article?: ArticleInfo | undefined;
    page: ArticleInfo[];
    isSuccess: boolean;
    isGetUpdateSuccess: boolean;
    totalPages: number;
    getPageList: (pageId: string) => void;
    getArticle: (param:string, token?:string) => void;
    createArticle: (article:PostArticle, token:string) => void;
    getUpdateArticle: (token:string, param:string) => void;
    updateArticle: (token:string, article:PostArticle) => void;
    deleteArticle: (token:string, param:string) => void;
}

const ArticleContext = React.createContext<Ctx>({
    article: undefined,
    page: [],
    isSuccess: false,
    isGetUpdateSuccess: false,
    totalPages: 0,
    getPageList: () => {},
    getArticle: ()=>{},
    createArticle:  ()=>{},
    getUpdateArticle: ()=>{},
    updateArticle: ()=>{},
    deleteArticle: ()=>{}
});

export const ArticleContextProvider:React.FC<Props> = (props) => {
    
    const [article, setArticle] = useState<ArticleInfo>();
    const [page, setPage] = useState<ArticleInfo[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState<boolean>(false);

    const getPageHandlerV2 = async (pageId: string) => {
        setIsSuccess(false);
        const data = await articleAction.getPageList(pageId);
        const page:ArticleInfo[] = data?.data.content;
        const pages:number = data?.data.totalPage;
        setPage(page);
        setTotalPages(pages);
        setIsSuccess(true);
    }

    const getArticleHandler = (param: string, token?: string) => {
        setIsSuccess(false);
        const data = (token ?
            articleAction.getDetailArticle(param, token)
            : articleAction.getDetailArticle(param))
        data.then((result) => {
            if( result !== null) {
                const article:ArticleInfo = result.data;
                setArticle(article);
            }
        });

        setIsSuccess(true);
    }

    const createArticleHandler = (article:PostArticle, token:string) => {
        setIsSuccess(false);
        const data = articleAction.createArtcile(token, article);
        data.then((result)=> {
            if (result !== null) {
                console.log(isSuccess);
            }
        });

        setIsSuccess(true);
    }

    const getUpdateArticleHandler = async (token: string, param: string) => {
        setIsGetUpdateSuccess(false);
        const updateData = await articleAction.getChangeArticle(token, param);
        const article:ArticleInfo = updateData?.data;
        setArticle(article);
        setIsGetUpdateSuccess(true);
    }
    const updateArticleHandler = (token: string, article: PostArticle) => {
        setIsSuccess(false);
        console.log('update api start');
        const data = articleAction.changeArtcile(token, article);
        data.then(result => {
            if( result !== null) {
                console.log(isSuccess);
            }
        });
        setIsSuccess(true);
    }

    const deleteArticleHandler = (token:string, param: string) => {
        setIsSuccess(false);
        const data = articleAction.deleteArticle(token, param);
        data.then(result => {
            if( result !== null){
                console.log(isSuccess);
            }
        });
        setIsSuccess(true);
    }

    const contextValue = {
        article,
        page,
        isSuccess,
        isGetUpdateSuccess,
        totalPages,
        getPageList: getPageHandlerV2,
        getArticle: getArticleHandler,
        createArticle: createArticleHandler,
        getUpdateArticle: getUpdateArticleHandler,
        updateArticle: updateArticleHandler,
        deleteArticle: deleteArticleHandler
    }

    return (
        <ArticleContext.Provider value={contextValue}>
            {props.children}
        </ArticleContext.Provider>
    )
}
export default ArticleContext;