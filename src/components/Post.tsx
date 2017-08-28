import * as React from 'react';
import { post, comment } from '../types/common'

export interface PostProps {
  post: post | comment,
  current?: string,
  host:boolean,
  floor?:number,
  [method: string]: any
}

class Post extends React.Component<PostProps, any> {
  constructor(args:any){
    super(args);
  }
  render() {
    return (
      <div className="post-info">
        <div className="post-head">
          <div className="post-info-left"><img src="" alt="" className="avatar" /></div>
          <div className="post-info-right">
            <div className="post-info-row">
              <div className="username">admin</div>
              <div className="usertype">{this.props.host?'楼主':this.props.floor}</div>
            </div>
            <div className="post-info-row">
              级别:无 威望:1
            </div>
            <div className="post-info-row">
              徽章:'-'
            </div>
          </div>
        </div>
        <div className="post-content">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxc
          cccccccccccccccccccccccccccccc
          qqqqqqqqqqqqqqqqqqqqqqqqqq
        </div>
        <div className="post-footer">
          <div className="up"><span className="num">0</span>赞</div>
          <div className="down"><span className="num">0</span>踩</div>
          <div className="time">2分钟前</div>
        </div>
      </div>
    );
  }
}

export default Post;
