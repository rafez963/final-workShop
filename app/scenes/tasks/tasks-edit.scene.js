export function TasksEditPage() {
    // Define el contenido HTML del formulario de edición de tareas
    const pageContent = `
        <form id="edit-form">
            <input type="text" placeholder="Título de tarea..." id="title">
            <input type="text" placeholder="Descripción" id="description">
            <select name="priority">
                <option value="" disabled selected>-----Selecciona una prioridad----</option>
                <option value="HIGH">Alta</option>
                <option value="MEDIUM">Media</option>
                <option value="LOW">Baja</option>
            </select>
            <input type="date" id="date"/>
            <input type="submit" value="Guardar Cambios" />
        </form>    
    `;

    // Define la lógica asíncrona para manejar la edición de tareas
    const logic = async () => {
        // Obtiene los parámetros de búsqueda de la URL actual
        const searchParams = window.location.search;
        // Transforma los parámetros de búsqueda en un objeto URLSearchParams
        const paramsTransformed = new URLSearchParams(searchParams);
        // Obtiene el valor del parámetro 'taskId' de la URL
        const taskId = paramsTransformed.get('taskId');
        
        try {
            // Realiza una solicitud fetch para obtener los datos de la tarea específica por su taskId
            const fetchedTaskId = await fetch(`http://localhost:3000/tasks/${taskId}`);
            if (!fetchedTaskId) {
                // Lanza un error si la respuesta no es exitosa
                throw new Error(`HTTP error! status: ${fetchedTaskId.status}`);
            }
            // Convierte la respuesta en formato JSON
            const responseJson = await fetchedTaskId.json();

            // Selecciona los elementos del DOM correspondientes a los campos del formulario
            const $selectPriority = document.querySelector('[name="priority"]');
            const $inputTitle = document.getElementById('title');
            const $inputDescription = document.getElementById('description');
            const $inputDate = document.getElementById('date');

            // Asigna los valores obtenidos de la respuesta JSON a los campos del formulario
            $inputTitle.value = responseJson.title;
            $inputDate.value = responseJson.date;
            $selectPriority.value = responseJson.priority;
            $inputDescription.value = responseJson.description;

            // Selecciona el formulario de edición por su id
            const $form = document.getElementById('edit-form');
            // Agrega un manejador de eventos para el envío del formulario
            $form.addEventListener('submit', async (e) => {
                // Previene el comportamiento predeterminado del formulario (recarga de la página)
                e.preventDefault();

                // Crea un objeto con los valores actualizados de la tarea
                const updatedTask = {
                    title: $inputTitle.value,
                    description: $inputDescription.value,
                    priority: $selectPriority.value,
                    date: $inputDate.value
                };

                try {
                    // Realiza una solicitud fetch para actualizar la tarea en el servidor mediante un método PUT
                    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedTask)
                    });
                    if (!response.ok) {
                        // Lanza un error si la respuesta no es exitosa
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // Convierte la respuesta en formato JSON
                    const jsonObject = await response.json();
                    console.log(jsonObject);
                    // Muestra una alerta de éxito
                    alert('Tarea actualizada con éxito');
                    // Navega de vuelta a la página de lista de tareas
                    navigateTo('/tasks');
                } catch (error) {
                    // Maneja cualquier error que ocurra durante la actualización
                    console.error('Error updating task:', error);
                }
            });
        } catch (error) {
            // Maneja cualquier error que ocurra al obtener los datos de la tarea
            console.error('Error fetching task:', error);
        }
    };

    // Devuelve el contenido de la página y la lógica asociada
    return {
        pageContent,
        logic
    };
}
