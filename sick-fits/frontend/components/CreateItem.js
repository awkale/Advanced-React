import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'cool shoes',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur blanditiis, velit doloribus accusantium illum saepe incidunt unde error ipsum aliquid suscipit delectus aut atque ad deleniti nemo. Molestiae, consectetur repellat?',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
    price: 10
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // change them to the single item page
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="price"
                required
                value={this.state.price}
                onChange={this.handleChange}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter a description"
                required
                value={this.state.description}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
