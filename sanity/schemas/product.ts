import {defineType, defineField} from 'sanity'

export const product = defineType({
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Caption',
      name: 'caption',
      type: 'string',
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Product Type',
      name: 'product_type',
      type: 'reference',
      to: [{type: 'product_type'}],
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Tag',
      name: 'tag',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Is Immediately Purchasable',
      name: 'is_immediately_purchasable',
      type: 'boolean',
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'image',
    }),
    defineField({
      title: 'Main Image',
      name: 'main_image',
      type: 'image',
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Banner Image',
      name: 'banner_image',
      type: 'image',
      validation(rule) {
        return rule.required()
      },
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
      hidden: ({parent}) => !parent.is_immediately_purchasable,
    }),
  ],
})
