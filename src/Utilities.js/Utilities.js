import { useState, useLayoutEffect} from 'react';
import Cookies from 'js-cookie';

const ACCOUNT = "token";

function useWindowSize() {
  
	const [size, setSize] = useState([0, 0]);
	
	useLayoutEffect(() => {
	  function updateSize() {
		setSize([window.innerWidth, window.innerHeight]);
	  }
	  window.addEventListener('resize', updateSize);
	  updateSize();
	  return () => window.removeEventListener('resize', updateSize);
	}, []);
  
	return size;
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1);
}

// Set cookie when login
function setCookie(name, value, days) {
	Cookies.set(`${name}`, `${value}`, { expires: days }, { secure: true }, { sameSite: 'none' })
	return name;
}

function getCookie(name) {
	const cookie = Cookies.get(`${name}`);
	if (cookie) return cookie;
    return "";
}

// Deletes the token of the user
function deleteCookie(name) {
    Cookies.remove(`${name}`);
}

// Check if a user is not logged in, and redirects to login page
function checkAuthorized() {
    
	const user = getCookie(ACCOUNT);
   
	if (user) {
      return user;
    } else {
      return "";
    }
}

export {
	useWindowSize,
	capitalize,
	setCookie,
	getCookie,
	deleteCookie,
	checkAuthorized,
}