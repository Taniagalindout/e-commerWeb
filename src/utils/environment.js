const url = 'http://3.213.43.214:3000/api';

export const createURL = (parameters) => {
    const route = parameters.join('/');
    return url + route;
}
