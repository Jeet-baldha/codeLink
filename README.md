# CodeLink

CodeLink is a collaborative code-sharing application that allows users to share code in real-time with others. It provides a code editor with live updates using socket.io, supports various themes and languages, and includes features like user customization and session validation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Real-time collaborative code editing
- Supports multiple themes and languages
- Customizable editor settings (theme, font size, language)
- Live code updates with socket.io
- Room validation for secure code sharing

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Jeet-baldha/codelink.git
    ```

2. Navigate to the project directory:

    ```bash
    cd codelink
    ```

3. Install server dependencies:

    ```bash
    cd backend
    npm install
    ```

4. Install client dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

5. Start the server:

    ```bash
    cd ../backend
    node index.js
    ```

6. Start the client:

    ```bash
    cd ../frontend
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the application.
2. Click on the "Share now" button to open the code editor. Then click on the Link icon on the right sidebar, copy the link, and share it with your friend.
3. Start coding and see your changes live with other participants in the room.

## Configuration

### Server Configuration

The server can be configured by editing the environment variables in the `.env` file located in the `backend` directory.


    PORT=3000
    MONGODB_URL=your_mongodb_connection_string

### Tailwind CSS Configuration

Tailwind CSS is used for styling the frontend. Follow these steps to set it up:

1. Install Tailwind CSS via npm:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2. Configure your `tailwind.config.js` file:

    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3. Add the Tailwind directives to your CSS file (e.g., `src/index.css`):

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4. Ensure your CSS file is imported in your `src/main.jsx` or `src/main.tsx`:

    ```js
    import './index.css';
    ```


## API Endpoints

### POST /checkUrl

Validates if a room URL exists.

- **Request Body**: `{ url: string }`
- **Response**: `{ data: boolean }`

### POST /createRoom

Creates a new room with a unique URL.

- **Response**: `{ url: string }`

## Technologies Used

- **Frontend**:
  - React
  - Tailwind css
  - Ace Editor
  - Redux
  - React Router
  - Socket.io-client
  - Axios

- **Backend**:
  - Node.js
  - Express
  - Socket.io
  - Mongoose

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

