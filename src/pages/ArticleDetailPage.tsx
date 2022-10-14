import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ArticleDetail from '../components/article/ArticleDetail';
import Comment from '../components/article/Comment';
import Recommend from '../components/article/Recommend';
import { ArticleContextProvider } from '../store/article-context';
import { CommentContextProvider } from '../store/comment-context';
import RecommendContext, { RecommendContextProvider } from '../store/recommend-context';

const ArticleDetailPage = () => {
    let { articleId } = useParams();
    return (
        <Fragment>
            <ArticleContextProvider>
                <ArticleDetail item={articleId} />
            </ArticleContextProvider>
            <RecommendContextProvider>
                <Recommend item={articleId} />
            </RecommendContextProvider>
            <CommentContextProvider>
                <Comment item={articleId} />
            </CommentContextProvider>
        </Fragment>
    );
};

export default ArticleDetailPage;