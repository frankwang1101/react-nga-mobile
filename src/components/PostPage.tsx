import * as React from 'react';
import Post from './Post'
import { post, comment } from '../types/common'
import { loading } from '../utils/Utils'

export interface PostPageProps {
  post: post,
  comments: Array<post>,
  match: any,
  getPost: any,
  close: any
}

const renderPost = function (arr: Array<post>, isAuthor: boolean) {
  if (isAuthor) {
    return <Post post={arr[0] as post} current="123" host={true} />
  } else {
    return arr.map((p, i) => (
      <Post post={p as comment} current="123" host={false} floor={i + 1} />
    ))
  }
}

const renderContent = (post: post) => {
  if (post) {
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
    if (this.state.loaded !== true) {
      loading(this.props.getPost(this.props.match.params.id)).then((r: any) => {
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
  render() {
    return (
      <div className="body-wrap post-wrap">
        <header>
          <div className="header-top">
            <div className="back" onClick={this.props.close}><i className="iconfont icon-back"></i></div>
            <div className="column-title active link">主题详情</div>
            <div className="host">楼主</div>
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
