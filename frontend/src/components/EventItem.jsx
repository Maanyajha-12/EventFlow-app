import React from 'react';
import { updateEvent, deleteEvent } from '../services/api';

const EventItem = ({ event, refresh }) => {

    const totalSpent = event.expenses?.reduce((sum, item) => sum + item.cost, 0) || 0;
    const remaining = event.initialBudget - totalSpent;

    const handleAddExpense = async () => {
        const expName = prompt("Expense Name:");
        const expCost = prompt("Cost:");
        if (!expName || !expCost) return;

        const newExpense = { name: expName, cost: Number(expCost) };
        const updatedExpenses = [...(event.expenses || []), newExpense];

        await updateEvent(event.id, {
            expenses: updatedExpenses,
            tasks: event.tasks || []
        });
        refresh();
    };

    const handleAddTask = async () => {
        const taskName = prompt("New Task:");
        if (!taskName) return;

        const updatedTasks = [...(event.tasks || []), { text: taskName, done: false }];

        await updateEvent(event.id, {
            expenses: event.expenses || [],
            tasks: updatedTasks
        });
        refresh();
    };

    return (
        <div className="event-card">
            <div className="card-header">
                <h3>{event.name}</h3>
                <button className="del-btn" onClick={() => deleteEvent(event.id).then(refresh)}>×</button>
            </div>

            <div className="budget-box">
                <p>Budget: ${event.initialBudget}</p>
                <p className={remaining < 0 ? 'danger' : 'success'}>Left: ${remaining}</p>
            </div>

            <div className="btn-group">
                <button onClick={handleAddExpense}>+ Expense</button>
                <button onClick={handleAddTask}>+ Task</button>
            </div>

            <div className="lists-container">
                <div className="section">
                    <h4>Expenses</h4>
                    {event.expenses?.map((ex, i) => (
                        <div key={i} className="list-item"><span>{ex.name}</span> <span>${ex.cost}</span></div>
                    ))}
                </div>
                <div className="section">
                    <h4>Tasks</h4>
                    {event.tasks?.map((t, i) => (
                        <div key={i} className="list-item">{t.text}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventItem;
