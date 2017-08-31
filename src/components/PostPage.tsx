import * as React from 'react';
import Post from './Post'
import {NavLink} from 'react-router-dom'
import { post, comment } from '../types/common'
import { loading } from '../utils/Utils'

export interface PostPageProps {
  post: post,
  comments: Array<post>,
  match: any,
  getPost: any,
  close: any,
  isHost:boolean,
  host:string,
  clearDetail:any
}

const renderPost = function (arr: Array<post>, isAuthor: boolean) {
  if (isAuthor) {
    return <Post post={arr[0] as post} current="123" host={true} />
  } else {
    return arr?arr.map((p, i) => (
      <Post post={p as comment} current="123" host={false} floor={`${i + 1} 楼`} />
    )):[]
  }
}

const renderContent = (post: post) => {
  if (post && Object.keys(post).length > 0) {
    return (
      <div className="post-page">
        <div className="post-title">{post.title}</div>
        <div className="post-detail">{renderPost([post], true)}</div>
        <ul className="post-comment">
          {renderPost(post.comments, false)}
        </ul>
      </div>
    )
  }else{
    return (
      <div className="post-page"></div>
    )
  }
}

class PostPage extends React.Component<PostPageProps, any> {
  constructor(args: any) {
    super(args);
    this.state = {
      loaded: false,
      loading: false,
      postId: this.props.match.params.id
    }
  }
  componentWillMount() {
    if(this.props.post && (Object.keys(this.props.post).length !== 0)){
      this.props.clearDetail();
    }
    if (this.state.loaded !== true) {
      loading(this.props.getPost(this.props.match.params.id,this.props.host === '1')).then((r: any) => {
        this.setState({
          ...this.state,
          loaded: true,
          loading: false,
        })
      });
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    this.props.clearDetail();
  }
  render() {
    return (
      <div className="body-wrap post-wrap">
        <header>
          <div className="header-top">
            <div className="back" onClick={this.props.close}><i className="iconfont icon-back"></i></div>
            <div className="column-title active link">{(this.props.host==='1')?'只看楼主':'主题详情'}</div>
            {
              (this.props.host === '1') ? '' : (<div className={`host ${(this.props.host==='1')?'is-host':''}`} ><NavLink to={`/${this.props.match.params.type}/${this.props.match.params.id}?host=1`} activeStyle={{background: 'rgb(201, 150, 41);'}} >楼主</NavLink></div>)
            }
            <div className="operate">
              <i className="iconfont icon-category"></i>
            </div>
          </div>
        </header>
        <article>
          {renderContent(this.props.post)}
        </article>
      </div>
    );
  }
}

export default PostPage;
