import {Promise} from 'es6-promise'
import {SHOW_USERINFO_TYPE, GET_COLUMN_POST,GET_POST_DETAIL,CLEAR_COLUMN_POST} from '../constants/index'
import {column_info,post} from '../types/common'

export interface USERACTION{
  type:string,
  data?:any
}
export type ForumAction = USERACTION;

function randomNum(num:number){
  let str = '';
  while(num--){
    str += ~~(Math.random()*10);
  }
  return str;
}
//清除reducer中的post残留
export function clearPost(){
  return (dispatch:any) => {
    dispatch({
      type:CLEAR_COLUMN_POST
    })
  }
}

export function getPostDetail(id:string){
  return (dispatch:any) => {
    return new Promise((res,rej) => {
      setTimeout(() => {
        const detail:post = {
          id:Math.random().toString(32).substr(2),
          createUserId:Math.random().toString(32).substr(2),
          stats:0,
          title:'one title'+Math.random().toString(32).substr(6),
          createTime:new Date('2017-08-15 21:21'),
          createUserName:'frank'+randomNum(4),
          lastReplyUserId:null,
          msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
          updateTime:null,
          comments:[{
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null
          }]
        };
        dispatch({
          type:GET_POST_DETAIL,
          data:detail
        });
        res(true);
      },1000)
    })
  }
}

export function loadPost(info:column_info){
  return (dispatch:any) => {
    return new Promise((rs,rj) => {
      setTimeout(function() {
        const posts:Array<post> = [
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          },
          {
            id:'asdfdsf'+randomNum(4),
            title:'这是一个标题'+randomNum(3),
            createTime:new Date('2017-08-15 21:21'),
            stats:0,
            createUserId:'user1'+randomNum(2),
            createUserName:'frank'+randomNum(4),
            lastReplyUserId:null,
            msg:'sdafsdasssssssssssssssssalkfhdsafih'+randomNum(13),
            updateTime:null

          }
        ];
        dispatch({
          type:GET_COLUMN_POST,
          data:{
            posts:posts,
            page:info.page
          }
        });
        rs(true);
      }, 1000);
    })
  }
}