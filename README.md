# kcultureShop — Hito 1: Dominio y Pruebas Unitarias

Este repositorio de **kcultureShop**, es el módulo de comercio electrónico y tienda oficial que se quiere integrar al ecosistema del proyecto **Chinzillas Sin Filtro**; una plataforma colaborativa dedicada al análisis, reseñas, recomendaciones y noticias sobre cine, series, mangas, anime y contenido audiovisual asiático y global.

Este módulo comprendio el diseño e implementación del **Core de Dominio Puro** en Java, garantizando el aislamiento total respecto a frameworks externos y bases de datos físicas, un diseño de alta cohesión y una suite automatizada de pruebas unitarias que alcanza un **100% de cobertura de código (Branch/Line Coverage)**.

Para su realizacion, se siguieron las intrucciones para la entrega del "Hito 1 - Pruebas Unitarias" para el programa de fundamentos de JAVA de parte de Desafio Latam & Globant. 



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



## Ejecución y Comandos Maven

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


## Estructura del Repositorio
```text
kculture-shop/
├── .mvn/
│   └── wrapper/
│       └── maven-wrapper.properties
├── src/
│   ├── main/
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
│   └── test/
│       └── java/
│           └── com/
│               └── kcultureshop/
│                   ├── domain/
│                   │   ├── OrderTest.java
│                   │   └── ProductTest.java
│                   └── service/
│                       └── OrderServiceTest.java
├── mvnw
├── mvnw.cmd
├── pom.xml
├── .gitignore
└── README.md
```

## Notas de Implementación
Desacoplamiento Estricto: El modelo de dominio es autónomo y no posee dependencias con frameworks web, ORMs o bases de datos físicas

Inyección por Constructor: Los servicios reciben sus dependencias vía constructor, facilitando la inserción de Mocks durante las pruebas.

Idioma del Código: Toda la nomenclatura de clases, métodos, variables está estandarizada en inglés; De igual forma los comentarios estan en español para un mejor entendimiento de lo que se realiza en el codigo.

Entorno Limpio: El repositorio incluye la configuración adecuada en .gitignore para omitir compilados (target/) y archivos temporales de IDEs.
