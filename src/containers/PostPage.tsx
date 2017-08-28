import * as React from 'react';
import { connect } from 'react-redux'
import PostPage from '../components/PostPage'
import {getPostDetail} from '../actions/index'

const mapState2Props = (state:any) => {
  return {
    post:state.post
  };
}

const mapDispatch2Props = (dispatch:any) => {
  return {
    getPost:(id:string) => (dispatch(getPostDetail(id)))
  };
}

export default connect(mapState2Props)(PostPage);
