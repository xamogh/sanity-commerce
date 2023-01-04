import {defineField, defineType} from 'sanity'

export const tag = defineType({
  title: 'Tag',
  name: 'tag',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Weight',
      name: 'weight',
      type: 'number',
    }),
  ],
})
