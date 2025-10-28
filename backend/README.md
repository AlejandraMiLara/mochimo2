Hola chicos aqui les dejo una ayuda para que comiencen:

Clonar el repositorio (no descargar)


Instalar dependencias:

checar tener instalado node: node -v
checar tener instalado npm: npm -v

npm install

npm i dotenv

npm install prisma --save-dev

npx prisma init --datasource-provider postgresql

npm install -D dotenv-cli

npm run prisma:dev

Descargan POSTGRESQL:
https://www.postgresql.org/download/

Necesitan un .env , yo allí tengo PORT, JWT_SECRET, y DATABASE_URL
Ese último lo agregó prisma automaticamente, lo pongo por si lo ocupan:
"postgresql://postgres:LACLAVEDEUSTEDES@localhost:ELPUERTODEUSTEDES/DBDEUSTEDES?schema=public"
¿cómo que cuál clave? La clave que usaron cuando instalaron postgresql


en teoría ya podrían calar el sistema hasta el momento

Primero creen un usuario, necesitan:

{
    "email": "alejandra@miranda.com",
    "password": "unacontraseñasegura123",
    "name": "Alejandrina",
    "lastName": "Miranda"
}

luego hacen login con:
{
    "email": "alejandra@miranda.com",
    "password": "unacontraseñasegura123"
}

y ya pueden acceder a lo protegido


ENDPOINTS:

Auth
POST /auth/login - inicia sesión y establece la cookie de autenticación

POST /auth/logout - cierra la sesión y limpia la cookie.

Users
POST /users - crea un nuevo usuario (registro).

GET /users - (protegido) obtiene todos los usuarios.

GET /users/:id - (protegido) Obtiene un usuario por ID.

