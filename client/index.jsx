import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

const Root = () => (
			<App />
)
render(<Root />, document.getElementById('root'))
