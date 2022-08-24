import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CustomCkEditor from './CustomCkEditor';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useNavigate, useParams } from 'react-router-dom';
import Parser, { Comment } from 'html-react-parser';
import {BsFillPersonFill} from 'react-icons/bs';
import {AiTwotoneCalendar} from 'react-icons/ai';
import CommentList from '../comment/CommentList';
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
    align-items: center;
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
    align-items: baseline;
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
const PostTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 10px 20px;
    border-top: 1px solid black;
    border-bottom: 1px solid #eee;
`
interface IArticle {
    articleBody: string;
    articleId: number;
    articleTitle: string;
    createdDt: string;
    lastModifiedDt: string;
    memberNickname: string;
    written: boolean;
}
const ArticleDetail = () => {
    const [article, setArticle] = useState<IArticle>();
    const [title, setTitle] = useState<string>();

    const [bodyValue, setBodyValue] = useState();
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const navigate = useNavigate();

    const [editing, setEditing] = useState<boolean>(false);
    const {articleId} = useParams<string>();
    useEffect(()=>{
        axios.get(`/article/one?id=${articleId}` )
        .then(response => {
            setArticle(response.data);
        })
    }, []);
    
    const onChange = (event: any, editor: any) => {
        setBodyValue(editor.getData());
    }

    const submitHandler = async (event : React.FormEvent) => {
        event.preventDefault(); 
        const URL = "/article/";
   
        const body = bodyValue;
        const updateReq = {id: articleId, title, body};
        const  headers = {
            'Authorization': 'Bearer ' + token
        };
        await axios.put(URL, updateReq, {headers})
        .then(response=>{
            setEditing(false);
        })

    }
    const titleChange = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    return (
        <>
        <WriteContainer>
            <form onSubmit={submitHandler}>
                <Title>
                    <label htmlFor='title'>제목</label>
                    { editing 
                    ? <input type="text" id="title" name="title" onChange={titleChange} defaultValue={article?.articleTitle}/>
                    : <p>{article?.articleTitle}</p>}
                </Title>
                <>
                <PostTop>
                    <div><BsFillPersonFill /> {article?.memberNickname}</div>
                    <div><AiTwotoneCalendar />작성일 : {article?.createdDt}</div>
                    <div><AiTwotoneCalendar />수정일 : {article?.lastModifiedDt}</div>
                </PostTop>
                <Body>
                    <label htmlFor='content'>내용</label>
                    { editing ? 
                        <CustomCkEditor onChange={onChange} data={article?.articleBody} editing={!editing} />
                        : <div>{article && Parser(article?.articleBody)}</div>
                    }
                    
                </Body>
                </>
                <Buttons>
                    { !editing ? (
                        <>                        
                        <Button onClick={()=> setEditing(true)} type={"button"}  color={"#eee"}>편집</Button>
                        <Button onClick={()=> setEditing(true)} type={"button"}  color={"#eee"}>답글</Button>
                        <Button onClick={()=> navigate("/article")} type={"button"} color={"#eee"}>목록</Button>
                        </>
                    )
                    : (
                        <>                        
                        <Button type={"submit"} color={"#eee"}>수정</Button>
                        <Button onClick={()=> setEditing(false)} type={"button"} color={"#eee"}>취소</Button>
                        </>
                    )}
                </Buttons>
            </form>
            <CommentList articleId={parseFloat(articleId!)}/>
        </WriteContainer>

        </>
    );
};

export default ArticleDetail;