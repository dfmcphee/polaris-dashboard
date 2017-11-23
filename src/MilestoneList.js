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

function MilestoneList({ loading, search }) {
  if (loading && !search) {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText lines={5} />
        </TextContainer>
      </Card>
    );
  }

  let issues = [...search.edges];

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
        <Heading>Open v2.0 issues</Heading>
      </Card.Section>
      <ResourceList
        items={issues}
        renderItem={(item, index) => {
          return <ResourceList.Item key={index} {...item} />;
        }}
      />
      <Card.Section>
        <Link url="https://github.com/Shopify/polaris/milestone/1">
          View milestone
        </Link>
      </Card.Section>
    </Card>
  );
}

const MILESTONE_QUERY = gql`
  query MilestoneQuery {
  search(
    first: 5,
    type: ISSUE,
    query: "repo:shopify/polaris milestone:v2.0 state:open"
  ) {
    issueCount
    edges {
      node {
        ... on Issue {
          createdAt
          title
          url
          author {
            login
          }
        }
      }
    }
  }
}
`;

export default graphql(MILESTONE_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
    pollInterval: 150000,
    forceFetch: true,
    notifyOnNetworkStatusChange: true
  },
  props: ({ data: { loading, search } }) => {
    return ({
      loading,
      search,
    })
  },
})(MilestoneList);

