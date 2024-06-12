import { navigateTo } from "../../Router";
import styles from "../tasks/tasks.styles.css";

export function TasksScene() {
  const pageContent = `
    <form>
        <input type="text" placeholder="Titulo de tarea..." id="title">
        <input type="text" placeholder="Descripcion" id="description">
        <select name="priority">
            <option value="" disabled selected>-----Selecciona una prioridad----</option>
            <option value="HIGH">Alta</option>
            <option value="MEDIUM">Media</option>
            <option value="LOW">Baja</option>
        </select>
        <input type="date" id="date"/>
        <input type="submit" value="Crear Tarea"/>
    </form>    
    <div id="all-tasks"></div> 
  `;

  const logic = async () => {
    const $form = document.getElementsByTagName("form")[0];
    const $tasksContainer = document.getElementById("all-tasks");

    try {
      const allTasks = await fetch("http://localhost:3000/tasks");
      if (!allTasks.ok) {
        throw new Error(`HTTP error! status: ${allTasks.status}`);
      }
      const responseJson = await allTasks.json();

      responseJson.forEach(task => {
        $tasksContainer.innerHTML += `
          <div class="${styles.card}">
              <h4>Tarea: </h4>
              <p>${task.title}</p>
              <h4>Descripcion: </h4>
              <p>${task.description}</p>
              <button class="edit-class" data-id="${task.id}">Editar</button>
              <button class="delete-class" data-id="${task.id}">Eliminar</button>
              <button>Vista Previa</button>
          </div>
        `;
      });

      const $editBtns = document.getElementsByClassName("edit-class");
      for (let $editBtn of $editBtns) {
        $editBtn.addEventListener("click", () => {
          navigateTo(`/tasks/edit?taskId=${$editBtn.getAttribute("data-id")}`);
        });
      }

      const $deleteBtns = document.getElementsByClassName("delete-class");
      for (let $deleteBtn of $deleteBtns) {
        $deleteBtn.addEventListener("click", async () => {
          const taskId = $deleteBtn.getAttribute("data-id");
          const confirmed = confirm(`¿Estás seguro de que deseas eliminar esta tarea?`);
          if (confirmed) {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
              method: "DELETE",
            });
            if (response.ok) {
              alert("Tarea eliminada con éxito");
              // Eliminar la tarea del DOM
              const taskCard = $deleteBtn.closest(`.${styles.card}`);
              taskCard.remove();
            } else {
              alert("Error al eliminar la tarea");
            }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }

    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const $inputTitle = document.getElementById("title").value;
      const $inputDescription = document.getElementById("description").value;
      const $inputSelect = document.querySelector('[name="priority"]').value;
      const $inputDate = document.getElementById("date").value;

      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: $inputTitle,
            description: $inputDescription,
            priority: $inputSelect,
            date: $inputDate,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonObject = await response.json();
        console.log(jsonObject);
        alert("Tarea creada con éxito");
        navigateTo("/tasks");
      } catch (error) {
        console.error('Error creating task:', error);
      }
    });
  };

  return {
    pageContent,
    logic,
  };
}
