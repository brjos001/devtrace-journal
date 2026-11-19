
import type { CollectionSchema } from 'deepspace/schema'

export const journalSchema: CollectionSchema = {
  name: 'journal_entries',
  columns: [
    { name: 'title', storage: 'text', interpretation: 'plain' },
    { name: 'content', storage: 'text', interpretation: 'plain' },
    { name: 'entry_date', storage: 'text', interpretation: 'plain' },
    { name: 'tags', storage: 'text', interpretation: 'plain' },
    { name: 'mood', storage: 'text', interpretation: 'plain' },
    { name: 'created_at', storage: 'text', interpretation: 'plain' },
    { name: 'updated_at', storage: 'text', interpretation: 'plain' },
  ],
  permissions: {
    viewer: {
      read: 'own',
      create: false,
      update: false,
      delete: false,
    },
    member: {
      read: 'own',
      create: true,
      update: 'own',
      delete: 'own',
    },
    admin: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
}
