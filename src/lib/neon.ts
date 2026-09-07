import { createClient } from '@neondatabase/neon-js';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

const authUrl = import.meta.env.VITE_NEON_AUTH_URL;
const dataApiUrl = authUrl
  .replace('.neonauth.', '.apirest.')
  .replace(/\/auth\/?$/, '/rest/v1');

export const neon = createClient({
  auth: {
    url: authUrl,
    adapter: BetterAuthReactAdapter(),
  },
  dataApi: {
    url: dataApiUrl,
  },
});