import {defineField, defineType, SlugValidationContext} from 'sanity'

export async function isUniqueAcrossAllDocuments(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2022-12-07'})
  const id = document?._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
  const result = await client.fetch(query, params)
  return result
}

export const productType = defineType({
  title: 'Product Type',
  name: 'product_type',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueAcrossAllDocuments,
      },
    }),
  ],
})
