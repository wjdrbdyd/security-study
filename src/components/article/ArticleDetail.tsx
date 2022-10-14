import React, { useContext, useCallback, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import ArticleContext from '../../store/article-context';
import Article from './Article';

type Props = { item:string | undefined }

type ArticleInfo = {
    articleId: number,
    memberNickname: string,
    articleTitle: string,
    articleBody?: string,
    createdDt: string,
    lastModifiedDt?: string,
    isWritten?: boolean
}

const ArticleDetail:React.FC<Props> = ({item}) => {
    
    let navigate = useNavigate();

    const [article, setArticle] = useState<ArticleInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);
    let isLogin = authCtx.isLoggedIn;
    const id = String(item);

    const deleteHandler = (id: string) => {
        articleCtx.deleteArticle(authCtx.token, id);
        alert('삭제 완료');
        navigate("/page/1");
    }

    const getContext = useCallback(() => {
        setIsLoading(false);
        (isLogin ? articleCtx.getArticle(id, authCtx.token) : articleCtx.getArticle(id));
    }, [isLogin]);

    useEffect(()=>{
        getContext();
    }, [getContext]);

    useEffect(()=>{
        if(articleCtx.isSuccess) {
            setArticle(articleCtx.article);
            setIsLoading(true);
        }
    }, [articleCtx, article]);

    let content = <p>Loading</p>

    if (isLoading && article) {
        content = <Article item={article} onDelete={deleteHandler} />
    }

    return (
        <div className={styles.article}>
            {content}
        </div>
    );
};

export default ArticleDetail;