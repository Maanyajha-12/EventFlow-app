import React from 'react';
import { updateEvent, deleteEvent } from '../service/api';

const EventItem = ({ event, refresh }) => {
    const totalSpent = (event.expenses || []).reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const remaining = Number(event.initialBudget || 0) - totalSpent;

    /*const totalSpent = (event.expenses || []).reduce(
        (sum, item) => sum + Number(item.cost || 0), 0);
    const remaining = Number(event.initialBudget || 0) - totalSpent;*/

    const handleAddExpense = async () => {

        if (remaining < 0) {
            alert("Budget already exceeded! Cannot add more expenses.");
            return;
        }
        const expName = prompt("Enter Expense Name:");
        const expCost = prompt("Enter Cost:");

        // Safety check: IT ensure inputs exist and cost is a number and no empty data is sent to database
        if (!expName || !expCost) return;

        if (Number(expCost) > remaining) {
            const confirmed = window.confirm(
                `This expense (INR ${expCost}) exceeds your remaining budget (INR ${remaining}). Add anyway?`
            );
            if (!confirmed) return;
        }

        // Created an updated array by spreading existing expenses and adding the new one
        const updatedExpenses = [...(event.expenses || []), { name: expName, cost: Number(expCost) }];

        try {
            // This sends the full update to our Render backend
            await updateEvent(event.id, {
                expenses: updatedExpenses
            });
            refresh(); // This re-fetches data from the DB so the UI updates
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    /*const handleAddExpense = async () => {
        const expName = prompt("Expense Name:");
        const expCost = Number(prompt("Cost:"));
        if (!expName || !expCost) return;

        const newExpense = { name: expName, cost: expCost };
        const updatedExpenses = [...(event.expenses || []), newExpense];

        await updateEvent(event.id, {
            expenses: updatedExpenses
        });
        refresh();
    };*//*old handle function*/

    return (
        <div className="event-card">
            <div className="card-header">
                <h3>{event.name}</h3>
                <button className="del-btn" onClick={() => deleteEvent(event.id).then(refresh)}>×</button>
            </div>

            <div className="budget-box">
                <p>Budget: INR {event.initialBudget}</p>
                <p className={remaining < 0 ? 'danger' : 'success'}>Left: INR {remaining}</p>
            </div>
            {remaining < 0 && (
                <div className="budget-warning">
                    Over budget by INR {Math.abs(remaining)}!
                </div>
            )}

            <div className="btn-group">
                <button onClick={handleAddExpense}>+ Expense</button>
            </div>

            <div className="lists-container">
                <div className="section">
                    <h4>Expenses</h4>
                    {(event.expenses || []).map((ex, i) => (
                        <div key={i} className="list-item"><span>{ex.name}</span> <span>INR {ex.cost}</span></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventItem;
