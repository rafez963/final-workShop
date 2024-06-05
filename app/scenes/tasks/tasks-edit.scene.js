export function TasksEditPage(){
    const pageContent = `
                <form>
                <input type="text" placeholder="Titulo de tarea..." id="title">
                <input type="text" placeholder="Descripcion" id="description">
                <select name="priority">
                    <option value="" disabled selected>-----SElecciona una prioridad ------------</option>
                    <option value="HIGH">Alta</option>
                    <option value="MEDIUM">Media</option>
                    <option value="LOW">Baja</option>
                </select>
                <input type="date"  id="date"/>
                <input type="submit" />
            </form>    
            
    `;

    const logic = async () => {
       const searchParams = window.location.search;
       const paramsTransformed = new URLSearchParams(searchParams);
        const taskId = paramsTransformed.get('taskId')
        const fetchedTaskId = await fetch(`http://localhost:3000/tasks/${taskId}`)
        const responseJson = await fetchedTaskId.json()

        const $selectPriority = document.querySelector('[name="priority"]')
        const $inputTitle = document.getElementById('title')
        const $inputDescription = document.getElementById('description')
        const $inputDate = document.getElementById('date')

        $inputTitle.value = responseJson.title
        $inputDate.value = responseJson.date
        $selectPriority.value =  responseJson.priority
        $inputDescription.value = responseJson.description
    }

    return {
        pageContent,
        logic
    }
}