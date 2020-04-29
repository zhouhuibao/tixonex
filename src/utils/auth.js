import Cookies from 'js-cookie'
import Qs from 'qs'
const TokenKey = 'vue_admin_template_token'
const TixonExInfo = 'TixonExUserInfo'


/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = urlPath => reg.test(urlPath);


// 删除最后一个字符串
const delStringLastOne = str => {
  let s = str;
  s = s.substring(0, s.length - 1);
  return s;
};

// 数组去重
const unique = arr =>{
  const newArr = [];
  for(let i = 0; i < arr.length; i+=1){
      if(newArr.indexOf(arr[i]) === -1){
          newArr.push(arr[i])
      }
  }
  return newArr;
}

//导出excel
const download = (data,name) => {
  if (!data) {
      return
  }
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', `${name}.xlsx`)

  document.body.appendChild(link)
  link.click()
}

const toTree = (data) => {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
      delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {};
  data.forEach(function (item) {
      map[item.id] = item;
  });
//        console.log(map);
  var val = [];
  data.forEach(function (item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item.parentId];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
          (parent.children || ( parent.children = [] )).push(item);
      } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
      }
  });
  return val;
}



const rules = type => {
  let rule = '';
  switch (type) {
    case 'mobile': // 验证手机号
      // rule = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
      rule = /^1[3-9]\d{9}$/;
      break;
    case 'mobileAndTel': // 验证手机和电话
      rule = /(^(\d{3,4}-)?\d{7,8})$|(1[3-9]\d{9})/;
      break;
    case 'number': // 判断是不是数字
      rule = /^[0-9]*$/;
      break;
    case 'password': // 判断密码是不是数字加字母组合
      rule = /\w{6,17}$/;
      break;
    case 'base64': // 判断是不是base64
      rule = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
      break;
    default:
      break;
  }
  return rule;
};

// 判断数据类型
const dataType = data => {
  return Object.prototype.toString
    .call(data)
    .split(' ')[1]
    .split(']')[0];
};


// 生成10位随机数,可用于作为遍历节点时候的key
const MathRandom = () => {
  let str = '';
  for (let i = 0; i < 10; i += 1) {
    const mathRandom = Math.random() * 10;
    str += parseInt(mathRandom);
  }
  return str;
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toGMTString()}`;
  document.cookie = `${cname}=${cvalue};${expires}`;
};

const getCookie = cname => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

// 判断是否为空
const isEmpty = value => {
  if (dataType(value) === 'String') {
    return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') !== '';
  }
  if (dataType(value) === 'Undefined' || dataType(value) === 'Null') {
    return false;
  }
  return true;
};

const gethhmm=str=>{ // 返回时:分
  if(isEmpty(str) && dataType(str) === 'String'){
    const hhmm = str.split(" ")[1]
    const [hh,mm] = hhmm.split(":")
    return `${hh}:${mm}`
  }
  return ''
}

const getToken=()=>{ 
  return Cookies.get(TokenKey)
}

const setToken=(token)=>{ 
  return Cookies.set(TokenKey, token)
}

const removeToken=()=>{ 
  return Cookies.remove(TokenKey)
}

const getUserInfo=()=>{ 
  return Qs.parse(Cookies.get(TixonExInfo))
}

const setUserInfo=(data)=>{ 
  return Cookies.set(TixonExInfo,Qs.stringify(data))
}

const removeUserInfo=(token)=>{ 
  return Cookies.remove(TixonExInfo)
}

const addZero=(value)=>{
  if(value>=10){
    return value
  }
  return '0'+value
}



//如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成整型
// var d=new Date(1230999938); 
// alert(formatDate(d));


export {
  isUrl,
  rules,
  isEmpty,
  MathRandom,
  dataType,
  setCookie,
  getCookie,
  delStringLastOne,
  unique,
  gethhmm,
  removeToken,
  setToken,
  getToken,
  setUserInfo,
  toTree,
  getUserInfo,
  removeUserInfo,
  download,
  addZero
};








