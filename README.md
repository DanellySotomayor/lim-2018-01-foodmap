#  F O O D M A P

Crea una web-app que a través de un input pueda filtrar los restaurantes
que se encuentran cerca de ti *(Tú decides la estructura que tendrán tus datos,
puedes crear una lista de restaurantes en un arreglo, en un objeto, consumir una API, etc. Lo importante es que el contenido debe ser dinámico y no estático y el diseño es totalmente libre)*.

#### Flujo de la aplicación.

Vista splash con duración de 2 segundos que redirecciona a tu vista
principal.
![Splash](assets/mobile-wmfood-preloader.png)

En la vista principal se muestran todos los restaurantes "cerca de ti" junto
con el input para filtrar tu elección *(Los criterios de filtrado son decisión
tuya, puede ser por tipo de comida, costos, orden alfabético, etc.)*.
![vista principal](assets/mobile-wmfood-home.png)

Ya que se hizo la elección del filtro deben mostrarse únicamente aquellos
restaurantes que cumplan con la condición.
![vista filtrado](assets/mobile-wmfood-filter.png)

Al seleccionar alguno de los restaurantes, deberá mostrarse la información de
este a través de un modal.
![modal imagen](assets/mobile-wmfood-info.png)
