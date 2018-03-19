import fetch from 'dva/fetch';

//mock request by WangXiaoLong on 2018.3.19 13:17
const checkStatus=(response)=>{

  if(response.status>=200 && response.status<=200){

    return response;
  }

  const error=new Error(response.statusText);
  error.response=response;
  throw error;
};

export default async function request(url,options={}) {

  options.headers={
    'Content-Type':'application/json'
  }
  const response=await fetch(url,options);
  checkStatus(response);
  const data=await response.json();
  console.log("mock json:"+JSON.stringify(data))
  return data;
}
