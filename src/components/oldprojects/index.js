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
        images
      }
    }
  }
`;

const OldProjects = () => {
  let { data } = useQuery(ITEMS_QUERY);
  var queryBlogPosts = data ? data.allBlogPosts : null;
  const blogPosts = queryBlogPosts
    ? queryBlogPosts.data.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    : null;
  return (
    <div>
      {blogPosts &&
        blogPosts.map((b) => {
          return (
            <BlogPost
              key={b._id}
              title={b.title}
              date={b.date}
              content={b.content}
              imgs={b.images}
            />
          );
        })
      }
    </div>
  );
};

export default OldProjects;
