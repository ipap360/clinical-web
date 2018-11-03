import net, { toQueryParams } from './api';

const API_ENDPOINT = "/room-availability";

export const query = ({ from, to }) => {
    return net.get(API_ENDPOINT + toQueryParams({
        from, to
    }));
}