import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {statusType} from "./App";

export type PropsTasks = {
    title?: string
    taskData: Array<PropsTask>
    deleteTask: (idTask: string) => void
    changeStatusFilter: (status: statusType) => void
    addTask: (title: string) => void
    changeCheckedStatus: (idTask: string, isDone: boolean) => void
    status: statusType

}

export type PropsTask = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<PropsTasks> = (props) => {

    const [newInputValue, setNewInputValue] = useState('') //локальный стейт для инпута
    const [error, setError] = useState<string | null>(null)


    //------------------функции обработчики для TL--------------
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInputValue(e.currentTarget.value) //отрисовываем полученое из инпута тек значение, каренттаргет - объ с которым произошло событие
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null) // !!!!!если кнопки нажимаются то ерор = нал и при вводе исчезает красное

        if (e.key === 'Enter') { //если было нажатие интер на инпут то
            addTaskListener();
        }
    }
    const addTaskListener = () => {
        if (newInputValue.trim() !== '') {
            props.addTask(newInputValue.trim())//выполняется функция добавления новой таски
            setNewInputValue('') //возращение пустого инпута после добавления таски в TL
        } else {
            setError('Title is required')
        }
    }
    // f-ии для кнопок фильтра - смены статуса тасок
    const AllClickHandler = () => {
        props.changeStatusFilter('all')
    }
    const ActiveClickHandler = () => {
        props.changeStatusFilter('active')
    }
    const CompletedClickHandler = () => {
        props.changeStatusFilter('completed')
    }
    //--------------------------- зе енд обработчики TL ----------------

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={newInputValue}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ""}
                    />
                    <button onClick={addTaskListener}>+
                    </button>
                    {error && <div className={'error-msg'}>{error}</div>}
                </div>
                <ul>
                    {props.taskData.map((t) => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(t.id)
                        }
                        const checkedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckedStatus(t.id, e.currentTarget.checked)
                        }
                        return <li className={t.isDone ? 'is-done' : ''}
                            key={t.id}> {/*используем ключ, реакту важно знать что мы мапим/удаляем, надо связать объект с jsx*/}
                            <input type="checkbox"
                                   onChange={checkedTaskHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={deleteTaskHandler}>
                                x
                            </button>
                        </li>
                    })
                    }
                </ul>
                <div>
                    <button className={props.status === 'all' ? 'active-filter' : ''} onClick={AllClickHandler}>All
                    </button>
                    <button className={props.status === 'active' ? 'active-filter' : ''} onClick={ActiveClickHandler}>Active
                    </button>
                    <button className={props.status === 'completed' ? 'active-filter' : ''} onClick={CompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

