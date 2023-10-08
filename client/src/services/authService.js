import { userLogin } from '../redux/features/autth/authAction';
import store from '../redux/store';

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!email || !role || !password) {
            return alert('Please provide all fields')
        }
        store.dispatch(userLogin({email, password, role}))
    } catch (error) {
        console.log(error);
    }
}

export const handleRegister = (e, name, role, email, password, organisationName, hospitalName, website, address, phone) => {
    e.preventDefault();
    try {
        if (!name || !role || !email || !password || !organisationName || !hospitalName
            || !website || !address || !phone) return (alert("Please enter all fields"))
        console.log('register', e, name, role, email, password, organisationName, hospitalName, website, address, phone);
    } catch (error) {
        console.log(error);
    }
}