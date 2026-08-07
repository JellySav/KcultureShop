# kcultureShop — Modulo de Chinzillas Sin Filtro

Este repositorio es un modulo del **proyecto Chinzillas Sin Filtro**, una plataforma colaborativa dedicada a eventos, comunidades, noticias y análisis sobre cine, series, mangas, anime y cultura pop global.

Este proyecto abarca la implementación tanto del frontend interactivo de la agenda de eventos (Hito 2) como del módulo backend/core de e-commerce de kcultureShop (Hito 1), desarrollado para el programa de contenidos de Desafío Latam & Globant.


## Navegación Rápida entre Hitos
```text 
Hito,Módulo / Componente,Tecnología,Ubicación / Comando Principal
Hito 2,"Agenda de Eventos, Filtros y Reservas","TypeScript, HTML5, CSS3, DOM API",npm run dev (Servidor local web)
Hito 1,Core de Dominio y Pruebas Unitarias,"Java 17, JUnit 5, Mockito, JaCoCo",mvn test / ./mvnw verify (Directorio root / subcarpeta)
```

# Hito 2: Agenda de Eventos y Sistema de Reservas (Frontend Web)

El Hito 2 comprende el desarrollo de la interfaz dinámica para la exploración de eventos de la comunidad "Chinzillas Sin Filtro", incorporando gestión de estado en memoria, ordenamiento, filtrado en tiempo real, paginación cliente y un sistema interactivo de reserva de cupos. 

Este módulo para el Hito 2 comprendió el desarrollo de la plataforma interactiva de la Agenda de Eventos y Reservas, construida sobre TypeScript y DOM API nativa, garantizando una arquitectura orientada a componentes, gestión de estado local aislada y un sistema reactivo de ordenamiento, filtrado y control de stock en tiempo real.

## Funcionalidades Clave
- **`Control de Estados y Jerarquia`**: Priorización visual y de selecciones entre eventos PROGRAMADOS, AGOTADO y FINALIZADO.

- **`Ordenamiento Dinámico (SortOption)`**: Permite ordenar la agenda por fecha (próximos/más lejanos) o agrupando eventos por estado (activos primero, finalizados al fondo).

- **`Filtrado Multiple`**: Segmentación instantánea por modalidad (TODOS, VIRTUAL, PRESENCIAL).

- **`Paginación Cliente`**: Navegación por páginas fijas de 6 eventos (PAGE_SIZE = 6) con actualización dinámica de controles (Prev/Next/Indicador de página).

- **`Formulario de Reservas en Tiempo Real`**: Validación de entradas (Email regex, cupos válidos), descuento interactivo de stock de cupos y deshabilitación automática de eventos agotados/finalizados en el <select>.


## Tecnologías y Requisitos

* **Lenguaje:** TypeScript / JavaScript (ES6+)
* **Tooling & Bulder:** Vite / ES Modules
* **Manipulacion de Interfaz:** HTML5, CSS3 (Flexbox/Grid), DOM API nativa



## Instalacion y Ejecución (Hito 2)


### 1. Iniciar el servidor de desarrollo 
```bash
mvn install
```

### 2. Iniciar el servidor de desarrollo 
```bash
npm run dev
```

### 3. Abrir la URL local indicada en la consola (por ejemplo, http://localhost:5173) para interactuar con la agenda de meetups.




# Hito 1: kcultureShop — Dominio y Pruebas Unitarias (Backend Core)

El Hito 1 comprendió el diseño e implementación del Core de Dominio Puro en Java para el módulo e-commerce kcultureShop, garantizando el aislamiento respecto a frameworks externos y alcanzando un 100% de cobertura de código (Branch y Line Coverage) con JUnit 5 y JaCoCo.

Este módulo para el hito 1; comprendio el diseño e implementación del **Core de Dominio Puro** en Java, garantizando el aislamiento total respecto a frameworks externos y bases de datos físicas, un diseño de alta cohesión y una suite automatizada de pruebas unitarias que alcanza un **100% de cobertura de código (Branch/Line Coverage)**.

## Contexto de Negocio

`kculture-shop` gestiona la lógica central de ventas y pedidos para productos derivados del universo audiovisual y la cultura pop (merchandise, cómics, álbumes, collectibles, etc.):

- **`Order`**: Entidad de dominio que representa un pedido, gestiona la adición de productos, mantiene el total acumulado y asigna el tipo de envío.
- **`Product`**: Representa un artículo disponible en catálogo, controlando stock, categorías y validación estricta de cantidades.
- **`OrderService`**: Servicio de aplicación que procesa compras y coordina la notificación de envíos mediante la abstracción `ShippingNotifier`.


## Componentes del Proyecto

### Dominio Puro (`com.kcultureshop.domain`)
* **`Product`**: POJO con ID, nombre, categoría, precio y control de stock.
* **`Order`**: Encapsula la lógica de la orden de compra, el cálculo automático de costos y reglas de validación.
* **`ProductCategory`**: Enumeración de las sub-categorías del inventario (ALBUM, PHOTOCARD, MERC, FIGURE).
* **`ShippingType`**: Modalidades y reglas de envío.
* **`InvalidQuantityException`**: Excepción personalizada para el control de errores de negocio.

### Servicios e Interfaces (`com.kcultureshop.service`)
* **`OrderService`**: Procesa la compra, valida el flujo comercial y dispara eventos de envío.
* **`ShippingNotifier`**: Interfaz desacoplada (puerto/abstracción) para el envío de notificaciones de despacho.


## Tecnologías y Requisitos

* **Lenguaje:** Java 17+ (requiere `JAVA_HOME` configurado a JDK 17)
* **Build Tool:** Apache Maven 3.x (incluye Maven Wrapper `mvnw` / `mvnw.cmd`)
* **Testing:** JUnit 5 (Jupiter)
* **Dobles de Prueba:** Mockito Core / Mockito JUnit Jupiter
* **Cobertura:** JaCoCo Plugin



## Ejecución y Comandos Maven (Hito 1)

Puedes ejecutar los comandos utilizando Maven global o el wrapper incluido (`./mvnw` en Linux/macOS o `mvnw.cmd` en Windows).

### 1. Compilar el Proyecto
```bash
mvn clean compile
```

### 2. Ejecutar la Suite de Pruebas Unitarias
Todas las pruebas siguen rigurosamente el patrón AAA (Arrange, Act, Assert):

```bash
# Con Maven global
mvn test

# O usando el wrapper en Windows
mvnw.cmd test
```

### 3. Generar el Reporte de Cobertura de Código (JaCoCo)
```bash
mvn verify
```

A continuación, abre el reporte generado en tu navegador:

```bash
target/site/jacoco/index.html
```

> Nota: este reporte se genera localmente y forma parte de los artefactos en `target/`; esa carpeta está excluida en `.gitignore`.


## Métrica de Cobertura de Código
Mediante la suite de pruebas automatizadas, se respalda una cobertura lógica verificable del 100% (Branch y Line Coverage) sin líneas condicionales desprotegidas:

| Paquete / Clase | Cobertura de Líneas | Cobertura de Ramas | Estado |
|---|---|---|---|
| `com.kcultureshop.domain.Product` | 100% | 100% | 🟢 OK |
| `com.kcultureshop.domain.Order` | 100% | 100% | 🟢 OK |
| `com.kcultureshop.domain.ProductCategory` | 100% | N/A | 🟢 OK |
| `com.kcultureshop.domain.ShippingType` | 100% | N/A | 🟢 OK |
| `com.kcultureshop.domain.InvalidQuantityException` | 100% | N/A | 🟢 OK |
| `com.kcultureshop.service.OrderService` | 100% | 100% | 🟢 OK |
| **Total Proyecto** | **100%** | **100%** | 🟢 **Excelente** |

> El reporte completo e interactivo se genera localmente en `target/site/jacoco/index.html` tras ejecutar `mvn verify`.


## Estructura del Repositorio (Hito 1 & 2)
```text
/
├── index.html                  # Marcado base de la aplicación web (Hito 2)
├── package.json                # Configuración de dependencias TypeScript/Vite
├── tsconfig.json               # Configuración del compilador TypeScript
├── pom.xml                     # Configuración de dependencias Maven (Hito 1)
├── mvnw                        # Wrapper ejecutable de Maven (Linux/macOS)
├── mvnw.cmd                    # Wrapper ejecutable de Maven (Windows)
├── .mvn/                       # Configuración interna del wrapper de Maven
│   └── wrapper/
│       └── maven-wrapper.properties
├── src/
│   ├── main/                   # Código Fuente Java - Backend (Hito 1)
│   │   └── java/
│   │       └── com/
│   │           └── kcultureshop/
│   │               ├── domain/
│   │               │   ├── InvalidQuantityException.java
│   │               │   ├── Order.java
│   │               │   ├── Product.java
│   │               │   ├── ProductCategory.java
│   │               │   └── ShippingType.java
│   │               └── service/
│   │                   ├── OrderService.java
│   │                   └── ShippingNotifier.java
│   ├── test/                   # Pruebas Unitarias Java (Hito 1)
│   │   └── java/
│   │       └── com/
│   │           └── kcultureshop/
│   │               ├── domain/
│   │               │   ├── OrderTest.java
│   │               │   └── ProductTest.java
│   │               └── service/
│   │                   └── OrderServiceTest.java
│   ├── main.ts                 # Controlador principal DOM - Frontend (Hito 2)
│   ├── models/
│   │   └── meetup.ts           # Interfaces y tipos de la agenda (Hito 2)
│   ├── services/
│   │   └── meetupService.ts    # Servicio de datos de eventos (Hito 2)
│   └── components/
│       └── MeetupCard.ts       # Renderizado de tarjetas HTML (Hito 2)
└── .gitignore                  # Omite temporales, compilados (/target, /node_modules, /dist)
```

## Notas de Implementación
Desacoplamiento Estricto: El modelo de dominio es autónomo y no posee dependencias con frameworks web, ORMs o bases de datos físicas

Inyección por Constructor: Los servicios reciben sus dependencias vía constructor, facilitando la inserción de Mocks durante las pruebas.

Idioma del Código: Toda la nomenclatura de clases, métodos, variables está estandarizada en inglés; De igual forma los comentarios estan en español para un mejor entendimiento de lo que se realiza en el codigo.

Entorno Limpio: El repositorio incluye la configuración adecuada en .gitignore para omitir compilados (target/) y archivos temporales de IDEs.
