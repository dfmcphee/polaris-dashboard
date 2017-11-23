import React from 'react';

import {Page, Layout, Stack} from '@shopify/polaris';

import IssueList from './IssueList';
import IssueCount from './IssueCount';
import MilestoneStatus from './MilestoneStatus';
import MilestoneList from './MilestoneList';

import './App.css';
import '@shopify/polaris/styles.css';

export default function App() {
  return (
    <div className="App">
      <Page title="Polaris dashboard">
        <Stack vertical>
          <Layout>
            <Layout.Section primary>
              <IssueList />
            </Layout.Section>
            <Layout.Section secondary>
              <IssueCount />
            </Layout.Section>
          </Layout>
          <Layout>
            <Layout.Section primary>
              <MilestoneList />
            </Layout.Section>
            <Layout.Section secondary>
              <MilestoneStatus />
            </Layout.Section>
          </Layout>
        </Stack>
      </Page>
    </div>
  );
}
