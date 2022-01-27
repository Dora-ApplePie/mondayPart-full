import React, {useState} from 'react';
import './App.css';
import {PropsTask, Todolist} from "./Todolist";
import {v1} from "uuid";


export type statusType = 'all' | 'active' | 'completed' //создаем 3 названия фильтров которые могут быть

function App() {

    let [tasks, setTasks] = useState<Array<PropsTask>>([
            {id: v1(), title: 'HTML 5', isDone: true}, //0 объект
            {id: v1(), title: 'CSS 3', isDone: true}, //1 объект
            {id: v1(), title: 'TypeScript', isDone: true}, //2 объект
            {id: v1(), title: 'React', isDone: true}, //3
            {id: v1(), title: 'Node.js', isDone: false}, //4
            {id: v1(), title: 'Vue.js', isDone: false}, //5
            {id: v1(), title: 'Redux', isDone: true}, //6
            {id: v1(), title: 'Angular', isDone: false}, //7 ...
        ]
    ) //создаем стейт и помещаем в хук для присвоейния к переменной tasks и ее отрисовки
    let [status, setStatus] = useState<statusType>('all') //создаем хук и присваеваем значение 'all' переменной status
    //что бы отображались все таски при первичной отрисовки тасок

    function changeStatusFilter(status: statusType) {
        setStatus(status)
    } //функция для отрисовки текущего фильтра (сначала это 'all'), затем в зависимости от того какая будет нажата кнопка в тудулисте
    //данная функция подписчик обработчика события онклик вернет новый статус и в зависимости от условий прописаных ниже отфильтруются и отрисуются таски

    let FilteredTasksForToDo = tasks; // переменная с тасками для последющей фильтрации тасок

    if (status === 'active') {
        FilteredTasksForToDo = tasks.filter(t => !t.isDone) //условие  для показа тасок у которых исдон не равыно тру
    }
    if (status === 'completed') {
        FilteredTasksForToDo = tasks.filter(t => t.isDone) //условие для показа тасок у которых исдон равно тру
    }

    function deleteTask(idTask: string) {
        const FilteredTasks = tasks.filter(t => t.id !== idTask)
        setTasks(FilteredTasks)
    } //функция  удаления тасок, т.е. фильтр сравнения айди таски из наших тасок в стейте и айди на которой был нажат крестик
    //если значение фолс то произойдет перерисовка тасок

    function addTask(title: string) {
        const NewTask = {id: v1(), title: title, isDone: false} //создаем новую таску с тайтлом который передаем в функцию
        setTasks([NewTask, ...tasks]) // отрисовка новая таска плюс все таски из массива с помощью рест ...
    }

    function changeCheckedStatus(idTask: string, isDone: boolean) {
        let task = tasks.find(t => t.id === idTask)
        if (task) { //тайпскрипт говорит а вдруг вы передадите айдишку которую хрен найдешь поэтому мы должны проверить существует ли она(псевдо истина псевдо ложь)
            task.isDone = isDone //меняем у таски исдон на который передаем в ончендж
        }
        setTasks([...tasks]) //отрисовка через деструктуризация - отрисуй которые поменялись
    }

    return (
        <div>
            <h1>TODOLIST</h1>
            <Todolist title={'My working stack'}
                      taskData={FilteredTasksForToDo} //передаем таски после фильтрации
                      deleteTask={deleteTask}
                      addTask={addTask}
                      changeStatusFilter={changeStatusFilter}
                      changeCheckedStatus={changeCheckedStatus}
                      status={status}/>
        </div>
    );
}

export default App;
