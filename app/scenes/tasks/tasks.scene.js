export function  TasksScene(){

    const pageContent = `
        <div>Hola mundo</div>
    `;
    const logic = () => {
        console.log('hola mundo');
    } ;

    return {
        pageContent,
        logic
    }

}