import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TimeAgo from 'react-timeago';

import {
  ResourceList,
  Card,
  Heading,
  Link,
  TextStyle,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText,
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

  const issues = [...repository.issues.edges]
    .map((issue, index) => {
      return issue.node;
    })
    .sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <Card>
      <Card.Section>
        <Heading>Latest issues</Heading>
      </Card.Section>
      <ResourceList
        resourceName={{ singular: 'issue', plural: 'issues' }}
        items={issues}
        renderItem={(item) => {
          const { id, title, url, author, createdAt } = item;

          return (
            <ResourceList.Item
              id={id}
              url={url}
              accessibilityLabel={`View details for issue`}
            >
              <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
              <TextStyle variation="subdued">
                from {author.login} <TimeAgo date={createdAt} />
              </TextStyle>
            </ResourceList.Item>
          );
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
      issues(last: 10, states:OPEN) {
        edges {
          node {
            id
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
