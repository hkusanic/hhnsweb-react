class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
      try{
        localStorage.setItem('token', token);
      }catch(e){
        document.cookie = "token="+token+";";
      }
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
      var local_storage = localStorage.getItem('token');
      var cookie_token = this.getCookieToken();
      if(!local_storage && !cookie_token){
        return true;
      }
      return false;
    
    }
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
      localStorage.removeItem('token');
      this.removeCookieToken();
    }
    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getToken() {
      var local_storage = localStorage.getItem('token');    
      var cookie_token = this.getCookieToken();
  
      return local_storage ? local_storage : cookie_token;
    }
  
    static getCookieToken(){
      let  cookieName = "token=";
      let ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookieName) == 0) 
          return c.substring(cookieName.length,c.length);
      }
    return null;
    }
  
    static getCookieKey(){
      let  cookieName = "key=";
      let ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookieName) == 0) 
          return c.substring(cookieName.length,c.length);
      }
    return null;
    }
  
    static removeCookieToken(){
      console.log("Removing cookieXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log("Cookie value ===================>", this.getCookieToken())
    }
  
    static removeCookieKey(){
      document.cookie = 'key=;  Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
  export default Auth;
  