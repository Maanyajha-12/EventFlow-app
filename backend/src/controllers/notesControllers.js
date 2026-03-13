const db = require('../firebase.js')


//get all events
async function getAllEvents(req, res) {
  try {
    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//create event funcction
async function createEvent(req, res) {
  try {
    const { name, budget } = req.body;
    const newEvent = { name, initialBudget: Number(budget), expenses: [], tasks: [] };
    const docRef = await db.collection('events').add(newEvent);
    res.json({ id: docRef.id, ...newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//update event and task
async function updateEvent(req, res) {
  try {
    const { expenses, tasks } = req.body;
    const eventRef = db.collection('events').doc(req.params.id);
    await eventRef.update({ expenses, tasks });
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//delete tasks
async function deleteEvent(req, res) {
  try {
    await db.collection('events').doc(req.params.id).delete();
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
