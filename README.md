# grupo-Dupla7-backend

## Diagrama entidad-relación:

##### :bust_in_silhouette: Usuario:

| **id**  | username | Email | Password|
| :----: | :------: | :------: | :------:|
| int   (primary key)    |   str      |       str   | str |


##### :man_technologist: Jugador:
| **id** | _Id_Usuario_ | _Id_Partida_ | Tipo | Posición (x,y) | 
| :-----------: | :---: | :----: | :------------: | :------------: |
| int   | int | int |  str      |      str   |

##### :canoe: Barco:
| **id**  | _Id_Jugador_ |Tipo | _Posición (x,y)_ | 
| :-------: | :----: | :-------: | :---------: | 
| int   | int |   int      |      str  |

##### :jigsaw: Partida:
| **id** | Código | Creador | Turno | Ganador |
| :-----------: | :------------: | :------------: | :-----: | :-----: |
| int |   int      |     str   | str | str |


##### :flower_playing_cards: Casilla:
| **id** | Tipo | Acción | _Id_Tablero_ | Coordenadas (x,y)|
| :-----------: | :------------: | :----: | :------------: | :------:|
| int   |   str      |      str  | str |


##### :wood: Recurso:
| **id** | Tipo | _Id_jugador_ |
| :-----------: | :------------: | :----: |
| int |   str      | int |

##### :mahjong: Tablero:
| **id** | _Id_partida_ |
| :-----------: | :------------: | 
| int  |   int      |


##### :game_die: Dado:
| **id** | caras | resultado | _Id_tablero_ |
| :-----------: | :------------: | :---: | :----: |
| int  |   int      | int | int |


## Cómo simular una partida:

### Conexión a base de datos  :computer:  :


```bash
sudo service postgresql start
```

Ahora debes crear bases de datos con el usuario que está en el archivo .env 
[Si no existe un archivo .env debes crear uno con la siguiente información]

```DB_USERNAME = $Your_username$```

```DB_PASSWORD = $Your_password$```

```DB_NAME = $DatabaseName$```

```DB_HOST = 'localhost'```

Las bases de datos creadas deben llamarse:

_$DatabaseName__development$_

_$DatabaseName__test$_

_$DatabaseName__production$_

 :bar_chart: Luego para migrar las bases de datos debemos usar el comando en la terminal:

```bash
yarn sequelize-cli db:migrate
```

:herb: Para poblarlas con seeds, debemos usar el comando:

```bash
yarn sequelize-cli db:seed:all
```

:herb: Y para deshacer las seeds:

```bash
yarn sequelize-cli db:seed:undo:all
```


### Iniciar una partida:

Antes de probar debemos asegurarnos que todas las funcionalidades de yarn estén presentes, corriendo

```bash
yarn
```

Ahora podemos probar nuestro backend

```bash
yarn dev
```

:thread: Acá se conecta a localhost:3000

### Swagger:

:rocket: Para ver la documentación de todas las funcionalidades, debe entrar a 

```bash
localhost:3000/doc-api
```
En swagger, se muestran muchos errores, pero estos no tienen un verdadero efecto sobre el funcionamiento de la página, por lo que solo hay que apretar el botón que dice "Hide".

:point_right: Acá podemos ver cómo funcionan todas las request de tipo GET y de tipo PUT.

:postbox: Las request de tipo PUT están explicadas, pero no lograron ser implementadas directamente en swagger, por lo que se explicarán acá.


##### :jigsaw: POST/partidas:

Se debería entregar parámetros del tipo:

```bash
{    codigo: INTEGER,
    creador: STRING,
    turno: STRING,
    ganador: STRING,
}
```

Un ejemplo de input puede ser:

```bash
{    codigo: 123789,
    creador: nicolelarenas, 
    turno: nicolelarenas,
    ganador: valentinaramirez,
}
```

##### :flower_playing_cards: POST/casillas:

Se debería entregar parámetros del tipo:

```bash
{   tipo: STRING,
    accion: STRING,
    id_tablero: INTEGER,
    coordenadas: STRING,
    front: STRING,
    back: STRING,
    id_casilla: INTEGER,
}
```

Un ejemplo de input puede ser:

```bash
{ 
    tipo: 'Madera',
    accion: 'Recolectar',
    id_tablero: tablero[0],
    coordenadas: '(6,0)',
    front: '/../../public/Imagenes/Forest.png',
    back: '/../../public/Imagenes/Collect.png',
    id_casilla: 37,
}
```

##### :mahjong: POST/tableros:

```bash
{   id_partida: INTEGER,
}
```

Un ejemplo de input puede ser:

```bash
{ 
    id_partida: 8,
}
```

##### :wood: POST/recursos/crear:

```bash
{ 
    tipo: STRING,
    id_jugador: INTEGER,
}
```

Un ejemplo de input puede ser:

```bash
{ 
    tipo: 'Madera',
    id_jugador: 1,
}
```

##### :man_technologist: POST/jugadors:

```bash
{ 
    id_usuario: INTEGER,
    id_partida: INTEGER,
    tipo: STRING,
    posicion: STRING,
}
```

Un ejemplo de input puede ser:

```bash
{ 
    id_usuario: 2,
    id_partida: 3,
    tipo: 'Principiante',
    posicion: '(0,3)',
}
```

##### :canoe: POST/barcos:

```bash
{ 
    id_jugador: INTEGER,
    tipo: STRING,
    posicion: STRING,
}
```

Un ejemplo de input puede ser:

```bash
{ 
    id_jugador: 6,
    tipo: 'Nivel1',
    posicion: '(0,5)',
}
```

#### Faltan los de Authentication. 


### Pruebas 

Vamos a explicar algunas de las funcionalidades más útiles por si acaso.

Primero puedes ver los usuarios conectados:

```GET http://localhost:3000/usuarios```

Luego puedes ver los jugadores:

```GET http://localhost:3000/jugadors```

Puedes revisar el jugador específico con su id:
```GET http://localhost:3000/jugadors/id/$id$```

Luego puedes revisar el tablero:
```GET http://localhost:3000/tableros```

Y la partida:
```GET http://localhost:3000/partidas```

Además de las casillas correspondientes al tablero:

```GET http://localhost:3000/casillas/casillas_tablero/$id_tablero$```


##### Inicio de la partida:

Primero, debes lanzar el dado, por ahora el lanzamiento se debe hacer con el id del dado, que puedes obtener haciendo:

```GET http://localhost:3000/dados```

Para lanzar:

```PUT http://localhost:3000/dados/lanzar_dado/$id$```

Luego, mueves el jugador:

```PUT http://localhost:3000/jugadors/posicion_update/$id$```

Ahi se actualizan los recursos del jugador dependiendo de la acción de la casilla en la que cayó, se puede comprobar en:

```PUT http://localhost:3000/recursos```

Podemos ver cuantos recursos en total tiene un jugador con:

```GET http://localhost:3000/recursos/jugador/$id_jugador$```


### Usuarios para probar (que ya estan creados):

mail: valtiaramirez@gmail.com
contraseña: vale1234

mail: nicolitarenas@gmail.com
contraseña: nico1235

### Link para la versión online (deploy):

```https://web-api-uig9.onrender.com/```
