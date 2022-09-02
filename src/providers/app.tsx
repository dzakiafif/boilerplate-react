import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'stores';
export function AppProviders(props: React.PropsWithChildren) {
  return (
    <Provider store={store}>
      <Router>{props.children}</Router>
    </Provider>
  );
}
