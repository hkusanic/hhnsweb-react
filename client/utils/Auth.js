class Auth {

	/**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
	static authenticateUser (session, user) {

		try {
			sessionStorage.setItem('session', session);
			sessionStorage.setItem('user', JSON.stringify(user));
		} catch (e) {
			document.cookie = 'session=' + session + ';';
		}
	}

	/**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
	static isUserAuthenticated () {
		var local_storage = sessionStorage.getItem('session');
		var user = sessionStorage.getItem('user');
		if (!local_storage && !user) {
			return true;
		}
		return false;

	}
	/**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
	static deauthenticateUser () {
		sessionStorage.removeItem('session');
		sessionStorage.removeItem('user');

	}
	/**
   * Get a token value.
   *
   * @returns {string}
   */
	static getUserSeesion () {
		var local_storage = sessionStorage.getItem('session');

		return local_storage ? local_storage : '';
	}

	static getUserDetails () {
		var user = sessionStorage.getItem('user');
		return user ? user : '';
	}

}
export default Auth;
