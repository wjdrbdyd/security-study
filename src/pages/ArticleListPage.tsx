import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleList from '../components/article/ArticleList';
import { ArticleContextProvider } from '../store/article-context';

const ArticleListPage = () => {
    let { pageId } = useParams();
    return (
        <ArticleContextProvider>
            <>
                <ArticleList item={pageId}/>
                <SearchForm />
            </>
        </ArticleContextProvider>
    );
};

export default ArticleListPage;