import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  DisplayText,
  Card,
  TextContainer,
  SkeletonDisplayText
} from '@shopify/polaris';

function PolarisIssueCount({ loading, repository }) {
  if (loading) {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="large" />
        </TextContainer>
      </Card>
    );
  }

  return (
    <div className="PolarisIssueCount">
      <Card title="Open issues" sectioned>
        <DisplayText size="large">
          {repository.issues.totalCount}
        </DisplayText>
      </Card>
    </div>
  );
}

const ISSUE_QUERY = gql`
  query IssueCountQuery { 
    repository(owner:"shopify", name:"polaris") { 
      issues(states:OPEN) {
        totalCount
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
})(PolarisIssueCount);
