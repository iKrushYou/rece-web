import React, { FunctionComponent, useState } from 'react';
import { Container, Tab, Tabs } from '@material-ui/core';
import Layout from './Layout';
import ItemsTab from './ItemsTab';
import PeopleTab from './PeopleTab';
import { AppDataContextProvider } from './hooks/useAppData';

const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <AppDataContextProvider>
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
      </AppDataContextProvider>
    </div>
  );
};

export default App;
