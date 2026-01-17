import { defineField, defineType } from 'sanity'
import { TfiNotepad } from 'react-icons/tfi'

export const note = defineType({
  name: 'note',
  title: 'Notes & Ideas',
  type: 'document',
  icon: TfiNotepad,
  fields: [
    defineField({
      name: 'title',
      title: 'Subject / Idea',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'todo',
      options: {
        list: [
          { title: '🔴 To Do', value: 'todo' },
          { title: '🟡 In Progress', value: 'progress' },
          { title: '🟢 Done', value: 'done' },
        ],
        layout: 'radio'
      },
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High (Urgent)', value: 'high' },
        ],
      },
    }),
    defineField({
      name: 'details',
      title: 'Details / Notes',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      priority: 'priority',
    },
    prepare({ title, status, priority }) {
      const emojis: Record<string, string> = { todo: '🔴', progress: '🟡', done: '🟢' }
      const emoji = emojis[status] || '⚪'
      
      return {
        title: title,
        subtitle: `Priority: ${priority}`,
        media: () => emoji, // Toont de bolletjes als icoon in de lijst
      }
    },
  },
})
