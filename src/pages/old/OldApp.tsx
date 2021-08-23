import React, { FunctionComponent, useState } from 'react';
import { Container, Tab, Tabs } from '@material-ui/core';
import ItemsTab from './ItemsTab';
import PeopleTab from './PeopleTab';
import { AppDataContextProvider } from '../../hooks/useAppData';
import { DebugView } from '../../components/DebugView';

const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <AppDataContextProvider>
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
        <DebugView />
      </AppDataContextProvider>
    </div>
  );
};

export default App;
