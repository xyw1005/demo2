import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm,Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE }from '../../constants'
import UserModal from './UserModal';
import request4mock from "../../utils/request4mock";

function Users({  dispatch, list: dataSource,loading , total, page, current }) {

  //请求mock 需到路霸中关闭代理
  function mockTest() {
    const result=JSON.stringify(request4mock('/api/mock',{
      method:'GET',
      mode:'cors',  // 避免cors攻击
      credentials: 'include'
    }));
    console.log("mock response json:"+result);
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
    console.log("create...values:"+JSON.stringify(values));
  }
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
    console.log("remove..."+id);
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
    console.log("patch...");
  }
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
    console.log("pageChangeHandler...");
  }

  const columnsT=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </UserModal>
          <Popconfirm title="确定删除？" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="" >删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return(
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button  type="primary">Create User</Button>
          </UserModal>
        </div>
        <div >
          <Button  type="primary" onClick={mockTest}>Mock Test</Button>
        </div>
        <Table
          columns={columnsT}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}
export default  connect(mapStateToProps)(Users);
