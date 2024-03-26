
# 	🧠 Brain Blitz - Backend 	🧠
This folder contains all the code for the REST API


## 🏗️ Project structure 🏗️
| File/Folder | Description |
| ----------- | ----------- |
|`src/main.ts`| The main entry point for the application. Running this file will start the server. |
| `src/app.module.ts` | The main module, combines all further modules. |
| `src/Configs` | Contains config files for various parts of the application. |
| `src/DB` | This where the SQL migrations will be generated, and db related scripts are stored. |
| `src/Decorators` | Reusable custom decorators will be stored in this folder. |
| `src/Enums` | Storage for enums. |
| `src/Events` | This is where you can find the events, which will be triggered in various parts of the application. |
| `src/Guards` | Custom guards, used by Controllers |
| `src/Interceptors` | Interceptors will handle incoming requests and outgoing responses. For example unify the response object, or remove valuable data. |
| `src/Middlewares` | Middlewares are pretty similar to interceptors. Currently only contains a middleware to log incoming requests and their time to resolve. |
| `src/Models` | This is where the Models and their relations are setup, and exported from. |
| `src/Modules` | This folder contains the main components for the business logic of the application. For example `authentication` or `CRUD operations`. |
| `src/Public` | The Public folder holds all static files for handlebars views. |
| `src/Strategies` | This is where passport strategies can be stored. Currently only local strategy is in use. |
| `src/Utils` |  Folder to store constants / types / Helperfunctions which are used in different places in the application. | 
| `src/Views` | Stores layouts, partials and views for handlebars engine.

## 📚 Swagger documentation 📚
All endpoints got a Swagger documentation.

#### SwaggerDoc Endpoint

Run the app and go to the following endpoint.

```http
  GET /docs
```


