class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(session, user) {

    try {
      localStorage.setItem('session', session);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      document.cookie = "session=" + session + ";";
    }
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    var local_storage = localStorage.getItem('session');
    var user = localStorage.getItem('user');
    if (!local_storage && !user) {
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
    localStorage.removeItem('user');

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

  static getUserDetails() {
    var user = localStorage.getItem('user');
    return user ? user : '';
  }

}
export default Auth;
