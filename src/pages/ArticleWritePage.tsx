import React from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomCkEditor, { SCkEditor } from '../components/article/CustomCkEditor';

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
`
const ArticleWritePage = () => {

    const writeHandler = async (event : ) => {

    }
    return (
        <WriteContainer>
            <Title>
                <label htmlFor='title'>제목</label>
                <input type="text" id="title" onChange={}/>
            </Title>
            <Body>
                <label htmlFor='content'>내용</label>
                <CustomCkEditor />
            </Body>
            <Buttons>
                <Button type={"submit"} onClick={writeHandler} color={"#eee"}>작성</Button>
                <Button color={"#eee"}>취소</Button>
            </Buttons>
        </WriteContainer>
    );
};

export default ArticleWritePage;