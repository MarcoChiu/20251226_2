import axios from 'axios';

const api = 'https://api.unsplash.com/search/photos/';
const accessKey = 'Mjilp2VDqxCTCbkq9e6_1NA_43BXd60uD2T56bNMXV8';

export const searchPhotos = async (query) => {
    return await axios.get(api, {
        params: {
            query: query,
            per_page: 10,
            client_id: accessKey
        }
    });
};
