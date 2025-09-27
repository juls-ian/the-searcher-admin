# Initial Setup 
```bash 
npm create vue@latest
```
Then cleanup the predefined components and `App.vue`

## Global Configuration 

Setup these app-wide configurations in this project 

### Dependencies 

Install the V1 dependencies. 
Check the [Dependencies Guide](dependencies.md) for the instructions 

### Core Vue App Setup 

1. In the `main.js` -> The entry file to:
- Create the Vue app instance
- Mount it to #app
- Import global styles
- Register plugins

2. In the `vite.config.js` add an alias in the `defineConfig` as needed 

3. Setup the project structure

Separate two folders for the resources:
- `src/assets/` 
  - `images` -> images used in components (logos, banners, illustrations)
  - scss files -> follow 7-1 architecture 
  - `icons` -> custom SVG icons. 
  - `fonts`  
  - `logos`
  - assets that might be optimized/compressed
  - any media that should go through the build process and url change with builds

- `src/public/`
  - `images` -> large photos or media libraries
  - `videos` -> big background videos, assets users download
  - `icons` -> favicons, manifest.json, apple-touch-icon
  - `docs` -> pdf, static resources
  - large or static files not processed by the bundler 
  - fixed urls    

4. Setup the base and global styles 

5. Add the global resets 

5. Begin developing the layouts needed

