// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import 'channels';

import ReactDOM from 'react-dom';
import Rails from '@rails/ujs';

import Routes from 'routes';


Rails.start();

ReactDOM.render(<Routes />, document.getElementById('react-root'));
