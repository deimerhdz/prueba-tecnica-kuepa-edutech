# Foobar

Foobar is a Python library for dealing with word pluralization.

## Requisitos de instalacion

Docker para [windows](https://docs.docker.com/desktop/install/windows-install/) o [linux](https://docs.docker.com/desktop/install/linux-install/) dependiendo el sistema operativo.

## Descarga
Abrir una terminal y ejecutar 
```
git clone https://github.com/deimerhdz/prueba-tecnica-kuepa-edutech.git
```
## Configuracion backend

Primero debe acceder a la carpeta ``backend`` dentro del repositorio clonado

crear un archivo ``.env`` y pegar las siguiente variables disponibles para un ambiente de desarrollo
```
PORT=3000
MONGODB_CONNECTION=mongodb://mongo/kuepa-edutech-db
JWT_SECRET_KEY=jnkdsvids
```

``Nota`` para los siguientes comandos debe asegurarse que que tiene una instacia de docker ejecutandose en su sistema operativo, puede ser ejecutando docker desktop en windows o iniciando un servico en el caso de linux.

``Levantando el contenedor de docker``
Acceder en la ruta raiz del proyecto ``backend`` y ejecutar los comandos en el siguiente orden
```
  docker-compose build
  docker-compose up -d
```

## Author  

- Deimer Hernandez

## License

[MIT](https://choosealicense.com/licenses/mit/)