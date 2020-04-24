import {addZero} from '@/utils/auth'
const changeDecimalBuZero=(number)=>{ //补齐八位小数
    let f_x = parseFloat(number);
    if (isNaN(f_x)) {
        return 0;
    }
    let s_x = number.toString();
    let pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 8) {
        s_x += '0';
    }
    return s_x;
}

const formatDate=(dates)=>{ 
    const now = new Date(dates)
    let year=now.getFullYear(); 
    let month=now.getMonth()+1; 
    let date=now.getDate(); 
    let hour=now.getHours(); 
    let minute=now.getMinutes(); 
    let second=now.getSeconds(); 
    return year+"-"+addZero(month)+"-"+addZero(date) +" "+addZero(hour)+":"+addZero(minute)+":"+addZero(second);
}

// 判断数据类型
const dataType = data => {
    return Object.prototype.toString
      .call(data)
      .split(' ')[1]
      .split(']')[0];
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

export default {
    changeDecimalBuZero,
    formatDate,
    isEmpty,
    dataType
}