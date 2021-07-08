import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import tileGame from './reducers/tile-game-reducer'
import { initGame, shuffleTiles } from './reducers/actions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { NumImages } from './constants';

// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(tileGame, composeEnhancers(
    applyMiddleware(thunk)
));

store.dispatch(initGame(Math.floor(Math.random() * NumImages) + 1, 4));
store.dispatch(shuffleTiles())
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
