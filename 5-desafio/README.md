# Desafio final del curso de DevOps

Para darle un cierre a las clases de Craftech, los invitamos a intentar completar estas pequeñas tareas que resumen lo visto en el curso!

### Resumen

Se cuenta con el diseño de una aplicación para prestamos por internet. El backend fue construido con [Django](https://www.djangoproject.com/) utilizando [Python v3.7](https://www.python.org/), la cual se encuentra [acá](backend/) y el frontend fue construido con [React.js](https://es.reactjs.org/), la cual se encuentra [acá](frontend/).

Se necesita:

1. Armar un diagrama de los componentes que se involucran (Base de datos, deployments, etc) como si estuviera deployado en AWS.

1. Dockerizar las aplicaciones Frontend y Backend

1. Armar un docker-compose que nos permita levantar la aplicación entera y sus dependencias

1. Armar los manifiestos de Kubernetes para deployar las aplicaciones y sus dependencias en un cluster (Utilizar minikube como ref)

1. Diseñar un pipeline de CI/CD de la aplicación frontend y backend que nos permita deployar en 2 entornos (dev y prod)