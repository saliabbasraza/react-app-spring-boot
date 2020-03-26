import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';
const STUDENT_API_URL = `${API_BASE_URL}/student`;

class StudentService {
    getAll() {
        return axios.get(STUDENT_API_URL);
    }

    delete(id) {
        return axios.delete(`${STUDENT_API_URL}/${id}`);
    }

    get(id) {
        return axios.get(`${STUDENT_API_URL}/${id}`);
    }

    add(student) {
        return axios.post(`${STUDENT_API_URL}`, student);
    }

    update(student) {
        return axios.put(`${STUDENT_API_URL}/${student.id}`, student);
    }
}

export default new StudentService();