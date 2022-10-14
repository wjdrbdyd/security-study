import BootStrapTable from 'react-bootstrap-table-next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ArticleContext from '../../store/article-context';
import AuthContext from '../../store/auth-context';
import { Button } from 'react-bootstrap';
import Paging from './Paging';

type Props = {
  item: string | undefined
}

type ArticleInfo = {
  articleId: number,
  memberNickname: string,
  articleTitle: string,
  articleBody?: string,
  createdDt: string,
  lastModifiedDt?: string,
  isWritten?: boolean
}


const ArticleList:React.FC<Props> = ({item}) => {

    let navigate = useNavigate();
    const pageId = String(item);

    const columns = [{
      dataField: 'articleId',
      text: '#',
      headerStyle: () => {
        return { width: "8%" };
      }
    }, {
      dataField: 'articleTitle',
      text: '제목',
      headerStyle: () => {
        return { width: "65%" };
      },
      events: {
        onClick: (e:any, column: any, columnIndex: any, row: any, rowIndex: any) => {
          const articleIdNum:string = row.articleId;
          navigate(`../article/${articleIdNum}`);
        }
      }
    }, {
      dataField: 'memberNickname',
      text: '닉네임',
    }, {
      dataField: 'createdDate',
      text: '작성일'
    }];
    
    const authCtx = useContext(AuthContext);
    const articleCtx = useContext(ArticleContext);

    const [articles, setArticles] = useState<ArticleInfo[]>([]);
    const [maxNum, setMaxNum] = useState<number>(1);

    let isLogin = authCtx.isLoggedIn;

    const fetchListHandler = useCallback(() => {
        articleCtx.getPageList(pageId);
    }, []);
    
    useEffect(() => {
      fetchListHandler();
    }, [fetchListHandler]);

    useEffect(() => {
      if (articleCtx.isSuccess) {
        setArticles(articleCtx.page);
        setMaxNum(articleCtx.totalPages);
      }
    }, [articleCtx])

    return (
        <div className={styles.list}>
          <BootStrapTable keyField='id' data ={ articles } columns = { columns } />
          <div>{isLogin &&
            <Link to="/create">
              <Button>글 작성</Button>
            </Link>
          }
          </div>
          <Paging currentPage={Number(pageId)} maxPage={maxNum} />
        </div>
    );
};

export default ArticleList;

