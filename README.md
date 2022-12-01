## Subscription
El microservicio stasher-subscription-service nace con el objetivo de ofrecer un sistema de gestión de subscripciones de usuarios a categorias dentro del dominio de Stasher un sistema de gastos. 

En este sistema los usuarios logueados como administradores pueden suscribirse a las categorias ingresadas por usuarios de su familia para recibir un mail cuando se ingresa un nuevo gasto o ingreso correspondiente a dicha categoria.

---

## Como requisitos previos para ejecutar este microservicio se necesita tener instaladas las dependencias 

 - Entorno: <code> Node JS </code>
- Comunicación: <code> Rabbit mq </code>
 - Database: <code> MySQL</code>
 - Sistema de gestión de paquetes: <code> npm</code>
---

## Correr el proyecto
- Correr MySQL
- Correr RabbitMq
- Instalar las dependencias
<code> npm install </code>

- Setear las variables de entorno
- Correr el proyecto <code>  node -r newrelic index.js </code>

--- 

Sebastián Colina (201066) 

Chia Hung Hsieh (196306)

Joselen Cecilia (233553)