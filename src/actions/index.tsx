import { Promise } from 'es6-promise'
import { SHOW_USERINFO_TYPE, GET_COLUMN_POST, GET_POST_DETAIL, CLEAR_COLUMN_POST, CLEAR_POST_DETAIL, GET_COLLECT_LIST } from '../constants/index'
import { column_info, post } from '../types/common'

export interface USERACTION {
  type: string,
  data?: any
}
export type ForumAction = USERACTION;

function randomNum(num: number) {
  let str = '';
  while (num--) {
    str += ~~(Math.random() * 10);
  }
  return str;
}
//清除reducer中的post残留
export function clearPost() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_COLUMN_POST
    })
  }
}

export function clearPostDetail() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_POST_DETAIL
    })
  }
}

export function getPostDetail(id: string) {
  return (dispatch: any) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const detail: post = {
          id: Math.random().toString(32).substr(2),
          createUserId: Math.random().toString(32).substr(2),
          stats: 0,
          title: 'one title' + Math.random().toString(32).substr(6),
          createTime: new Date('2017-08-15 21:21'),
          createUserName: 'frank' + randomNum(4),
          lastReplyUserId: null,
          msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
          updateTime: null,
          comments: [{
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null
          }]
        };
        dispatch({
          type: GET_POST_DETAIL,
          data: detail
        });
        res(true);
      }, 1000)
    })
  }
}

export function getCollectInfo() {
  return (dispatch: any) => {
    dispatch({
      type: GET_COLLECT_LIST,
      data: [{
        name: 'DNF',
        seq: 1,
        picUrl: './src/style/img/dnf.jpg',
        id: 'dnf',
      }, {
        id: 'diablo',
        name: '暗黑3',
        seq: 2,
        picUrl: './src/style/img/diablo.jpg',
      }, {
        id: 'games',
        name: '游戏综合',
        seq: 3,
        picUrl: './src/style/img/rocket.jpg',
      }, {
        id: 'acg',
        name: '二次元',
        seq: 4,
        picUrl: './src/style/img/doraam.jpg',
      }, {
        id: 'hardware',
        name: '硬件配置',
        seq: 5,
        picUrl: './src/style/img/shoub.jpg',
      }, {
        id: 'composite',
        name: '网事杂谈',
        seq: 6,
        picUrl: './src/style/img/drink.jpg',
      }]
    })
  }
}

export function loadPost(info: column_info) {
  return (dispatch: any) => {
    return new Promise((rs, rj) => {
      setTimeout(function () {
        const posts: Array<post> = [
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          },
          {
            id: 'asdfdsf' + randomNum(4),
            title: '这是一个标题' + randomNum(3),
            createTime: new Date('2017-08-15 21:21'),
            stats: 0,
            createUserId: 'user1' + randomNum(2),
            createUserName: 'frank' + randomNum(4),
            lastReplyUserId: null,
            msg: 'sdafsdasssssssssssssssssalkfhdsafih' + randomNum(13),
            updateTime: null

          }
        ];
        dispatch({
          type: GET_COLUMN_POST,
          data: {
            posts: posts,
            page: info.page
          }
        });
        rs(true);
      }, 1000);
    })
  }
}

