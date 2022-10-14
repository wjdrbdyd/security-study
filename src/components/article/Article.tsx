import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {  item: ArticleInfo, onDelete: (id:string) => void };

type ArticleInfo = {
    articleId: number,
    memberNickname: string,f
    articleTitle: string,
    articleBody?: string,
    createdDt: string,
    lastModifiedDt?: string,
    isWritten?: boolean
}


const Article:React.FC<Props> = ({ item, onDelete }) => {
    
    let navigate = useNavigate();

    const id = item!.articleId.toString();

    const backHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/page/1");
    }

    const updateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("../update/" + id);
    }

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(window.confirm("삭제 하시겠습니까?")) {
            onDelete(id);
        }
    }
    return (
        <div>
            <header>
                <h4>{item!.articleTitle}</h4>
                <div>
                    <span>이름: {item!.memberNickname}</span><br />
                    <span>날짜: {item!.lastModifiedDt}</span>
                </div>
            </header>
            <div>
                <div>{item!.articleBody}</div>
            </div>
            <button onClick={backHandler}>뒤로</button>
            {item!.isWritten &&
                <div>
                    <button onClick={updateHandler}>수정</button><br/>
                    <button onClick={deleteHandler}>삭제</button>       
                </div>
            }
        </div>
    );
};

export default Article;