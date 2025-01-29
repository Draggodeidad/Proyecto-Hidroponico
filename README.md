# Guía para Trabajar con GitHub Flow

Este documento explica el flujo de trabajo colaborativo que seguiremos usando **GitHub Flow**. Asegúrate de leerlo detenidamente antes de contribuir al proyecto.

---

## 📋 Tabla de Contenido

1. [Pasos para Trabajar con GitHub Flow](#-pasos-para-trabajar-con-github-flow)
2. [Consejos Adicionales](#-consejos-adicionales)
3. [Ejemplo Práctico](#-ejemplo-práctico)

---

## 🔄 Pasos para Trabajar con GitHub Flow

### 1. Clona el Repositorio

Si es tu primera vez trabajando en el proyecto:

```bash
git clone https://github.com/Draggodeidad/Proyecto-Hidroponico.git
cd Proyecto-Hidroponico
```

```bash

```

### 2. Sincroniza la Rama Principal

Actualiza siempre tu rama main antes de empezar:

```bash
git checkout main
git pull origin main
```

### 3. Crea una Rama Nueva

Usa nombres descriptivos para tus ramas:

```bash
git checkout -b feature/nombre-funcionalidad
# Ejemplo:
git checkout -b feature/sistema-riego
```

### 4. Desarrolla tu Funcionalidad

Haz cambios en el código

Revisa los archivos modificados:

```bash
git status
```

Agrega los cambios al área de preparación:

```bash
git add nombre-archivo
# o para todos los cambios:
git add .
```

Guarda tus cambios con un mensaje claro

```bash
git commit -m "feat: Implementar sistema de riego automático"
```

### 5. Sube tus Cambios

Envía tu rama al repositorio remoto:

```bash
git push origin feature/nombre-funcionalidad
```

### 6. Crea un Pull Request (PR)

Ve a nuestro repositorio en GitHub

Haz clic en Compare & pull request

Completa la plantilla del PR:

Título: Descripción breve (ej: "Nuevo sistema de riego")

Descripción: Detalla qué cambios incluyes y por qué

Revisores: @menciona a 2 compañeros

Etiquetas: Agrega etiquetas relevantes (feature, bugfix, etc)

### 7. Revisión del Código

Responde a los comentarios de los revisores

Si necesitas hacer correcciones:

```bash
git add .
git commit -m "fix: Corregir intervalo de riego"
git push origin feature/nombre-funcionalidad
```

### 8. Fusiona el PR

Una vez aprobado:

Haz clic en Merge pull request

Usa Create merge commit

Elimina la rama desde GitHub (opcional)

### 9. Actualiza tu Entorno Local

```bash
git checkout main
git pull origin main
```

10. Limpieza Opcional
    Elimina ramas locales que ya no necesites:

```bash
git branch -d feature/nombre-funcionalidad
```

💡 Consejos Adicionales
Buenas Prácticas
✅ Commits Atómicos:
"Un commit = un cambio lógico"
Ejemplo bueno:
git commit -m "feat: Añadir sensor de temperatura"
Ejemplo malo:
git commit -m "Cambios varios"

✅ Nomenclatura de Ramas:
Usa estos prefijos:

feature/: Nueva funcionalidad

bugfix/: Corrección de errores

hotfix/: Corrección urgente

docs/: Cambios en documentación

✅ Mensajes Claros:
Usa el formato:
tipo: Descripción breve
Tipos recomendados:
feat, fix, docs, style, refactor

Herramientas Útiles
git log --oneline: Ver historial compacto

git diff: Ver cambios no guardados

GitHub Desktop: Alternativa visual

🛠 Ejemplo Práctico
Escenario: Implementar monitoreo de pH

1. Sincroniza main:

```bash
git checkout main && git pull
```

2. Crea rama:

```bash
git checkout -b feature/ph-monitoring
```

3. Desarrolla:

```bash
# ...haz cambios en el código...
git add sensores/ph.py
git commit -m "feat: Añadir lectura de pH"
git push origin feature/ph-monitoring
```

4. Crea PR en GitHub:

Título: "Sistema de monitoreo de pH"

Descripción: "Implementa lectura de pH con calibración automática"

Revisores: @companero1 @companero2

Después de aprobación:

```bash
git checkout main
git pull
git branch -d feature/ph-monitoring
```

¡Importante!
🔒 La rama main siempre debe estar estable y lista para producción.
🔄 Sincroniza frecuentemente con el repositorio remoto.
💬 Comunica qué partes del código estás modificando.
