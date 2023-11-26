const url = 'http://localhost:8080/api';

export const createURL = (parameters) => {
    const route = parameters.join('/');
    return url + route;
}