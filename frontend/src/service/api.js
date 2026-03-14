import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';
//used to send http requests.frontend-axios request-backend api-firebase-return data

export const getAllEvents = () => axios.get(API_URL);
export const createEvent = (data) => axios.post(API_URL, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);