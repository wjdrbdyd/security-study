import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
            setComments(prev => [...prev]);
        })
    }, []);

    return (
        <div>
            댓글영역
        </div>
    );
};

export default CommentList;