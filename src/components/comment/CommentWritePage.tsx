import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import CustomCkEditor from '../article/CustomCkEditor';

const WriteContainer = styled.div`
    background-color: white;
    width: 90%;
    height: 100%;

    box-sizing: border-box;
    min-height: 400px;
    padding: 20px;
`
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    label {
        min-width: 80px;
        padding: 5px;
    }
    input {
       width: 100%;
    }
`

const Body = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    label {
        min-width: 80px;
        padding: 5px;
    }
    
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
    bottom: 5%;
    left: 10%;
    right: 10%;
    padding: 5px 0;
    border-bottom: 1px solid #eee;

`
const Button = styled.button`
    padding: 10px 5px;
    border: none;
    margin: 0 10px;
    width: 150px;
    background-color: ${props => props.color ? props.color : "#eee"};
    border-radius: 5px;
    cursor: pointer;
`
interface IProps {
    articleId: string;
    setReply: Function;
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

const CommentWritePage = ({articleId, setReply, comments, setComments} : IProps) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const navigate = useNavigate();
    const [commentBody, setCommentBody] = useState();
    const commentSubmit = async (event : React.FormEvent) => {
        event.preventDefault();
        const URL = "/comment/";

        const commentReq = {articleId: articleId, body: commentBody};
        const  headers = {
            'Authorization': 'Bearer ' + token
        };
        await axios.post(URL, commentReq, {headers})
        .then(response=>{
            setReply(false);
            const newArr = [...comments, response.data];
            setComments(newArr);
        })
    }
    const onChange = (event: any, editor: any) => {
        setCommentBody(editor.getData());
    }

    return (

        <form onSubmit={commentSubmit}>
            <Body>
                <label htmlFor='content'>답글</label>
                <CustomCkEditor onChange={onChange} height={"150px"}/>
            </Body>
            <Buttons>
                <Button type={"submit"} color={"#eee"}>댓글 작성</Button>
                <Button  onClick={()=> setReply((prev:boolean) => !prev)} type={"button"} color={"#eee"}>취소</Button>
            </Buttons>
        </form>

    );
};

export default CommentWritePage;