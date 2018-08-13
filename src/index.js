import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Evaluator from './evaluator/Evaluator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Evaluator />, document.getElementById('root'));
registerServiceWorker();
