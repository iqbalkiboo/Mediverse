import { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoute from './routes/routes';

const App = () =>
  useMemo(() => {
    return (
      <Router>
        <AppRoute />
      </Router>
    );
  }, []);

export default App;
