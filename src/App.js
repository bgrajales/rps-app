import { Provider } from 'react-redux'
import { useEffect } from 'react'

import { AppRouter } from "./routers/AppRouter";
import { store } from './store/store';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {

  const disconnectPlayer = () => {

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      window.alert('Are you sure you want to leave?');
    });

  }

  useEffect(() => {

    disconnectPlayer()

  }, [])

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
