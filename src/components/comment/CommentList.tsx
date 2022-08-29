import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';

interface IProps {
    articleId: number;
    comments: Comment[];
    setComments: Function;
}

interface Comment {
    commentId: number;
    memberNickname: string;
    commentBody: string;
    createdDt: Date;
    written: boolean;
}

const SCommments = styled.ul`
    background-color: #eee;
    padding: 10px 20px;
`
const CommentHeader = styled.h2`
    font-size: 22px;
    border-bottom: 1px solid rgba(1,1,1,0.2);
    padding-bottom: 20px;
`
const CommentItem = styled.li`
    border-bottom: 1px solid rgba(1,1,1,0.2);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    div {
        display: flex;
        flex-direction: column;
    }
`
const CommentList = ({articleId, comments, setComments}:IProps) => {

    useEffect(()=>{
        axios.get(`/comment/list?id=${articleId}` )
        .then(response => {
            setComments(response.data);
        })
    }, []);
  
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const deleteComment = async (commentId:number) =>  {
        const  headers = {
            'Authorization': 'Bearer ' + token
        };

        await axios.delete(`/comment/one?id=${commentId}`, {headers})
        .then(response => {
            const newArr = comments.filter(comment => comment.commentId !== commentId);

            console.log("newarr")
            console.log(newArr);
            setComments([...newArr]);
        })
    }
    console.log("comments")
    console.log(comments)
    return (
        <SCommments>
            <CommentHeader>
                댓글
            </CommentHeader>
            {comments?.map((comment) => {
                return (
                    <CommentItem >
                        <p>{comment && Parser(comment?.commentBody)}</p>
                        <div>
                            <span>작성자:{comment?.memberNickname}</span>
                            <span>생성일:{comment?.createdDt.toString()}</span>
                        </div>
                        <button onClick={(e)=>deleteComment(comment.commentId)}>삭제</button>
                    </CommentItem>
                )
            })}
        </SCommments>
    );
};

export default CommentList;