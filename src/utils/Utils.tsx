import * as React from 'react'
import {column_info,post} from '../types/common'

export function loading(cb: Promise<any>) {
  let load = document.createElement('div');
  load.className = 'global-loding';
  load.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1.8rem" height="1.8rem" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'
    + '<path fill="rgba(255, 152, 0, 0.6)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'
    + '<animateTransform attributeType="xml"'
    + '  attributeName="transform"'
    + '  type="rotate"'
    + '  from="0 25 25"'
    + '  to="360 25 25"'
    + '  dur="0.6s"'
    + '  repeatCount="indefinite"/>'
    + '</path>'
    + '</svg>';
  document.body.appendChild(load);
  return cb.then(arr => {
    document.body.removeChild(load);
    return arr;
  })
}

interface FuncSVGProps {
  [prop: string]: any,
  loadY: number
}
export function ctrlLoad(props: FuncSVGProps) {
  let style: any = {};
  if (props.loadY === -1) {
    style.display = 'none',
      style.transform = `translateX(-50%) translateY(-1px)`
  } else {
    style.display = 'block',
      style.transform = `translateX(-50%) translateY(${props.loadY}px)`
  }
  return (
    <div className="ctrl-loading" style={style}>
      <svg id="loader-1" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" width="1.8rem" height="1.8rem" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50;' }} xmlSpace="preserve">
        <path fill="rgba(255, 152, 0, 0.6)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  )
}

function parseTime(time:any){
  let str = '';
  const nowDate = new Date();
  if(typeof time === 'string'){
    time = new Date(time);
  }
  var add0 = function(num:number){
    return num > 9 ? num : ('0'+num);
  }
  if(nowDate.getTime() - time.getTime() < 60000 ){
    str = ~~((nowDate.getTime() - time.getTime())/1000) + '秒前'
  }else if(nowDate.getTime() - time.getTime() < 360000 ){
    str = ~~((nowDate.getTime() - time.getTime())/60000) + '分钟前'
  }else if(nowDate.getTime() - time.getTime() < 720000 ){
    str = '1小时前';
  }else if(nowDate.getTime() - time.getTime() < 172800000 ){
    str = '1天前'
  }else if(nowDate.getTime() - time.getTime() < 259200000 ){
    str = '2天前'
  }else{
    str = add0(time.getMonth())+'-'+add0(time.getDate())+' '+add0(time.getHours())+':'+add0(time.getMinutes)
  }
  return str;
}

export function renderPost(posts: Array<post>) {
  return posts.map(v => (
    <li className="post-item" key={v.id}>
      <div className="post-title">{v.title}</div>
      <div className="post-info">
        <span className="post-author">{v.createUserName}</span>
        <span className="post-stat">
          <span className="post-time">{parseTime(v.createTime)}</span>
          <span className="post-reply">{v.replyCount}</span>
        </span>
      </div>
    </li>
  ))
}
