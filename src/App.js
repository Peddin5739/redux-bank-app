import Dashboard from "./components/dashboard";
import "./App.css";
import { Provider } from 'react-redux';
import ConfigureStore from "./store/configureStore";
const store = ConfigureStore();

function App() {
  return (
    
      <div className="App">
        <Provider store={store}>
       <Dashboard />
       </Provider>
    </div>
   
    
  );
}

export default App;
