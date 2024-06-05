import styles  from '../navbar-layout/navbar-layout.styles.css'
import { navigateTo } from '../../Router';
export function NavbarLayout(pageContent, logic){
    
    const root = document.getElementById('root');
    const logout = `
        <button type="button" id="logout">Logout</button>
    `

    root.innerHTML = `
        <nav class="${styles.nav}">
            <li class="${styles.nav_left}"><a  href="/tasks">Task</a></li>
            <li class="${styles.nav_left}><a  href="/profile">Profile</a></li>
            <li class="${styles.nav_left}></li><a  href="/logout">user</a></li>

            ${logout}
        </nav>

        ${pageContent}
    `;
    logic();

    const $logoutButton = root.querySelector('#logout');
    $logoutButton.addEventListener('click', e => {
        e.defaultPrevented
        localStorage.removeItem('token');
        navigateTo('/login');
    });
}