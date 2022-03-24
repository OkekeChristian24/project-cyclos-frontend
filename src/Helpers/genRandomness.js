import { v4 as uuidv4 } from 'uuid';

const genRandomness = () => {
    const timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    return (uuidv4() + timeStampInMs).toString();
};

export default genRandomness;