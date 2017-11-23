import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  DisplayText,
  Card,
  TextContainer,
  SkeletonDisplayText,
  TextStyle,
  Stack
} from '@shopify/polaris';

function MilestoneStatus({ loading, search }) {
  if (loading && !search) {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="large" />
        </TextContainer>
      </Card>
    );
  }

  const openIssues = search.edges.filter((issue) => issue.node.state === "OPEN");
  const closedIssues = search.edges.filter((issue) => issue.node.state === "CLOSED");

  const percentageComplete = (closedIssues.length / search.issueCount) * 100

  return (
    <Card title="v2.0 Milestone" sectioned>
      <Stack vertical>
        <DisplayText size="large">
          {percentageComplete}% complete
        </DisplayText>
        <p>
          <TextStyle variation="subdued">
            {closedIssues.length} / {search.issueCount} issues
          </TextStyle>
        </p>
      </Stack>
    </Card>
  );
}

const MILESTONE_QUERY = gql`
  query MilestoneQuery {
  search(
    first: 50,
    type: ISSUE,
    query: "repo:shopify/polaris milestone:v2.0"
  ) {
    issueCount
    edges {
      node {
        ... on Issue {
          createdAt
          title
          url
          state
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
})(MilestoneStatus);
