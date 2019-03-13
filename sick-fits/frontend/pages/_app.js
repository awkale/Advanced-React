import App, { Container } from 'next/app';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <p>every page</p>
        <Component></Component>
      </Container>
    );
  }
}

export default MyApp;