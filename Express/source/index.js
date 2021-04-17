// Instruments
import { app } from './server';
import { getPort } from './utils';

const PORT = getPort();

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Server API is up on port ${PORT}`);
});
