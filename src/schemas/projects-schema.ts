
import type { CollectionSchema } from 'deepspace/schema'

export const projectsSchema: CollectionSchema = {
  name: 'projects',
  columns: [
    { name: 'name', storage: 'text', interpretation: 'plain' },
    { name: 'description', storage: 'text', interpretation: 'plain' },
    { name: 'status', storage: 'text', interpretation: 'plain' },
    { name: 'start_date', storage: 'text', interpretation: 'plain' },
    { name: 'target_date', storage: 'text', interpretation: 'plain' },
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
