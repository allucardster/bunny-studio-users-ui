import { createClient } from 'react-fetching-library';
import { requestHostInterceptor } from './interceptors';

const client = createClient({
  requestInterceptors: [requestHostInterceptor(process.env.REACT_APP_API_BASE_URL)]
});

export default client;