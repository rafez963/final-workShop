import { navigateTo } from '../../Router'

export function TasksEditPage() {
    const pageContent = `
        <form id="edit-task-form">
            <input type="text" placeholder="Titulo de tarea..." id="title" required>
            <input type="text" placeholder="Descripcion" id="description" required>
            <select name="priority" required>
                <option value="" disabled selected>-----Selecciona una prioridad----</option>
                <option value="HIGH">Alta</option>
                <option value="MEDIUM">Media</option>
                <option value="LOW">Baja</option>
            </select>
            <input type="date" id="date" required/>
            <input type="submit" value="Actualizar Tarea" />
        </form>    
    `;

    const logic = async () => {
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

    return {
        pageContent,
        logic
    };
}
