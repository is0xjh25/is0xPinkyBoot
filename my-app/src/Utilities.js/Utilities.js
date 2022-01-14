import { useState, useLayoutEffect} from 'react';

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

export {
	useWindowSize,
	capitalize
}