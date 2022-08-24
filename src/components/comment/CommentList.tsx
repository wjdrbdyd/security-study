import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
interface IProps {
    articleId: number;
}

interface Comment {
    commentId: number;
    memberNickname: string;
    commentBody: string;
    createdDt: number;
    isWritten: boolean;
}
const CommentList = ({articleId}:IProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    useEffect(()=>{
        axios.get(`/comment/list?id=${articleId}` )
        .then(response => {
            setComments(prev => [...prev, response.data ]);
        })
    }, []);

    return (
        <div>
            {comments?.map((comment) => {
                return (
                    <div>{comment && Parser(comment?.commentBody)}</div>
                )
            })}
        </div>
    );
};

export default CommentList;