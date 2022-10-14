import React from 'react';
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

type Props = { currentPage:number, maxPage:number }

const Paging:React.FC<Props> = ({currentPage, maxPage}) => {
    let navigate = useNavigate();

    const maxNum = maxPage;
    const currentNum = currentPage;

    const navigateToPage = (page:number) => (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (currentPage !== page) {
            const pageNumb = String(page);
            navigate(`../page/${pageNumb}`);
        }
    }

    const definePage = () => {
        let pageProp: JSX.Element[] = []
        if (maxNum < 6) {
            for (let num = 1; num <= maxNum; num++) {
                pageProp.push(
                    <Pagination.Item key= {num} active = {num === currentNum} onClick = {navigateToPage(num)}>
                        {num}
                    </Pagination.Item>
                )
            }
        }
    
        if (currentNum < 5) {
            for (let num = 1; num <=4; num++) {
                pageProp.push(
                    <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
                        {num}
                    </Pagination.Item>
                )
            }
            pageProp.push(<Pagination.Ellipsis />);
            pageProp.push(<Pagination.Item>{maxNum}</Pagination.Item>);
            pageProp.push(<Pagination.Next />);
            return pageProp;
        }
        if (maxNum - currentNum < 4) {
            pageProp.push(<Pagination.First />)
            pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
            pageProp.push(<Pagination.Ellipsis />);
            for (let num = maxNum-3; num <= maxNum; num ++) {
              pageProp.push(
                <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
                  {num}
                </Pagination.Item>
              )
            }
            return pageProp;
        } 
        pageProp.push(<Pagination.First />)
        pageProp.push(<Pagination.Item>{1}</Pagination.Item>);
        pageProp.push(<Pagination.Ellipsis />);
        for (let num = currentNum-2; num <= currentNum + 2; num++) {
        <Pagination.Item key={num} active={num === currentNum} onClick={navigateToPage(num)}>
            {num}
        </Pagination.Item>
        }
        return pageProp;
    }
    return (
        <Pagination className={styles.page}>
            {definePage()}
        </Pagination>
    );
};

export default Paging; 