# Unused codes in articleSchema 

## 1.0: initial 
```javascript 
import * as yup from 'yup'

const articleSchema = yup.object({
  title: yup.string().required('Title is required'),
  'add-to-ticker': yup.boolean().optional(),
  category: yup.number().required('Category is required'),
  writer: yup.number().required('Writer is required'),
  date: yup.date().optional(),
  body: yup.string().required('Body is required'),
  cover: yup
    .mixed()
    .required('Cover photo is required')
    .test('fileSize', 'Cover photo must not exceed 5MB', (value) => {
      return !value || (value && value.size <= 5 * 1024 * 1024)
    })
    .test('fileType', 'Cover photo must be a valid image file', (value) => {
      return !value || (value && value.type.startsWith('image/'))
    }),
  'cover-artist': yup.number().required('Cover artist is required'),
  caption: yup.string().required('Caption is required'),
  thumbnail: yup.mixed().when('same-artist', {
    is: false,
    then: (schema) => schema.required('Thumbnail is required'),
    otherwise: (schema) => schema.nullable() // else null
  }),
  'thumbnail-artist': yup.number().when('same-artist', {
    is: false,
    then: (schema) => schema.required('Thumbnail artist is required'),
    otherwise: (schema) => schema.nullable()
  })
})

export default articleSchema

```