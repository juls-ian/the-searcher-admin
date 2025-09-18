# Dependencies 

## Documentation of the dependencies used in the project

### Note
 Best practice:
• If  working solo or in a team that also uses yarn/pnpm, you can use npm add.
• If  writing docs, tutorials, or want maximum clarity → stick with npm install (or the shorthand)

For personal speed → npm i -D sass-embedded
For clarity in projects/docs → npm install -D sass-embedded

### List of dependencies:

1. **Sass-Embedded** 
```bash
npm add -D sass-embedded
```
---
2. **Auto Prefixer**
```bash
npm add -D autoprefixer postcss
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
3. **HugeIcons**
```bash
npm add @hugeicons/vue
npm install @hugeicons/core-free-icons

```
---
4. **VeeValidate**
```bash
npm add vee-validate --save
```
---
5. **Yup**
```bash
npm add yup 
```
---
6. **Yup Password**
```bash
npm add yup-password
```