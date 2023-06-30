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


```bash
yarn dev
```

:thread: Acá se conecta a localhost:3000

### Pruebas 

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


Existen muchas más funcionalidades, que pueden ser útiles, pero que no son necesarias para una simulación de juego actualmente, cómo ver el estado de los barcos, etc. Aún así se pueden ver y probar, revisando el archivo en la carpeta routes de cada modelo. Tienen un comentario de qué hace cada uno :smiley:

