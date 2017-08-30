import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './Homepage';
import registerServiceWorker from './registerServiceWorker';
import actionCable from 'actioncable'

const CableApp = {}

CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

ReactDOM.render(<Homepage cableApp={CableApp}/>, document.getElementById('root'));
registerServiceWorker();
