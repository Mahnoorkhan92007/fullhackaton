"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * @typedef {Object} TaskFormProps
 * @property {Function} onSubmit - Function to submit form
 * @property {Function} onCancel - Function to cancel form
 * @property {Array} users - List of users
 * @property {Object|null} initialData - Initial task data
 */

export function TaskForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [status, setStatus] = useState(initialData?.status || "todo")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    const taskData = {
      ...(initialData ? { id: initialData.id, createdAt: initialData.createdAt } : {}),
      title,
      description,
      status,
    }

    onSubmit(taskData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Task" : "Add New Task"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update" : "Create"} Task</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
