# OptimusPC Website

Landing page profesional para OptimusPC - Optimizador de Windows.

## 🚀 Deploy en Vercel

### Opción 1: Deploy automático (Recomendado)

1. Sube la carpeta `website` a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Haz clic en "Add New Project"
4. Importa tu repositorio
5. Configura el Root Directory como `website` (si subiste todo el proyecto)
6. Haz clic en "Deploy"

### Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar a la carpeta website
cd website

# Deploy
vercel
```

### Opción 3: Drag & Drop

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta `website` a la zona de upload
3. Vercel automáticamente detectará el sitio estático

## 📁 Estructura

```
website/
├── index.html      # Página principal
├── styles.css      # Estilos CSS
├── script.js       # JavaScript interactivo
├── vercel.json     # Configuración de Vercel
├── package.json    # Metadatos del proyecto
└── images/         # Capturas de pantalla
    ├── tema oscuro.png
    ├── tema blanco.png
    └── Captura de pantalla *.png
```

## ✨ Características

- Diseño moderno y responsive
- Tema oscuro profesional
- Animaciones suaves
- Galería de capturas con tabs
- Sección de FAQ interactiva
- Optimizado para SEO
- Headers de seguridad configurados
- Caching optimizado para assets

## 🛠️ Desarrollo Local

```bash
# Con Node.js
npx serve .

# Con Python
python -m http.server 3000

# Con PHP
php -S localhost:3000
```

## 📅 Actualizado

4 de Febrero de 2026

## 📄 Licencia

MIT License - OptimusPC
