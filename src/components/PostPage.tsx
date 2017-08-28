import * as React from 'react';
import Post from './Post'
import { post, comment } from '../types/common'
import {loading} from '../utils/Utils'

export interface PostPageProps {
  post:post,
  comments:Array<post>,
  match:any,
  [prop:string]:any
}

const renderPost = function(arr:Array<post>, isAuthor:boolean){
  if(isAuthor){
    return <Post post={arr[0] as post} current="123" host={true} />
  }else{
    return arr.map((p,i) => (
      <Post post={p as comment} current="123" host={false} floor={i+1} />
    ))
  }
}

class PostPage extends React.Component<PostPageProps, any> {
  constructor(args:any){
    super(args);
    this.state = {
      loaded:false,
      loading:false,
      postId:this.props.match.params.id
    }
  }
  componentWillMount() {
    if(this.state.loaded !== true ){
      loading(this.props.getPostDetail(this.props.match.params.id)).then((r:any) => {
        this.setState({
          ...this.state,
          loaded:true,
          loading:false,
        })
      });
    }
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="post-page">
        <header>{this.props.post.title}</header>
        <div className="post-title"></div>
        <div className="post-content">{ renderPost([this.props.post],true)}</div>
        <ul className="post-comment">
          {renderPost(this.props.post.comments,false)}
        </ul>
      </div>
    );
  }
}

export default PostPage;
