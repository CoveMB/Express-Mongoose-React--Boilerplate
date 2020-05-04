
const Task = require('models/Task/Task');
const { NotFoundError, errorEmitter, errorEvent } = require('errors');

exports.getOne = async ({ params }, res) => {

  try {

    const { id } = params;

    const task = await Task.findOne({
      _id: id, isDeleted: false
    });

    if (!task) {

      throw new NotFoundError('Task');

    }

    res.send(task);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.getAll = async ({ userFromRequest }, res) => {

  try {

    const activeTasks = await Task.find({
      owner: userFromRequest.id, isDeleted: false
    });

    const deletedTasks = await Task.find({
      owner: userFromRequest.id, isDeleted: true
    });

    res.send({
      activeTasks, deletedTasks
    });


  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.createOne = async ({ body, userFromRequest }, res) => {

  try {

    const newTask = await new Task({
      ...body, owner: userFromRequest.id
    }).save();

    res.status(201).send(newTask);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.updateOne = async ({ params, body, userFromRequest }, res) => {

  try {

    const { id } = params;

    // Find the appropriate task
    const task = await Task.findOne({
      id, owner: userFromRequest.id
    });

    if (!task) {

      // If no task is found return a 404
      throw new NotFoundError('Task');

    }

    // Iterate through the task document to update it's fields
    Object.keys(body).forEach((updateField) => {

      task[updateField] = body[updateField];

      return false;

    });

    // Save the task
    await task.save();

    // And return it
    res.send(task);

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};

exports.deleteOne = async ({ params, userFromRequest }, res) => {

  try {

    const { id } = params;

    // Find the appropriate task
    const task = await Task.findOne({
      _id: id, owner: userFromRequest.id
    });

    if (!task) {

      throw new NotFoundError('Task');

    }

    // Set it as deleted
    task.isDeleted = true;
    task.save();

    res.send();

  } catch (error) {

    errorEmitter.emit(errorEvent, error, res);

  }

};
