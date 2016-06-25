import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked = () => {
    const { task: { _id, checked } } = this.props
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', _id, !checked)
  }

  deleteThisTask = () => (
    Meteor.call('tasks.remove', this.props.task._id)
  )

  togglePrivate = () => (
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private)
  )

  render() {
    const { task: { checked, username, text, private: isPrivate }, showPrivateButton } = this.props
    const taskClassName = checked ? 'checked' : ''

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={checked}
          onClick={this.toggleChecked}
        />

        {showPrivateButton ? (
          <button
            className="toggle-private"
            onClick={this.togglePrivate}
          >
            {isPrivate ? 'Private' : 'Public'}
          </button>
        ) : null}

        <span className="text">
          <strong>{username}</strong>: {text}
        </span>
      </li>
    )
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
}
