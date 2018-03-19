import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

function Users() {
  return (

    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: Users
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

// function mapStateToProps() {
//   return {};
// }
//
// export default connect(mapStateToProps)(Users);
export default connect()(Users);
