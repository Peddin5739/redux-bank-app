import {createStore} from 'redux';
import rootReducer from '../reducers/indexReducer';

const ConfigureStore=()=>{
    return createStore(rootReducer);
}

export default ConfigureStore;