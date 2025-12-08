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




## Auth: Login

1. configure in the laravel api:
   - create **.env.development** and **.env.production** in the laravel api 
   - configure **.env** of the laravel api
   - since we're using token auth we need to CSRF-exempt the all API routes in the **app.php** 
   - configure the **cors.php**'s allowed_origins

2. create src/service/api.js with interceptors and connect it to the api

3. develop the **auth store** with actions: login & logout & getters: fetchUser

4. add route guards and handle login 
   
5. create the login page 
   

# Components

## Core Components 

The app will consist of these components:

1. Navbar 
2. Toolbar 
3. Main Layout 
4. Skeleton Loaders

These three will be component foundation and shall be developed first, Navbar -> Toolbar -> Main Layout

## Form Components 

The form which is an essential part of the admin side shall have these components:

1. Dropdown 
2. Checkbox 
3. FileUploader 
4. MultiFileUploader

## Widgets 

These shall be the widgets:

1. Recent Articles 

### Skeleton Components

These shall be the placeholders whenever data fetching is involved in the ui

1. Skeleton Widget

  







