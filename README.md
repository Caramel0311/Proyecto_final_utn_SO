# Proyecto final - Arquitectura y Sistemas Operativos

Este proyecto es una aplicación simple armada con varios servicios que se ejecutan con Docker:

- **Frontend**: la página web que se abre en el navegador.
- **Backend**: una API hecha con Node.js y Express.
- **Base de datos**: PostgreSQL.
- **Nginx**: recibe las visitas del navegador y las redirige al frontend o al backend.

La idea del trabajo práctico es levantar el proyecto, entender cómo se conectan los contenedores y luego modificar algunas partes.

## 1. Antes de empezar

No hace falta instalar Node.js ni PostgreSQL en la computadora. Docker se va a encargar de ejecutar esas herramientas dentro de contenedores.

Sí hace falta instalar:

- Git
- Docker Desktop
- Un navegador web, por ejemplo Chrome, Edge o Firefox
- Un editor de código, por ejemplo Visual Studio Code

## 2. Qué es una terminal

La terminal es una ventana donde escribimos comandos para pedirle cosas a la computadora.

Por ejemplo, desde la terminal podemos:

- descargar un proyecto con Git;
- entrar a una carpeta;
- levantar los contenedores con Docker;
- ver si algo falló.

En Windows pueden usar:

- **Git Bash**: recomendada para trabajar con este proyecto.
- **PowerShell**: útil para instalar herramientas o verificar Docker.
- **Terminal de Windows**: también sirve si ya la tienen instalada.

Cuando esta guía diga "abrí una terminal", para los comandos del proyecto usen preferentemente **Git Bash**.

## 3. Instalar Git en Windows

Git sirve para descargar el proyecto, guardar cambios y subir la entrega a GitHub.

### Opción A: instalar con winget

Abrí **PowerShell** y ejecutá:

```powershell
winget install --id Git.Git -e --source winget
```

Cuando termine la instalación, cerrá la terminal y abrí una nueva.

### Opción B: instalar desde la web

1. Entrá a <https://git-scm.com/downloads>.
2. Descargá Git para Windows.
3. Ejecutá el instalador.
4. Dejá las opciones por defecto, salvo que el docente indique otra cosa.

### Verificar Git

Abrí **Git Bash** y ejecutá:

```bash
git --version
```

Si aparece algo parecido a `git version 2.x.x`, Git quedó instalado.

## 4. Instalar Docker Desktop en Windows

Docker permite ejecutar el backend, la base de datos y Nginx sin instalarlos manualmente.

### Requisitos

Docker Desktop funciona en Windows 10/11 de 64 bits. En Windows usa una tecnología llamada WSL2.

### Instalar WSL2

Abrí **PowerShell como Administrador**.

Para abrirlo como administrador:

1. Hacé clic en Inicio.
2. Escribí `PowerShell`.
3. Hacé clic derecho.
4. Elegí **Ejecutar como administrador**.

Ejecutá:

```powershell
wsl --install
```

Si ya tenías WSL instalado, ejecutá también:

```powershell
wsl --set-default-version 2
```

Si Windows pide reiniciar la computadora, reiniciala.

### Descargar Docker Desktop

1. Entrá a <https://www.docker.com/products/docker-desktop/>.
2. Descargá Docker Desktop para Windows.
3. Ejecutá el instalador.
4. Si aparece la opción **Use WSL2 instead of Hyper-V**, dejala marcada.
5. Al finalizar, abrí Docker Desktop.

Importante: Docker Desktop tiene que estar abierto antes de usar comandos de Docker.

### Verificar Docker

Abrí **PowerShell** o **Git Bash** y ejecutá:

```bash
docker --version
```

Deberías ver algo parecido a:

```text
Docker version 24.x.x
```

Ahora probá:

```bash
docker run hello-world
```

Si aparece un mensaje que dice `Hello from Docker!`, Docker quedó funcionando.

## 5. Descargar el proyecto

Este paso se llama **clonar el repositorio**.

Un repositorio es una carpeta de proyecto guardada con Git. Clonar significa descargar una copia de ese proyecto a tu computadora.

Abrí **Git Bash** en la carpeta donde quieras guardar el proyecto. Por ejemplo, podés usar `Documentos`.

Ejecutá:

```bash
git clone https://github.com/JereFassi/utn-so-final-project.git
```

Eso va a crear una carpeta llamada `utn-so-final-project`.

Entrá a esa carpeta con:

```bash
cd utn-so-final-project
```

El comando `cd` significa "change directory", es decir, cambiar de carpeta.

## 6. Levantar el proyecto

Con la terminal ubicada dentro de la carpeta del proyecto, ejecutá:

```bash
docker compose up --build
```

Qué hace este comando:

- `docker`: usa Docker.
- `compose`: usa Docker Compose, que sirve para levantar varios contenedores juntos.
- `up`: inicia los servicios.
- `--build`: construye de nuevo la imagen del backend si hace falta.

La primera vez puede tardar porque Docker tiene que descargar imágenes y preparar los contenedores.

Dejá esa terminal abierta mientras uses el proyecto. Si la cerrás, los contenedores pueden detenerse.

## 7. Probar en el navegador

Cuando los servicios terminen de iniciar, abrí el navegador y entrá a:

- Frontend: <http://localhost>
- Ping del backend: <http://localhost/api/ping>
- Lista de estudiantes: <http://localhost/api/students>
- Saludo: <http://localhost/api/greet?name=TuNombre>

`localhost` significa "mi propia computadora".

## 8. Detener el proyecto

En la terminal donde está corriendo Docker, presioná:

```text
Ctrl+C
```

Eso significa mantener presionada la tecla `Ctrl` y tocar la tecla `C`.

Después ejecutá:

```bash
docker compose down
```

Este comando detiene y elimina los contenedores, pero conserva los datos de PostgreSQL.

Para volver a levantar el proyecto más tarde:

```bash
docker compose up --build
```

## 9. Datos de PostgreSQL

PostgreSQL guarda sus datos en un volumen de Docker.

- `docker compose down` detiene los contenedores, pero conserva los datos.
- `docker compose down -v` detiene los contenedores y también borra los datos guardados.

Si usás `docker compose down -v`, la próxima vez que levantes el proyecto se va a ejecutar de nuevo `postgres/init.sql` y se van a crear los datos iniciales otra vez.

Si no existe un archivo `.env`, Docker Compose usa estos valores por defecto:

- usuario: `student`
- contraseña: `studentpass`
- base de datos: `school`

No hace falta crear un `.env` para hacer el trabajo práctico.

## 10. Tareas del proyecto

Las consignas están separadas para que el README no sea todavía más largo.

- Cuestionario teórico: [docs/1.CuestionarioTeorico.md](docs/1.CuestionarioTeorico.md)
- Tareas prácticas: [docs/2.TareasPracticas.md](docs/2.TareasPracticas.md)

Antes de entregar, probá siempre el proyecto con:

```bash
docker compose up --build
```

## 11. Problemas comunes

### `docker` no se reconoce como comando

Posibles causas:

- Docker Desktop no está instalado.
- Docker Desktop está cerrado.
- La terminal estaba abierta antes de instalar Docker.

Solución:

1. Abrí Docker Desktop.
2. Esperá a que termine de iniciar.
3. Cerrá la terminal.
4. Abrí una terminal nueva.
5. Probá de nuevo:

```bash
docker --version
```

### Docker Desktop queda iniciando mucho tiempo

Revisá que WSL2 esté instalado. En PowerShell como administrador:

```powershell
wsl --install
```

Después reiniciá la computadora.

### El puerto 80 está ocupado

El proyecto usa <http://localhost>, que corresponde al puerto `80`.

Si aparece un error indicando que el puerto está ocupado, puede haber otro programa usando ese puerto. Cerrá otros servidores locales o avisá al docente.

### La base de datos quedó con datos viejos

Si necesitás borrar los datos y empezar de cero:

```bash
docker compose down -v
docker compose up --build
```

Usá `down -v` con cuidado porque borra los datos guardados por PostgreSQL.

### Cambié archivos pero no veo cambios

Probá reconstruir:

```bash
docker compose up --build
```

Si sigue igual, detené todo y volvé a levantar:

```bash
docker compose down
docker compose up --build
```

## 12. Comandos más usados

```bash
git clone https://github.com/JereFassi/utn-so-final-project.git
cd utn-so-final-project
docker compose up --build
docker compose down
docker compose down -v
git status
git add .
git commit -m "Proyecto final de Docker completado"
git push -u origin main
```

Resumen rápido:

- `git clone ...`: descarga el proyecto.
- `cd utn-so-final-project`: entra a la carpeta del proyecto.
- `docker compose up --build`: levanta los contenedores.
- `docker compose down`: detiene los contenedores.
- `docker compose down -v`: detiene los contenedores y borra los datos de la base.
- `git status`: muestra qué archivos cambiaron.
- `git add .`: prepara los cambios para guardarlos en Git.
- `git commit -m "..."`: guarda los cambios con un mensaje.
- `git push -u origin main`: sube los cambios a GitHub.

## 13. Entrega del proyecto

Cuando termines las tareas, tenés que subir tu versión a un repositorio propio de GitHub.

### Paso 1: crear un repositorio en GitHub

1. Entrá a <https://github.com>.
2. Iniciá sesión.
3. Hacé clic en **New repository** o **Nuevo repositorio**.
4. Elegí un nombre, por ejemplo `utn-so-final-project-tu-nombre`.
5. No lo inicialices con README, `.gitignore` ni licencia.
6. Hacé clic en **Create repository**.

### Paso 2: conectar tu carpeta con tu repositorio

En Git Bash, dentro de la carpeta del proyecto, ejecutá:

```bash
git remote remove origin
git remote add origin https://github.com/tuusuario/utn-so-final-project-tu-nombre.git
```

Reemplazá `tuusuario` y `utn-so-final-project-tu-nombre` por los datos reales de tu repositorio.

### Paso 3: guardar tus cambios

Ejecutá:

```bash
git status
git add .
git commit -m "Proyecto final de Docker completado"
```

Es recomendable hacer commits durante el trabajo, no solamente al final. Ejemplos de mensajes:

```bash
git commit -m "Agrega saludo personalizado"
git commit -m "Actualiza puerto del backend"
git commit -m "Agrega formulario de estudiantes"
```

### Paso 4: subir a GitHub

Ejecutá:


Si aparece un error porque tu rama se llama `master`, probá:

```bash
git push -u origin master
```

### Paso 5: enviar el enlace

Copiá el enlace de tu repositorio. Tiene que verse parecido a:

```text
https://github.com/tuusuario/utn-so-final-project-tu-nombre
```

Enviá ese enlace por correo con copia a:

- jeremiasfassi@gmail.com
- javierekinter@gmail.com

## 14. Ubuntu como alternativa

Si usás Ubuntu 22.04 o 20.04, podés instalar Docker Engine desde la terminal.

Primero, eliminá versiones anteriores si existieran:

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

Actualizá los paquetes e instalá dependencias:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

Agregá la clave oficial de Docker:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Configurá el repositorio:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Instalá Docker:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verificá:

```bash
docker --version
sudo docker run hello-world
```

Opcionalmente, para usar Docker sin escribir `sudo`:

```bash
sudo usermod -aG docker $USER
```

Después cerrá sesión y volvé a iniciar sesión.

En Ubuntu, si un comando de Docker falla por permisos, podés usar `sudo` adelante del comando o configurar el grupo `docker` como se explicó arriba.
