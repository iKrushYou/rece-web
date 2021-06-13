import React, { useState } from 'react';
import { Container, Tab, Tabs } from '@material-ui/core';
import Layout from './Layout';
import ItemsTab from './ItemsTab';
import PeopleTab from './PeopleTab';

interface ReceiptItem {
  id: string;
  name: string;
  cost: number;
}

interface ItemEntryForm {
  name: string;
  cost: number;
}

const itemEntryFormDefaults: Partial<ItemEntryForm> = {
  name: '',
  cost: undefined,
};

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <Layout>
        <Container>
          <Tabs
            value={currentTab}
            onChange={(event, value) => setCurrentTab(value)}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={{ marginBottom: 20 }}
          >
            <Tab label="Items" />
            <Tab label="People" />
          </Tabs>
          {currentTab === 0 && <ItemsTab />}
          {currentTab === 1 && <PeopleTab />}
        </Container>
      </Layout>
    </div>
  );
}

export default App;
