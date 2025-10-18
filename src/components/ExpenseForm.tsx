// import { useState, useEffect } from "react";
// import './ExpenseForm.css';
// import CustomDatePicker from "./CustomDatePicker";
//
//
// function usePersistedState(key, defaultValue) {
//     const [state, setState] = useState(() => {
//         const saved = localStorage.getItem(key);
//         return saved ? JSON.parse(saved) : defaultValue;
//     });
//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(state));
//     }, [key, state]);
//     return [state,setState];
// }
//
// function DailyExpenses({ expenses, dailyLimits, onDayClick, onDeleteDay  }) {
//     // компонент списка расходов по дням
//     const expensesByDay = expenses.reduce((acc, expense) => {
//         const dateStr = expense.date;
//         if (!acc[dateStr]) {
//             acc[dateStr] = [];
//         }
//         acc[dateStr].push(expense);
//         return acc;
//     }, {});
//
//     // Сортируем дни по дате (новые сверху)
//     const sortedDays = Object.keys(expensesByDay).sort((a, b) => {
//         // return new Date(b) - new Date(a);
//         return new Date(b).getTime() - new Date(a).getTime();
//     });
//
//     return (
//         <div className="daily-expenses">
//             <h2>Расходы по дням</h2>
//             {sortedDays.map(day => {
//                 const dayExpenses = expensesByDay[day];
//                 const dayTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
//                 const dayLimit = dailyLimits[day] || 0;
//                 const remaining = dayLimit - dayTotal;
//
//                 return (
//                     <div key={day} className="day-card" onClick={() => onDayClick(day)}>
//                         <div className="day-header">
//                             <span className="day-date">{day}</span>
//                             <div className="day-amounts">
//                                 <span className="day-total">{dayTotal.toFixed()} Р</span>
//                                 {dayLimit > 0 && (
//                                     <span className={`day-limit ${remaining < 0 ? 'exceeded' : ''}`}>
//                                 Лимит: {dayLimit.toFixed()}</span>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="day-preview">
//                             {dayExpenses.slice(0, 3).map(expense => (
//                                 <div key={expense.id} className="preview-item">
//                                     <span>{expense.description}</span>
//                                     <span>{expense.amount.toFixed()} Р</span>
//                                 </div>
//                             ))}
//                             {dayExpenses.length > 3 && (
//                                 <div className="more-items">+{dayExpenses.length - 3} ещё</div>
//                             )}
//                         </div>
//                         <div className="day-actions">
//                             <button onClick={() => onDeleteDay(day)} className="delete-button">🗑️</button>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
//
// function DayDetails({ day, expenses, dailyLimit, onBack, onSetLimit, onDeleteExpense, onSaveExpense }) {
//     const [editingId, setEditingId] = useState(null);
//     const [editData, setEditData] = useState({description: '', amount: ''});
//     const dayExpenses = expenses.filter(exp => exp.date === day);
//     const dayTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
//     const remaining = dailyLimit - dayTotal;
//
//     const handleEditClick = (expense) => {
//         setEditingId(expense.id);
//         setEditData({
//             description: expense.description,
//             amount: expense.amount.toString()
//         });
//     };
//     const handleSave = (id) => {
//         const updatedExpense = {
//             ...expenses.find(e => e.id === id),
//             description: editData.description,
//             amount: parseFloat(editData.amount)
//         };
//         onSaveExpense(updatedExpense);
//         setEditingId(null);
//     };
//
//     return (
//         <div className="day-details">
//             <button onClick={onBack} className="back-button">← Назад</button>
//             <h2>Расходы за {day}</h2>
//             <div className="day-limit-control">
//                 <input
//                     type="number"
//                     placeholder="Лимит на день"
//                     value={dailyLimit}
//                     onChange={(e) => onSetLimit(e.target.value)}
//                 />
//             </div>
//             {dailyLimit > 0 && (
//                 <div className={`limit-status ${remaining < 0 ? 'over' : 'under'}`}>
//                     {remaining >= 0 ? (
//                         `Осталось: ${remaining.toFixed()}`) : (
//                         `Превышено на ${Math.abs(remaining).toFixed()}`)}
//                 </div>
//             )}
//
//             <div className="details-list">
//                 {dayExpenses.map(expense => (
//                     <div key={expense.id} className="detail-item">
//                         {editingId === expense.id ? (
//                             <div className="edit-form">
//                                 <input
//                                     value={editData.description}
//                                     onChange={(e) => setEditData({...editData, description: e.target.value})}
//                                     className="edit-input"
//                                 />
//                                 <input
//                                     type="number"
//                                     value={editData.amount}
//                                     onChange={(e) => setEditData({...editData, amount: e.target.value})}
//                                     className="edit-input"
//                                 />
//                                 <div className="edit-actions">
//                                     <button
//                                         onClick={() => handleSave(expense.id)}
//                                         className="save-button"
//                                     >
//                                         Сохранить
//                                     </button>
//                                     <button
//                                         onClick={() => setEditingId(null)}
//                                         className="cancel-button"
//                                     >
//                                         Отмена
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <>
//
//                                 <span>{expense.description}</span>
//                                 <span>{expense.amount.toFixed()} </span>
//                                 <div className="item-actions">
//                                     <button
//                                         onClick={() => handleEditClick(expense)}
//                                         className="edit-button">✏️
//                                     </button>
//                                     <button
//                                         onClick={() => onDeleteExpense(expense.id)}
//                                         className="delete-button">🗑️
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
// //             <div className="day-total">
// //                 <h3>Итого за день: {dayTotal.toFixed()} </h3>
// //             </div>
// //         </div>
// //     );
// // }
//
// function ExpenseForm() {
//     const [expenses, setExpenses] = usePersistedState('expenses', []); //состояние для хранения массива добавленных расходов//
//     const [dailyLimits, setDailyLimits] = usePersistedState('dailyLimits', {});
//     const [description, setDescription] = useState(""); //временное состояние для полей ввода//
//     const [amount, setAmount] = useState("");
//     const [date, setDate] = useState(new Date()); // Добавляем состояние для даты
//     const [view, setView] = useState('main');
//     const [selectedDay, setSelectedDay] = useState('');
//     const [editingExpense, setEditingExpense] = useState(null);
//
//
//     const handleEditExpense = (expense) => {
//         setDescription(expense.description);
//         setAmount(expense.amount.toString());
//         setDate(new Date(expense.dateObj));
//         setEditingExpense(expense);
//     };
//
//     const handleSaveExpense = (updatedExpense) => {
//         setExpenses(expenses.map(exp =>
//             exp.id === updatedExpense.id ? updatedExpense : exp
//         ));
//     };
// //логика добавления расхода//
//     const addExpense = () => {
//         if (!description || !amount)
//             return;   //проверка на пустые поля//
//
//         if (editingExpense) { //редактировать сущ расход//
//             const updatedExpenses = expenses.map(exp => exp.id===editingExpense.id
//                 ? {
//                     ...exp,
//                     description,
//                     amount: parseFloat(amount),
//                     date: date.toLocaleDateString('ru-RU'),
//                     dateObj: new Date(date)
//                 }
//                 : exp
//             );
//             setExpenses(updatedExpenses);
//             setEditingExpense(null);
//         }
//         else { //добавить новый расход//
//             const newExpense = {
//                 id: Date.now(),
//                 description,
//                 amount: parseFloat(amount),
//                 date: date.toLocaleDateString('ru-RU'),
//                 dateObj: new Date(date) // Сохраняем объект даты для фильтрации
//             };
//             setExpenses([...expenses, newExpense]);
//         }
//         setDescription("");
//         setAmount("");
//         setDate(new Date());
//     };
//
// //вычисление общей суммы//
//     const handleDelete = (id) => {
//         setExpenses(expenses.filter(expense => expense.id !== id));
//     };
//
//     const handleDayClick = (day) => {
//         setSelectedDay(day);
//         setView('day');
//     };
//
//     const handleBackToMain = () => {
//         setView('main');
//         setEditingExpense(null);
//     };
//     const handleSetDailyLimit = (limit) => {
//         setDailyLimits({...dailyLimits, [selectedDay]: parseInt(limit)});
//     };
//     const handleDeleteDay = (day) => {
//         if (window.confirm(`Удалить все расходы за ${day}?`)) {
//             setExpenses(expenses.filter(expense => expense.date !== day));
//             const newLimits = {...dailyLimits};
//             delete newLimits[day];
//             setDailyLimits(newLimits);
//         }
//     };
//     const handleEditDay = (day) => {
//         const dayExpenses = expenses.filter(exp => exp.date === day);
//         if (dayExpenses.length > 0) {
//             const firstExpense = dayExpenses[0];
//             setDescription(firstExpense.description);
//             setAmount(firstExpense.amount.toString());
//             setDate(new Date(firstExpense.dateObj));
//             setEditingExpense(firstExpense);
//         }
//     };
//
//
//     return (
//         <div className="expense-tracer">
//             {view === 'main' ? (
//                 <>
//                     <h2>Трекер расходов</h2>
//                     <div className="add-expense">
//                         <input
//                             type="text"
//                             placeholder="Описание"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Сумма"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                         />
//                         <CustomDatePicker date={date} onChange={setDate} />
//
//                         {/*<button onClick={addExpense}>+</button>*/}
//                         <button onClick={addExpense}>
//                             {editingExpense ? 'Сохранить' : '+'}
//                         </button>
//                         {editingExpense && (
//                             <button onClick={() => {
//                                 setEditingExpense(null);
//                                 setDescription("");
//                                 setAmount("");
//                                 setDate(new Date());
//                             }}>
//                                 Отмена
//                             </button>
//                         )}
//                     </div>
//
//                     <DailyExpenses
//                         expenses={expenses}
//                         dailyLimits={dailyLimits}
//                         onDayClick={handleDayClick}
//                         onDeleteDay={handleDeleteDay}
//                         onEditDay={handleEditDay} />
//                 </>
//             ) :(
//                 <DayDetails
//                     day={selectedDay}
//                     expenses={expenses}
//                     dailyLimit={dailyLimits[selectedDay]}
//                     onBack={handleBackToMain}
//                     onSetLimit={handleSetDailyLimit}
//                     onDeleteExpense={handleDelete}
//                     onEditExpense={handleEditExpense}
//                     onSaveExpense={handleSaveExpense}
//                 />
//             )}
//         </div>
//     );
// }
// export default ExpenseForm;

import { useState, useEffect } from "react";
import './ExpenseForm.css';
import CustomDatePicker from "./CustomDatePicker";

function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}

function DailyExpenses({ expenses, dailyLimits, onDayClick, onDeleteDay, onEditDay }) {
    const expensesByDay = expenses.reduce((acc, expense) => {
        const dateStr = expense.date;
        if (!acc[dateStr]) {
            acc[dateStr] = [];
        }
        acc[dateStr].push(expense);
        return acc;
    }, {});

    const sortedDays = Object.keys(expensesByDay).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });

    return (
        <div className="daily-expenses">
            <h2>Расходы по дням</h2>
            {sortedDays.map(day => {
                const dayExpenses = expensesByDay[day];
                const dayTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
                const dayLimit = dailyLimits[day] || 0;
                const remaining = dayLimit - dayTotal;

                return (
                    <div key={day} className="day-card">
                        <div className="day-header" onClick={() => onDayClick(day)}>
                            <span className="day-date">{day}</span>
                            <div className="day-amounts">
                                <span className="day-total">{dayTotal.toFixed()} Р</span>
                                {dayLimit > 0 && (
                                    <span className={`day-limit ${remaining < 0 ? 'exceeded' : ''}`}>
                                        Лимит: {dayLimit.toFixed()}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="day-preview" onClick={() => onDayClick(day)}>
                            {dayExpenses.slice(0, 3).map(expense => (
                                <div key={expense.id} className="preview-item">
                                    <span>{expense.description}</span>
                                    <span>{expense.amount.toFixed()} Р</span>
                                </div>
                            ))}
                            {dayExpenses.length > 3 && (
                                <div className="more-items">+{dayExpenses.length - 3} ещё</div>
                            )}
                        </div>
                        <div className="day-actions">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditDay(day);
                                }}
                                className="edit-button"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteDay(day);
                                }}
                                className="delete-button"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function DayDetails({ day, expenses, dailyLimit, onBack, onSetLimit, onDeleteExpense, onEditExpense, onSaveExpense }) {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ description: '', amount: '' });
    const dayExpenses = expenses.filter(exp => exp.date === day);
    const dayTotal = dayExpenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = dailyLimit - dayTotal;

    const handleEditClick = (expense) => {
        setEditingId(expense.id);
        setEditData({
            description: expense.description,
            amount: expense.amount.toString()
        });
        onEditExpense(expense);
    };

    const handleSave = (id) => {
        const updatedExpense = {
            ...expenses.find(e => e.id === id),
            description: editData.description,
            amount: parseFloat(editData.amount)
        };
        onSaveExpense(updatedExpense);
        setEditingId(null);
    };

    return (
        <div className="day-details">
            <button onClick={onBack} className="back-button">← Назад</button>
            <h2>Расходы за {day}</h2>
            <div className="day-limit-control">
                <input
                    type="number"
                    placeholder="Лимит на день"
                    value={dailyLimit || ''}
                    onChange={(e) => onSetLimit(parseInt(e.target.value) || 0)}
                />
            </div>
            {dailyLimit > 0 && (
                <div className={`limit-status ${remaining < 0 ? 'over' : 'under'}`}>
                    {remaining >= 0 ? (
                        `Осталось: ${remaining.toFixed()} Р`
                    ) : (
                        `Превышено на ${Math.abs(remaining).toFixed()} Р`
                    )}
                </div>
            )}

            <div className="day-total">
                <h3>Итого за день: {dayTotal.toFixed()} Р</h3>
            </div>

            <div className="details-list">
                {dayExpenses.map(expense => (
                    <div key={expense.id} className="detail-item">
                        {editingId === expense.id ? (
                            <div className="edit-form">
                                <input
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    className="edit-input"
                                    placeholder="Описание"
                                />
                                <input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                    className="edit-input"
                                    placeholder="Сумма"
                                />
                                <div className="edit-actions">
                                    <button
                                        onClick={() => handleSave(expense.id)}
                                        className="save-button"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="cancel-button"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="expense-info">
                                    <span className="expense-description">{expense.description}</span>
                                    <span className="expense-amount">{expense.amount.toFixed()} Р</span>
                                </div>
                                <div className="item-actions">
                                    <button
                                        onClick={() => handleEditClick(expense)}
                                        className="edit-button"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="delete-button"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExpenseForm() {
    const [expenses, setExpenses] = usePersistedState('expenses', []);
    const [dailyLimits, setDailyLimits] = usePersistedState('dailyLimits', {});
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('main');
    const [selectedDay, setSelectedDay] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);

    const handleEditExpense = (expense) => {
        setDescription(expense.description);
        setAmount(expense.amount.toString());
        setDate(new Date(expense.dateObj));
        setEditingExpense(expense);
    };

    const handleSaveExpense = (updatedExpense) => {
        setExpenses(expenses.map(exp =>
            exp.id === updatedExpense.id ? updatedExpense : exp
        ));
    };

    const addExpense = () => {
        if (!description || !amount) return;

        if (editingExpense) {
            const updatedExpenses = expenses.map(exp =>
                exp.id === editingExpense.id
                    ? {
                        ...exp,
                        description,
                        amount: parseFloat(amount),
                        date: date.toLocaleDateString('ru-RU'),
                        dateObj: new Date(date)
                    }
                    : exp
            );
            setExpenses(updatedExpenses);
            setEditingExpense(null);
        } else {
            const newExpense = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                date: date.toLocaleDateString('ru-RU'),
                dateObj: new Date(date)
            };
            setExpenses([...expenses, newExpense]);
        }
        setDescription("");
        setAmount("");
        setDate(new Date());
    };

    const handleDelete = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setView('day');
    };

    const handleBackToMain = () => {
        setView('main');
        setEditingExpense(null);
    };

    const handleSetDailyLimit = (limit) => {
        setDailyLimits({ ...dailyLimits, [selectedDay]: parseInt(limit) || 0 });
    };

    const handleDeleteDay = (day) => {
        if (window.confirm(`Удалить все расходы за ${day}?`)) {
            setExpenses(expenses.filter(expense => expense.date !== day));
            const newLimits = { ...dailyLimits };
            delete newLimits[day];
            setDailyLimits(newLimits);
        }
    };

    const handleEditDay = (day) => {
        const dayExpenses = expenses.filter(exp => exp.date === day);
        if (dayExpenses.length > 0) {
            const firstExpense = dayExpenses[0];
            setDescription(firstExpense.description);
            setAmount(firstExpense.amount.toString());
            setDate(new Date(firstExpense.dateObj));
            setEditingExpense(firstExpense);
        }
    };

    return (
        <div className="expense-tracer">
            {view === 'main' ? (
                <>
                    <h2>Трекер расходов</h2>
                    <div className="add-expense">
                        <input
                            type="text"
                            placeholder="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <CustomDatePicker date={date} onChange={setDate} />

                        <button onClick={addExpense}>
                            {editingExpense ? 'Сохранить' : '+'}
                        </button>
                        {editingExpense && (
                            <button onClick={() => {
                                setEditingExpense(null);
                                setDescription("");
                                setAmount("");
                                setDate(new Date());
                            }}>
                                Отмена
                            </button>
                        )}
                    </div>

                    <DailyExpenses
                        expenses={expenses}
                        dailyLimits={dailyLimits}
                        onDayClick={handleDayClick}
                        onDeleteDay={handleDeleteDay}
                        onEditDay={handleEditDay}
                    />
                </>
            ) : (
                <DayDetails
                    day={selectedDay}
                    expenses={expenses}
                    dailyLimit={dailyLimits[selectedDay]}
                    onBack={handleBackToMain}
                    onSetLimit={handleSetDailyLimit}
                    onDeleteExpense={handleDelete}
                    onEditExpense={handleEditExpense}
                    onSaveExpense={handleSaveExpense}
                />
            )}
        </div>
    );
}

export default ExpenseForm;