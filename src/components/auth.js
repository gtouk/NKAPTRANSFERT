export const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
    localStorage.removeItem('jwtToken');
};
