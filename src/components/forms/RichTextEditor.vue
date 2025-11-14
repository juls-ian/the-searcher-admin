<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'

const emit = defineEmits(['update'])
const props = defineProps(['content'])

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit],
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
</script>

<template>
  <div class="editor">
    <div v-if="editor" class="editor__toolbar">
      <div class="editor__button-group">
        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <span>Bold</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <span>Italic</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <span>Strike</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <span>Code</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          <span>Clear marks</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().clearNodes().run()"
        >
          <span>Clear nodes</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <span>Paragraph</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <span>H1</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          <span>H2</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          <span>H3</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          <span>H4</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          <span>H5</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          <span>H6</span>
        </button>

        <button
          type="button"
          class="editor__button"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <span>Bullet List</span>
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <span>Ordered List</span>
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <span>Code block</span>
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <span>Blockquote</span>
        </button>

        <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
          <span>Horizontal rule</span>
        </button>
        <button type="button" @click="editor.chain().focus().setHardBreak().run()">
          <span>Hard break</span>
        </button>
        <button type="button" @click="editor.chain().focus().undo().run()">
          <span>Undo</span>
        </button>
        <button type="button" @click="editor.chain().focus().redo().run()">
          <span>Redo</span>
        </button>
        <button
          @click="editor.chain().focus().setColor('#800000').run()"
          :class="{ 'is-active': editor.isActive('textStyle') }"
        >
          <span>Maroon</span>
        </button>
      </div>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
@use '@/assets/utils' as *;

.tiptap {
  width: 100%;
  min-width: 0; // allows flex item to shrink below content size
  min-height: 20rem;
  max-height: 50rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;

  background: $surface-fields !important;

  p,
  ul,
  ol {
    color: $text-dark-main;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
    color: $text-dark-main;
  }
}

.editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0; // Important: allows flex item to shrink below content size
  overflow: hidden;

  &__toolbar {
    display: flex;
    flex-direction: column;
    // overflow-x: auto;
    // overflow-y: hidden;
  }

  &__button-group {
    width: 100%;
    display: flex;
    align-items: center;
    gap: spacing(2);
    margin-bottom: spacing(4);
  }

  &__button {
    padding: 0.4rem 1rem;
    background: $surface-fields;
    color: $text-dark-main;
    border-radius: 0.7rem;
  }
}
</style>
