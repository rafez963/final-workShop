export function UsersPage(){

    const pageContent = `
        <div>
            <h1>Hola mundo desde usuers</h1>
        </div>
    `;

    const logic = () => {
        const $usersPage = document.getElementById('users')
        $usersPage.addEventListener('dblclick', () => {
            alert('hola usuario')
        })
    }

    return{
        pageContent,
        logic
    }

}