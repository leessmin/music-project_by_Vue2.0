// 导入mockjs
const Mock = require('mockjs');

// 导入自己模拟的数据
const myData = require('./mock.json');

// 接口
const slideImg = Mock.mock("/mock/imgurl", "get", ()=>{
    return myData;
})


export default{
    slideImg
}