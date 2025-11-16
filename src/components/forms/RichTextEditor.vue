<script setup>
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
</script>

<template>
  <div class="editor">
    <div v-if="editor" class="editor__toolbar">
      <div class="editor__button-group">
        <!-- Row 1 -->
        <div class="editor__button-row">
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
        </div>

        <!-- Row 2 -->
        <div class="editor__button-row">
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
        </div>

        <!-- Row 3 -->
        <div class="editor__button-row">
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
            class="editor__button"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
          >
            <span>Ordered List</span>
          </button>

          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
          >
            <span>Code block</span>
          </button>

          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }"
          >
            <span>Blockquote</span>
          </button>

          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().setHorizontalRule().run()"
          >
            <span>Horizontal rule</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().setHardBreak().run()"
          >
            <span>Hard break</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <span>Undo</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <span>Redo</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().setColor('#800000').run()"
            :class="{ 'is-active': editor.isActive('textStyle', { color: '#800000' }) }"
          >
            <span>Maroon</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().setColor('#2f2e41').run()"
            :class="{ 'is-active': editor.isActive('textStyle', { color: '#2f2e41' }) }"
          >
            <span>Charcoal</span>
          </button>
          <button
            type="button"
            class="editor__button"
            @click="editor.chain().focus().setColor('#4b5563').run()"
            :class="{ 'is-active': editor.isActive('textStyle', { color: '#4b5563' }) }"
          >
            <span>Gray</span>
          </button>
          <!-- Row 4 -->
          <div class="editor__button-row">
            <button
              type="button"
              class="editor__button"
              @click="editor.chain().focus().unsetColor().run()"
            >
              <span>Unset Color</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <DragHandle v-if="editor" :editor="editor">
      <div class="custom-drag-handle" />
    </DragHandle>
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
  @use '@/assets/utils' as *;

  button.is-active {
    background: $primary-base;
    font-weight: bold;
    color: $text-light-main;
  }

  .tiptap {
    width: 100%;
    min-width: 0; // allows flex item to shrink below content size
    min-height: 20rem;
    max-height: 50rem;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    box-sizing: border-box;

    background: $surface-fields !important;

    p,
    ul,
    ol {
      color: $text-dark-main;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 2.5rem;
      text-wrap: pretty;
      color: $text-dark-main;
    }

    pre {
      background: $surface-dark;
      border-radius: 0.5rem;
      color: $surface-light;
      font-family: 'JetBrainsMono', monospace;
      margin: spacing(1.5) 0;
      padding: spacing(1) spacing(2);

      code {
        background: none;
        color: inherit;
        font-size: $font-size-xs;
        padding: 0;
      }
    }

    blockquote {
      border-left: 3px solid $primary-base;
      margin: 1.5rem 0;
      padding-left: 1rem;
    }

    hr {
      border: none;
      border-top: 1px solid $primary-base;
      margin: 2rem 0;
    }
  }

  .editor {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0; // Important: allows flex item to shrink below content size
    overflow: hidden;

    &__toolbar {
      overflow-x: auto;
      overflow-y: hidden;
    }

    &__button-group {
      width: 100%;
      display: flex;
      align-items: center;
      gap: spacing(2);
      margin-bottom: spacing(4);
      flex-wrap: wrap;
    }

    &__button-row {
      display: flex;
      align-items: center;
      gap: spacing(1);
      flex-wrap: wrap;
    }

    &__button {
      padding: 0.4rem 1rem;
      background: $surface-fields;
      color: $text-dark-main;
      border-radius: 0.7rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  /* Drag Handle */
  .ProseMirror {
    padding: spacing(1) spacing(1) spacing(1) 0;

    * {
      margin-top: spacing(2);
    }

    > * {
      margin-left: spacing(4);
    }

    .ProseMirror-widget * {
      margin-top: auto;
    }

    ul,
    ol {
      padding: 0 spacing(2);
    }
  }

  .ProseMirror-noderangeselection {
    *::selection {
      background: transparent;
    }

    * {
      caret-color: transparent;
    }
  }

  .ProseMirror-selectednode,
  .ProseMirror-selectednoderange {
    position: relative;

    &::before {
      position: absolute;
      pointer-events: none;
      z-index: -1;
      content: '';
      top: -0.25rem;
      left: -0.25rem;
      right: -0.25rem;
      bottom: -0.25rem;
      background-color: #70cff850;
      border-radius: 0.2rem;
    }
  }

  .custom-drag-handle {
    &::after {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1.25rem;
      content: '⠿';
      font-weight: 700;
      cursor: grab;
      background: #0d0d0d10;
      color: #0d0d0d50;
      border-radius: 0.25rem;
    }
  }
</style>
