class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(session) {
      try{
        localStorage.setItem('session', session);
      }catch(e){
        document.cookie = "session="+session+";";
      }
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
      var local_storage = localStorage.getItem('session');
      if(!local_storage){
        return true;
      }
      return false;
    
    }
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
      localStorage.removeItem('session');
    }
    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getUserSeesion() {
      var local_storage = localStorage.getItem('session');    
  
      return local_storage ? local_storage : '';
    }

  }
  export default Auth;
  