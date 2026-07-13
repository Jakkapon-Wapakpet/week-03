// Configuration for Backend API URL
// Since frontend is hosted statically on Express, we can use relative path or location.origin
const API_BASE_URL = window.location.origin + '/api';

window.API_BASE_URL = API_BASE_URL;
