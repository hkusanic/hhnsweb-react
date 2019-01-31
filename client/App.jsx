import React, {Component} from 'react';
import Home from './containers/Home/Home';
import { hot } from 'react-hot-loader'

export class App extends Component {
    render(){
        return (
            <div>
                <Home />
            </div>
        );
    }
}

export default hot(module)(App);