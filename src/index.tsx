import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import GlobalStyle from './styles';
import App from './App';

const client = new ApolloClient({
  uri: 'https://tn-ql.abdmmar.com',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
