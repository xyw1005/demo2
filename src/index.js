import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import userModel from './models/users';
import rte from './router';


// 1. Initialize
const app = dva();
console.log("顶部的 state 数据："+app._store); // 顶部的 state 数据


// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));
app.model(userModel);
// 4. Router
app.router(rte);

// 5. Start
app.start('#root');
