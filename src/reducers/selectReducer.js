import select from '../constants/select'

const initialState = select

const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT':
            if (state[0] !== action.size) {
                const index = state.indexOf(action.size) // индекс нового выбора
                const beforeSelected = state[0] // предыдущий выбор
                state[0] = state[index] // запись нового выбора на первое место
                state.splice(index, 1) // удаление нового выбора с предыдущей позиции в массиве
                for (let i = 1; i < state.length; i++) { // сортировка от меньшего к большему по первому числу для возврата предыдущего выбора на правильную позицию
                    if (state[i].split(' ')[0] > beforeSelected.split(' ')[0]) {
                        state.splice(i, 0, beforeSelected) // запись предыдущего выбора на правильную позицию
                        break
                    } else if (state[i].split(' ')[0] === beforeSelected.split(' ')[0]) { // если первые числа равны проверка по второму числу
                        if (state[i].split(' ')[2] >= beforeSelected.split(' ')[2]) {
                            state.splice(i, 0, beforeSelected) // запись предыдущего выбора на правильную позицию
                            break
                        }
                    }
                    if (i === state.length - 1) { // если предыдущий выбор оказалася наибольшим
                        state.push(beforeSelected)
                        break
                    }
                }
            }
            return state
        case 'SELECT-RESET':
            return select
        default:
            return state
    }
}

export const selectActionCreater = (size) => ({ type: 'SELECT', size: size })
export const selectResetActionCreater = () => ({ type: 'SELECT-RESET' })

export default selectReducer