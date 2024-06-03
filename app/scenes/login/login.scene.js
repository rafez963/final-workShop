import { navigateTo } from '../../Router';
import { decryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch-api';
import styles from './login.styles.css'

export function LoginScene() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <form class="${styles.form}">
            <h1>Login</h1>
            <input type="email" placeholder="johndoe@example.com" autocomplete="email">
            <input type="password" placeholder="password" autocomplete="current-password">
            <button type="submit">Login</button>
        </form>
    `;
    
    const $emailHTML = root.querySelector('input[type="email"]');
    const $passwordHTML = root.querySelector('input[type="password"]');
    const $myForm = root.getElementsByTagName('form')[0];

    $myForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        if (!$emailHTML.value || !$passwordHTML.value) {
            alert("Por favor completa todos los campos");
            return;
        }
        //fech - pregunta linea 29 de donde se optiene user.email
        const users = await fetchApi('http://localhost:3000/users')
        const user = users.find( user => user.email === $emailHTML.value &&  decryptData( user.password)== $passwordHTML.value)

        if (user) {
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem('token', token);
            navigateTo('/tasks')
            
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });


}
