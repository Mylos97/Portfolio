import React from "react";
import BlogPost from "../blogpost";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const ITEMS_QUERY = gql`
  {
    allBlogPosts {
      data {
        _id
        title
        date
        content
      }
    }
  }
`;

const Home = () => {
  let { data } = useQuery(ITEMS_QUERY);
  var queryBlogPosts = data ? data.allBlogPosts : null;
  const blogPosts = queryBlogPosts
    ? queryBlogPosts.data.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    : null;

  return (
    <div className="home">
      {blogPosts && (
        <BlogPost
          key={blogPosts[0]._id}
          title={blogPosts[0].title}
          date={blogPosts[0].date}
          content={blogPosts[0].content}
        />
      )}
    </div>
  );
};

export default Home;
