// Instruments
import { app } from './server';
import { getPort } from './utils';

// const PORT = getPort();
const PORT = 3000;

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Server API is up on port ${PORT}`);
});
