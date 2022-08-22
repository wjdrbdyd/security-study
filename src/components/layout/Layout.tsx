import React, { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import classes from "./Layout.module.css";

type Props = {
    children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
    return (
        <Fragment>
            <div className={classes.container}>
                <MainNavigation />
                <main>{props.children}</main>
            </div>
        </Fragment>
    );
};

export default Layout;