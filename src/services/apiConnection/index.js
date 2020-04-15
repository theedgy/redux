import { paramStringify } from '../paramsStringify';

export const apiConnection = async (endpoint = '', data = null) => {
    const url = data
        ? `/${endpoint}?${paramStringify(data)}`
        : `/${endpoint}`;

    return await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': '78989ff855294ecc83d070f5d9590eb0',
            },
        });
};

