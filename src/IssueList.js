import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TimeAgo from 'react-timeago'

import {
  ResourceList,
  Card,
  Heading,
  Link,
  TextStyle,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';

function IssueList({ loading, repository }) {
  if (loading && !repository) {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={5} />
        </TextContainer>
      </Card>
    );
  }

  let issues = [...repository.issues.edges];

  issues.sort(function (a, b) {
    return new Date(b.node.createdAt) - new Date(a.node.createdAt);
  });

  issues = issues.map((issue, index) => {
    return {
      url: issue.node.url,
      attributeOne: issue.node.title,
      attributeTwo: (
        <TextStyle variation="subdued">
          from {issue.node.author.login} <TimeAgo date={issue.node.createdAt} />
        </TextStyle>
      ),
    }
  });

  return (
    <Card>
      <Card.Section>
        <Heading>Latest issues</Heading>
      </Card.Section>
      <ResourceList
        items={issues}
        renderItem={(item, index) => {
          return <ResourceList.Item key={index} {...item} />;
        }}
      />
      <Card.Section>
        <Link url="https://github.com/Shopify/polaris/issues">
          View all issues
        </Link>
      </Card.Section>
    </Card>
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
    pollInterval: 150000,
    forceFetch: true,
    notifyOnNetworkStatusChange: true
  },
  props: ({ data: { loading, repository } }) => {
    return ({
      loading,
      repository,
    })
  },
})(IssueList);
