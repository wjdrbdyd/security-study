import axios from 'axios';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ArticleTable = styled.table`
  border: none;
  border-collapse: collapse;
  margin-top: 20px;
  width: 100%;
  
  td, th {
    border: none;
    color:black;
  }

  th, td {
    padding: 5px 10px;
    text-align: center;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }

`

const titles = ['아이디', '제목', '작성자', '생성일'];

interface Articles  {
  content: ArticleContent[];
  size: number;
  totalPages: number;
}
interface ArticleContent {
  articleId: number;
  articleTitle: string;
  memberNickname: string;
  createdDt: number;
}

const ArticleList = () => {

    const [articlePages, setArticlePages] = useState<Articles>();

    useEffect(()=>{
     
        axios.get('/article/page?page=1')
        .then(response => {
            const {content, size, totalPages} = response.data;
            setArticlePages({content, size, totalPages});
        })
    }, []);

    return (
        <ArticleTable>
          <ArticleHead />
          {articlePages ? <ArticleBody  articles = {articlePages?.content} /> : null}
          
        </ArticleTable>
    );
};

export default ArticleList;

const ArticleHead = () => {

    return (
        <thead>
            <tr>
                {titles.map((title, index) => (
                <th key={index}>{title}</th>
                ))}
            </tr>
        </thead>
    )
}
const ArticleBody = ({articles} : {articles: Articles['content']}) :JSX.Element => {
    const navigate = useNavigate();
    const moveDetail = (articleId:number) => {
      navigate(`/article/detail/${articleId}`);
    }
    return (
        <>
          <tbody>
          {articles.map((article) =>{
            return (
              <tr onClick={() => moveDetail(article.articleId) }>
                <td>{article.articleId}</td>
                <td>{article.articleTitle}</td>
                <td>{article.memberNickname}</td>
                <td>{article.createdDt}</td>
              </tr>
            )
          })}
            
          </tbody>
        </>
    )
}
