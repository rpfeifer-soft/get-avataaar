import secrets from './secrets.js';
import moment from 'moment';

function log(msg) {
   console.log(moment().format('DD.MM. HH:mm:ss.SSS')+':', msg);
}

log(`Waiting to serve avataars`);
