import { Provider } from 'react-redux';
import './App.css';
import { ReduxDataFetchingComponent } from './components/ReduxDataFetchingComponent';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ReduxDataFetchingComponent />
      </div>
    </Provider>
  );
}

export default App;
