import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  ResourceList,
  Card,
  TextStyle,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';

function PolarisIssueList({ loading, repository }) {
  if (loading) {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={5} />
        </TextContainer>
      </Card>
    );
  }

  const issues = repository.issues.edges.map((issue, index) => {
    return {
      url: issue.node.url,
      attributeOne: issue.node.title,
      attributeTwo: `from ${issue.node.author.login}`,
      attributeThree: <TextStyle variation="subdued">{issue.node.createdAt}</TextStyle>,
    }
  });

  return (
    <div className="PolarisIssues">
      <Card title="Latest issues">
        <ResourceList
          items={issues}
          renderItem={(item, index) => {
            return <ResourceList.Item key={index} {...item} />;
          }}
        />
      </Card>
    </div>
  );
}

const ISSUE_QUERY = gql`
  query IssueQuery { 
    repository(owner:"shopify", name:"polaris") {
      issues(last:5, states:OPEN) {
        edges {
          node {
            title
            url
            author {
              login
            }
            createdAt
          }
        }
      }
    }
  }
`;

export default graphql(ISSUE_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { loading, repository } }) => {
    return ({
      loading,
      repository,
    })
  },
})(PolarisIssueList);
