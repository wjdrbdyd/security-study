import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomCkEditor, { SCkEditor } from './CustomCkEditor';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const WriteContainer = styled.div`
    background-color: white;
    width: 90%;
    height: 100%;
    margin: 20px auto;
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
    margin-top: 15px;
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

const ArticleWritePage = () => {
    const [title, setTitle] = useState('');
    const authCtx = useContext(AuthContext);
    const titleRef = useRef<HTMLInputElement>(null);
    const token = authCtx.token;

    const [bodyValue, setBodyValue] = useState();
    const navigate = useNavigate();
    const submitHandler = async (event : React.FormEvent) => {
        event.preventDefault();
        const URL = "/article/";
        const title = titleRef.current!.value;
        const body = bodyValue;
        const articleReq = {title, body};
        const  headers = {
            'Authorization': 'Bearer ' + token
        };
        await axios.post(URL, articleReq, {headers})
        .then(response=>{console.log("Success")})
    }
    const onChange = (event: any, editor: any) => {
        setBodyValue(editor.getData());
    }
    console.log(bodyValue)
    return (
        <WriteContainer>
            <form onSubmit={submitHandler}>
                <Title>
                    <label htmlFor='title'>제목</label>
                    <input type="text" id="title" name="title" ref={titleRef}/>
                </Title>
                <Body>
                    <label htmlFor='content'>내용</label>
                    <CustomCkEditor onChange={onChange} />
                </Body>
                <Buttons>
                    <Button type={"submit"} color={"#eee"}>작성</Button>
                    <Button  onClick={()=> navigate("/article")} type={"button"} color={"#eee"}>취소</Button>
                </Buttons>
            </form>
        </WriteContainer>
    );
};

export default ArticleWritePage;