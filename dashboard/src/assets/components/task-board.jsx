"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TaskColumn } from "@/components/task-column"
import { TaskForm } from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function TaskBoard() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data
    const mockUsers = [
      { id: "1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    ]

    const mockTasks = [
      {
        id: "1",
        title: "Research competitors",
        description: "Analyze top 5 competitors",
        status: "todo",
        assigneeId: "1",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Design homepage",
        description: "Create wireframes",
        status: "in-progress",
        assigneeId: "2",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Setup database",
        description: "Configure PostgreSQL",
        status: "done",
        assigneeId: "1",
        createdAt: new Date().toISOString(),
      },
    ]

    setUsers(mockUsers)
    setTasks(mockTasks)
  }, [])

  const handleAddTask = (task) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])
    setShowTaskForm(false)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
    setShowTaskForm(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleMoveTask = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button
          onClick={() => {
            setEditingTask(null)
            setShowTaskForm(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      {showTaskForm && (
        <div className="mb-6">
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={() => {
              setShowTaskForm(false)
              setEditingTask(null)
            }}
            users={users}
            initialData={editingTask}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === "todo")}
          status="todo"
          onMoveTask={handleMoveTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          users={users}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "in-progress")}
          status="in-progress"
          onMoveTask={handleMoveTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          users={users}
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.status === "done")}
          status="done"
          onMoveTask={handleMoveTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          users={users}
        />
      </div>
    </DndProvider>
  )
}
