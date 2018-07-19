import React from 'react';

import {AppProvider, Page, Layout, Stack} from '@shopify/polaris';

import IssueList from './IssueList';
import IssueCount from './IssueCount';

import '@shopify/polaris/styles.css';

export default function App() {
  return (
    <AppProvider>
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
        </Stack>
      </Page>
    </AppProvider>
  );
}
