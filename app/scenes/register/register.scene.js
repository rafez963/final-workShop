import { encryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch-api';
import styles from './register.styles.css';
import { navigateTo } from '../../Router';

export function RegisterScene() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h2> Registro de Usuarios </h2>
        <form class="${styles.form}">
            <input type="text" placeholder="Nombre" autocomplete="name" />
            <input type="email" placeholder="johndow@gmail.com" autocomplete="email"/>
            <input type="password" placeholder="password" autocomplete="current-password" />
            <button type="submit">Register</button>
        </form>
    `;
    
    // Logic
    const $nameHtml = root.querySelector('input[type="text"]');
    const $emailHtml = root.querySelector('input[type="email"]');
    const $passwordHtml = root.querySelector('input[type="password"]');
    const $myForm = root.getElementsByTagName('form')[0];
    
    $myForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!$nameHtml.value || !$emailHtml.value || !$passwordHtml.value) {
            alert("Por favor completa todos los campos");
            return;
        }

        // Fetch
        const userCreated = await fetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: $nameHtml.value,
                email: $emailHtml.value,
                password: encryptData($passwordHtml.value)
            })
        });

        if (userCreated) {
            alert("Usuario creado correctamente");
            navigateTo('/login');
        } else {
            alert("Hubo un problema creando el usuario");
        }
    });
}
