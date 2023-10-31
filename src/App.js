import Dashboard from "./components/dashboard";
import "./App.css";
import { Provider } from 'react-redux';
import store from "./store/configureStore";

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
