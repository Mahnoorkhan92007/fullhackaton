"use client"

import { useDrop } from "react-dnd"
import { TaskCard } from "@/components/task-card"

/**
 * @typedef {Object} TaskColumnProps
 * @property {string} title - Column title
 * @property {"todo" | "in-progress" | "done"} status - Column status
 * @property {Array} tasks - List of tasks
 * @property {Array} users - List of users
 * @property {Function} onMoveTask - Function to move task
 * @property {Function} onEditTask - Function to edit task
 * @property {Function} onDeleteTask - Function to delete task
 */

export function TaskColumn({ title, status, tasks, users, onMoveTask, onEditTask, onDeleteTask }) {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      onMoveTask(item.id, status)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} className={`bg-muted p-4 rounded-lg ${isOver ? "ring-2 ring-primary" : ""}`}>
      <h3 className="font-medium text-lg mb-4">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            assignee={users.find((user) => user.id === task.assigneeId)}
          />
        ))}
        {tasks.length === 0 && <div className="text-center py-8 text-muted-foreground">No tasks</div>}
      </div>
    </div>
  )
}
