# Dependencies 

## Documentation of the dependencies used in the project

### Note
 Best practice:
• If  working solo or in a team that also uses yarn/pnpm, you can use npm i.
• If  writing docs, tutorials, or want maximum clarity → stick with npm install (or the shorthand)

For personal speed → npm i -D sass-embedded
For clarity in projects/docs → npm install -D sass-embedded

### V1 Dependencies:

#### Vue Router 
```bash 
npm i vue-router@4
```
#### Pinia 
```bash 
npm i pinia
```
---
#### **Sass-Embedded** 
```bash
npm i -D sass-embedded
```
---
#### **Auto Prefixer**
```bash
npm i -D autoprefixer postcss
```

then create a postcss.config.js file: 
``` js
export default {
  plugins: {
    autoprefixer: {},
  },
}
```
then run these: 
```bash
npm run dev # during development
npm run build # deployment
```
---
#### **HugeIcons**
```bash
npm i @hugeicons/vue
npm i @hugeicons/core-free-icons

```
---
#### **Axios**
```bash
npm i axios
```
---
#### **Web Font Loader**
```bash
npm i webfontloader
```
---
#### **VeeValidate**
```bash
npm i vee-validate --save
```
---
#### **Yup**
```bash
npm i yup 
```
---
#### **Yup Password**
```bash
npm i yup-password
```
--- 
#### DOMPurify
```bash 
npm i dompurify
```
---
#### VueUse
```bash 
npm i @vueuse/core
```
---
#### Tiptap
```bash 
npm i @tiptap/vue-3 @tiptap/pm @tiptap/starter-kit
npm i @tiptap/extension-text-style
npm i @tiptap/extension-drag-handle-vue-3 @tiptap/extension-drag-handle @tiptap/extension-node-range @tiptap/extension-collaboration @tiptap/y-tiptap yjs y-protocols
```
---
#### Day.js
```bash 
npm i dayjs
```
---
#### Vue Datepicker 
```bash 
npm i @vuepic/vue-datepicker
```
---
### V2 Dependencies:
---
#### TanStack Query Vue*
```bash 
npm i @tanstack/vue-query
```
---
#### Vue 3 Toastify 
```bash 
npm i vue3-toastify
```