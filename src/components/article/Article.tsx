import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArticleWritePage from '../../pages/ArticleWritePage';
import { GET } from '../../store/fetch-auth-action';

const ArticleContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #eee;
    padding: 10px;
`
const ArticleTop = styled.div`
    display: flex;
    justify-content: space-between;
    h2 {
        font-size: 22px;
    
    }
`
const ArticleList = styled.div`
    
`
const ArticleItem = styled.div`
    
`
const Article = () => {

    const [articles, setArticles] = useState([]);

    useEffect( () => {
        const URL = '/article/page?page=1';
        axios.get(URL)
        .then(response => {
            console.log('start')
            console.log(response.data);
        });

    }, [])

    return (
        <ArticleContainer>
            <ArticleTop>
                <h2>게시글 테스트</h2>
                <Link to="/article/write">게시글 생성</Link>
            </ArticleTop>
            <ArticleWritePage />
            <ArticleList>
                <ArticleItem>

                </ArticleItem>
            </ArticleList>
        </ArticleContainer>
    );
};

export default Article;