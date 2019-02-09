import React, {Component} from 'react';
import Home from './containers/Home/Home';
import { hot } from 'react-hot-loader';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, setActiveLanguage } from "react-localize-redux";
import globalTranslations from "./translations/global.json";
import reactCookie from 'react-cookies';

export class App extends Component {
    constructor(props) {
        super(props); 
        const languages = [
        { name: "English", code: "en" },
        { name: "Russian", code: "ru" }
    ];
    const defaultLanguage =  reactCookie.load('languageCode') || languages[0].code;

    if(!reactCookie.load('languageCode')){
        reactCookie.save("languageCode", 'en', { path: '/' });
    }

    this.props.initialize({
      languages,
      translation: globalTranslations,
      options: { renderToStaticMarkup,
                  defaultLanguage }
    });
       
      }
    render(){
        return (
            <div>
                <Home />
            </div>
        );
    }
}

export default withLocalize(hot(module)(App));
