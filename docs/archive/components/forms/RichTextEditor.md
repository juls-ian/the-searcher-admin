# Unused codes in the RichTextEditor component

## initial script 
### without using modelValue (using prop content)
```javascript
import DragHandle from '@tiptap/extension-drag-handle-vue-3'
import NodeRange from '@tiptap/extension-node-range'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import { watch } from 'vue'

  const emit = defineEmits(['update'])
  const props = defineProps(['content'])

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    StarterKit,
    TextStyle,
    Color.configure({
      types: ['textStyle'],
    }),
    NodeRange.configure({
      // allow to select only on depth 0
      // depth: 0,
      key: null,
    }),
  ],
  onUpdate: () => {
    // every update is emitted
    // travels from here to the parent
    emit('update', editor.value.getHTML)
  },
})

  const loadContent = () => {
    if (props.content) {
      editor.value.commands.setContent(props.content)
    }
  }

  // Watcher for the prop content
  watch(
    () => props.content,
    () => {
      loadContent()
    }
  )
```