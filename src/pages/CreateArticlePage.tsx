import React from 'react';
import { ArticleContextProvider } from '../store/article-context';

const CreateArticlePage = () => {
    return (
        <ArticleContextProvider>
            <CreateArticleForm item={undefined} />
        </ArticleContextProvider>
    );
};

export default CreateArticlePage;