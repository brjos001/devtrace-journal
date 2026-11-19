
/**
 * Collection Schemas
 *
 * Single source of truth for application collections and permissions.
 */


import type { CollectionSchema } from 'deepspace/schema'
import { usersSchema } from './schemas/users-schema'
import { settingsSchema } from './schemas/admin-schema'
import { journalSchema } from './schemas/journal-schema'
import { projectsSchema } from './schemas/projects-schema'

export const schemas: CollectionSchema[] = [
  usersSchema,
  settingsSchema,
  journalSchema,
  projectsSchema,
]
