import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ArticleWritePage from './ArticleWritePage';
import { GET } from '../../store/fetch-action';
import ArticleList from './ArticleList';
import AuthContext from '../../store/auth-context';

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

const Article = () => {

    return (
        <ArticleContainer>
            <ArticleTop>
                <h2>게시글 테스트</h2>
                <Link to="/article/write">게시글 생성</Link>
            </ArticleTop>
            <Outlet></Outlet>
        </ArticleContainer>
    );
};

export default Article;