import React from 'react';

import {Page, Layout} from '@shopify/polaris';

import PolarisIssueList from './PolarisIssueList';
import PolarisIssueCount from './PolarisIssueCount';

import './App.css';
import '@shopify/polaris/styles.css';

export default function App() {
  return (
    <div className="App">
      <Page title="Polaris dashboard">
        <Layout>
          <Layout.Section primary>
            <PolarisIssueList />
          </Layout.Section>
          <Layout.Section secondary>
            <PolarisIssueCount />
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
