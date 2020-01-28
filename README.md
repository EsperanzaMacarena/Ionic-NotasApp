# Ionic-NotasApp
Aplicación de notas programado en Ionic para el curso 2ºDAM. 

En esta aplicación se puede crear, listar y compartir notas, crear, editar, eliminar y listar categorías.

## Arranque de la aplicación.
Esta app utiliza una base de datos en firebase. Para utilizarlo, deberás crear un proyecto en la consola de Firebase. 

Cuando lo hayas creado, debes crear un fichero enviroment.ts en el que deberás poner como una variable constante las variables de firebase. Ejemplo:
````
export const environment = {
  production: false,
  firebase: {
    apiKey: "GigoighaoiruaoiTUOIGJDOdlgoadgjoia",
    authDomain: "your-firebase-project.firebaseapp.com",
    databaseURL: "https://your-firebase-project.firebaseio.com",
    projectId: "your-firebase-project",
    storageBucket: "your-firebase-project.appspot.com",
    messagingSenderId: "433221125185",
    appId: "1:456464864685:web:6a8cc89c4b6bde1b4442c0"
  }
};
````

Después ejecute el siguiente comando en la raíz del proyecto

````
npm i
````
Posteriormente, ejecute el siguiente para arrancar el proyecto en el localhost:
````
ionic serve
````
