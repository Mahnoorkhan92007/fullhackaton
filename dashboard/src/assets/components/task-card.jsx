"use client"

import { useDrag } from "react-dnd"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/**
 * @typedef {Object} TaskCardProps
 * @property {Object} task - Task object
 * @property {Object} assignee - User assigned to task
 * @property {Function} onEdit - Function to edit task
 * @property {Function} onDelete - Function to delete task
 */

export function TaskCard({ task, assignee, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // Format date to a readable string
  const formattedDate = new Date(task.createdAt).toLocaleDateString()

  return (
    <Card ref={drag} className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}>
      <CardContent className="p-4">
        <h4 className="font-medium mb-1">{task.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
        <div className="text-xs text-muted-foreground">Created: {formattedDate}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {assignee && (
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{assignee.name}</span>
          </div>
        )}
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
