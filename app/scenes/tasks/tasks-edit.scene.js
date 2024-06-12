<<<<<<< HEAD
export function TasksEditPage() {
    // Define el contenido HTML del formulario de edición de tareas
    const pageContent = `
        <form id="edit-form">
            <input type="text" placeholder="Título de tarea..." id="title">
            <input type="text" placeholder="Descripción" id="description">
            <select name="priority">
=======
import { navigateTo } from '../../Router'

export function TasksEditPage() {
    const pageContent = `
        <form id="edit-task-form">
            <input type="text" placeholder="Titulo de tarea..." id="title" required>
            <input type="text" placeholder="Descripcion" id="description" required>
            <select name="priority" required>
>>>>>>> f79e5fe1292456e5a2628d3025fd5095b20f63c1
                <option value="" disabled selected>-----Selecciona una prioridad----</option>
                <option value="HIGH">Alta</option>
                <option value="MEDIUM">Media</option>
                <option value="LOW">Baja</option>
            </select>
<<<<<<< HEAD
            <input type="date" id="date"/>
            <input type="submit" value="Guardar Cambios" />
=======
            <input type="date" id="date" required/>
            <input type="submit" value="Actualizar Tarea" />
>>>>>>> f79e5fe1292456e5a2628d3025fd5095b20f63c1
        </form>    
    `;

    // Define la lógica asíncrona para manejar la edición de tareas
    const logic = async () => {
<<<<<<< HEAD
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
=======
        const searchParams = new URLSearchParams(window.location.search);
        const taskId = searchParams.get('taskId');

        const fetchedTask = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const task = await fetchedTask.json();

        const $form = document.getElementById('edit-task-form');
        const $inputTitle = document.getElementById('title');
        const $inputDescription = document.getElementById('description');
        const $selectPriority = document.querySelector('[name="priority"]');
        const $inputDate = document.getElementById('date');

        $inputTitle.value = task.title;
        $inputDescription.value = task.description;
        $selectPriority.value = task.priority;
        $inputDate.value = task.date;

        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedTask = {
                title: $inputTitle.value,
                description: $inputDescription.value,
                priority: $selectPriority.value,
                date: $inputDate.value
            };

            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                alert('Tarea actualizada con éxito');
                navigateTo('/tasks');
            } else {
                alert('Error al actualizar la tarea');
            }
        });
    };
>>>>>>> f79e5fe1292456e5a2628d3025fd5095b20f63c1

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
