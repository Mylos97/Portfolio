import React from "react";
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

const OldProjects = () => {
  const { data, loading } = useQuery(ITEMS_QUERY);

  return (
    <div>
      OOOLD PROJECTS
      {loading && <div>loading</div>}
      {data && (
        <ul>
          {data.allBlogPosts.data.map((blogpost) => {
            return <li key={blogpost._id}>{blogpost.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default OldProjects;
