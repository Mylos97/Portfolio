import React from "react";
import {Header, Footer, ShowingPage} from './components' 
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";

function App() {
  return (
    <ApolloProvider client= {client}>
    <div className="App">
      <Header/>
      <ShowingPage/>
      <Footer/>
    </div>
    </ApolloProvider>
  );
}

export default App;
