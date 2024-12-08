# Testt Técnico Full Stack Rebate Agro

Este repositório contém o código do backend desenvolvido com Laravel e do frontend desenvolvido com React usando Vite.

## Instruções para Configurar o Ambiente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [PHP](https://www.php.net/downloads) (versão 8.0 ou superior)
- [Composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MySQL](https://dev.mysql.com/downloads/) ou outro banco de dados compatível

---

## Configuração do Backend (Laravel)

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/VictorRibeiroH/task_manager
2. **Instale as Dependências do Laravel**
   ```bash
   cd task-manager-backend
   composer install
3. **Copie o arquivo de exemplo .env.example para .env**
    ```bash
    cp .env.example .env ou copy .env.example .env
4. **Atualize o arquivo .env com as credenciais do banco de dados.**
    ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=task_manager
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
5. **Gere a chave de Aplicação**
    ```bash
    php artisan key:generate
6. **Execute as migrações**
    ```bash
    php artisan migrate
7. **Inicie o servidor do Laravel**
    ```bash
    php artisan serve


## Configuração do Frontend (React Vite)
1. **Navegue até a pasta do Frontend**
    ```bash
    cd task-manager-frontend
2. **Instale as Depedências**
    ```bash
    npm install
3. **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev

## Vídeo de Demonstração

Clique na imagem abaixo para assistir ao vídeo de demonstração:

[![Miniatura do Vídeo](https://via.placeholder.com/600x400?text=Clique+para+assistir+ao+vídeo)](https://github.com/VictorRibeiroH/task_manager/raw/main/task-manager-frontend/src/assets/Demo.mp4)
