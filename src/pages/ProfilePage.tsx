import React, { Fragment } from 'react';
import ChangePassword from '../components/profile/ChangePassword';
import ChangeUsername from '../components/profile/ChangeUsername';

const ProfilePage = () => {
    return (
        <Fragment>
            <ChangePassword/>
            <ChangeUsername/>
        </Fragment>
    );
};

export default ProfilePage;