import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { setActiveLanguage, withLocalize } from 'react-localize-redux';
import reactCookie from 'react-cookies';

  

export class LanguageSwitch extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    languageToggle(language) {
        setActiveLanguage(language);
        reactCookie.save("languageCode", language, { path: '/' });
        window.location.reload();
    }

    render() {
        let currentLanguage = 'en';
        if(reactCookie.load('languageCode')){
         currentLanguage = reactCookie.load('languageCode');
         }
        return (
        <span>
        <a  className={currentLanguage === 'en' ? 'color-toggle' : 'color-toggle-cursor'} onClick={
            ()=> {
            if(currentLanguage !== 'en'){
            this.languageToggle('en');
        }}} >en </a> |
        <a  className={currentLanguage === 'ru' ? 'color-toggle' : 'color-toggle-cursor'} onClick={()=> {
            if(currentLanguage !== 'ru'){
            this.languageToggle('ru')}}}> ru </a>
        </span>);
      }

}

export default withLocalize(LanguageSwitch);
