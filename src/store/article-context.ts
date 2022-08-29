

type Props = { children?: React.ReactNode };
type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody: string,
    createDt: string,
    lastModifiedDt: string,
    isWritten?:boolean,
};

interface PostArticle {
    id?: string;
    title: string;
    body: string;
}


export default ArticleContext;