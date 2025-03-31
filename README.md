
# The Bar Manager 

![Project Architecture](https://img.shields.io/badge/architecture-modular-brightgreen)
![Backend](https://img.shields.io/badge/backend-FastAPI-blue)
![Frontend](https://img.shields.io/badge/frontend-Next.js-9cf)

Sistema modular para gestión de órdenes de cerveza en un bar con backend en FastAPI y frontend en Next.js.

## 🚀 Configuración Rápida

### Requisitos Previos
- Node.js 18+ (Frontend)
- Python 3.12 (Backend)
- npm 9+

## ⚙️ Configuración del Proyecto

### **Backend (FastAPI)**
**Estructura Modular:**
```
/backend
│
├── /Modules
│   └── /orders
│       ├── /handlers      # Manejo de lógica de endpoints
│       ├── /models        # Modelos Pydantic
│       ├── /routers       # Definición de rutas API
│       └── /services      # Lógica de negocio
│
├── /database             # Configuración de base de datos
├── main.py               # Punto de entrada
└── requirements.txt
```

**Instalación:**
```bash
# Crear y activar entorno virtual
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt
```

**Ejecución:**
```bash
python main.py
````





### **Frontend (Next.js)**
**Estructura Modular:**
```
/frontend
│
├── /src
│   ├── /app              # Sistema de rutas de Next.js
│   ├── /test             # Pruebas unitarias
│   └── /Modules
│       └── /orders
│           ├── /components  # Componentes UI específicos
│           ├── /screens     # Vistas/páginas
│           └── /services    # Lógica API cliente
│
├── .env                  # Variables de entorno
└── next.config.js
```

**Configuración:**
1. Copiar archivo de entorno:
```bash
cp .example.env .env
```
2. Configurar variable:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Instalación:**
```bash
npm install
```

**Ejecución:**
```bash
npm run dev  # Depende de la ejecución de backend
```

## 🕒 Estimación del Tiempo
| Componente       | Tiempo Estimado |
|-----------------|----------------|
| Backend         | 2 horas        |
| Frontend        | 2 horas        |
| Testing         | 2 horas        |
| **Total**       | **6 horas**    |

## 🌐 Endpoints Principales
| Método | Endpoint       | Descripción               |
|--------|---------------|---------------------------|
| GET    | /api/orders    | Obtener todas las órdenes |
| POST   | /api/orders    | Crear nueva orden         |
| GET    | /api/orders/{id}| Obtener orden específica |

## 🧪 Testing
**Backend:**
```bash
pytest 
```

**Frontend:**
```bash
npm run test # Depende de la ejecución de backend
```

## 🏗️ Diagrama de Estructura
```
/proyecto
│
├── /backend
│   ├── /Modules
│   │   └── /orders
│   │       ├── handlers/
│   │       ├── models/
│   │       ├── routers/
│   │       └── services/
│   ├── /database
│   ├── main.py
│   └── requirements.txt
│
├── /frontend
│   ├── /src
│   │   ├── /app
│   │   ├── /test
│   │   └── /Modules
│   │       └── /orders
│   │           ├── components/
│   │           ├── screens/
│   │           └── services/
│   ├── .env
│   └── next.config.js
│
└── README.md
```
