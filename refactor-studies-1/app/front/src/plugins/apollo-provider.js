import { createProvider } from './apollo'

const provider = createProvider();

export const apollo = provider.clients.defaultClient;
export default provider;
