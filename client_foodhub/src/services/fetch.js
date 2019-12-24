import Auth from './auth';

export default function FetchFactory(baseUrl) {
    const callFetch = (url, options) => fetch(`${baseUrl}${url}`, options);

    return {
        get: (url, { auth = true, headers = {} } = {}) =>
            callFetch(url, {
                method: 'GET',
                headers: new Headers({
                    ...headers,
                    ...(auth ? Auth.getAuthHeader() : {}),
                }),
            }),
        put: (url, body, { auth = true, headers = {} } = {}) =>
            callFetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: new Headers({
                    ...headers,
                    ...{ 'Content-Type': 'application/json' },
                    ...(auth ? Auth.getAuthHeader() : {}),
                }),
            }),
        post: (url, body, { auth = true, headers = {} } = {}) =>
            callFetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: new Headers({
                    ...headers,
                    ...{ 'Content-Type': 'application/json' },
                    ...(auth ? Auth.getAuthHeader() : {}),
                }),
            }),
        postForm: (url, formData, { auth = true, headers = {} } = {}) =>
            callFetch(url, {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    ...headers,
                    ...(auth ? Auth.getAuthHeader() : {}),
                }),
            }),
    };
}
