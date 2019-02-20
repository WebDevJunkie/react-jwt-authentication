import { authHeader } from '../_helpers'

const BASEURL = 'https://localhost:44343';

export const userService = {
    login,
    logout,
    getAll
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${BASEURL}/users/authentication`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BASEURL}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return Response.text.then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (!response.status === 401) {
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
}
