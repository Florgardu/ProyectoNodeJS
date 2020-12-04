CRUD PRODUCTOS:

-GET todos los productoS (VER TODOS LOS PRODUCTOS):
 /products 
 
 --------
 -POST - Agregar un producto nuevo (no hace falta poner id, lo asigna solo Mongo ObjectID):
 
 Enviar con este esquema en la ruta'/products:

 {
"descripcion": "WEED GRIS",
"precio" : 300 , 
"marca" :"PEUGEOT"
}

------

-PUT Actualizar un producto: 
 Enviar con este esquema en la ruta'/products/id:

 {
        "descripcion": "BISAGRA CAPOT CARAT DER",
        "precio": 2005,
        "marca": "Fiat"
}

-------
-DELETE Borrar un producto: 

 Enviar por la ruta el id que del producto que se quiere eliminar'/products/id:



------

LOGIN:

Registrarse con este esquema en la ruta '/users/signin':
{
    "username": "xxx",
    "email": "xxx@gmail.com",
    "password": "xxx"
}

Identificarse con este esquema en la ruta '/users/login':
{
    "email": "xxx@gmail.com",
    "password": "xxx"
}

Una vez logeado, el body del response les va a dar un json con el siguiente esquema
{
    "autorizacion": true,
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    "mensaje": "Sesión iniciada"
}

Para poder acceder a rutas protegidas como '/inventors' hay que ingresar el token.

En el postman, en los headers del request agregar:
- Authorization como key
- Bearer + <token> como valor

Con eso el token ya esta ingresado y se podran ver/editar/borrar los inventores

El archivo TP2-Desafio-2.postman_collection.json tiene los ejemplos de request de todas las operaciones disponibles.
- Para eso deberá ir a postman e hacer import de esta collection.
