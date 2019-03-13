import React, { Component } from 'react'
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta/>
        <Header></Header>
        <p>i'm the  page component</p>
        {this.props.children}
      </div>
    )
  }
}

export default Page;