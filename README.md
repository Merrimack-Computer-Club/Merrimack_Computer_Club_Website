# Merrimack College Computer Club Knowledgebase

## Overview

The Merrimack College Computer Club Knowledgebase is a full-stack web application built with React, Mantine UI, Firebase, and Bootstrap. It provides a collaborative platform for club members to share knowledge, create posts, comment, and connect with peers.

## Features

- **User Authentication:** Google OAuth login restricted to Merrimack College email addresses.
- **Knowledgebase:** Create, edit, delete, and search posts with rich text, tags, and resources.
- **Comments:** Engage with posts through threaded comments.
- **Member Directory:** View public profiles of club members.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Firebase Integration:** Real-time database for posts, users, and comments.
- **Media Support:** Stock videos and images for enhanced visual experience.

## Tech Stack

- **Frontend:** React, Mantine UI, Bootstrap, React Quill
- **Backend:** Firebase Realtime Database, Firebase Hosting
- **Authentication:** Google OAuth via `@react-oauth/google`
- **Icons:** Tabler Icons
- **Styling:** CSS Modules, Mantine, Bootstrap

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)
- Access to Merrimack College Google account for login

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Merrimack-Computer-Club/Merrimack_Computer_Club_Website
    cd Merrimack_Computer_Club_Website
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1. **Environment Variables:**
    - Create a `.env` file in the project root:
      ```bash
      PORT=5000
      ```
    - (Optional) Add other environment variables as needed for local development.

2. **Firebase Setup:**
    - The project is pre-configured for the Merrimack Computer Club Firebase project.
    - If you wish to use your own Firebase project, update the configuration in [`src/pages/firebaseConfig.js`](src/pages/firebaseConfig.js).

### Usage

1. **Start the development server:**
    ```bash
    npm start
    ```
    - The app will run at [http://localhost:5000](http://localhost:5000) (or the port specified in `.env`).

2. **Access the app:**
    - Open your browser and navigate to [http://localhost:5000](http://localhost:5000).
    - Or visit the [Firebase Hosted Webpage](https://web-development-final-7dd3e.web.app/).

### Build & Deploy

1. **Build the React project:**
    ```bash
    npm run build
    ```

2. **Deploy to Firebase Hosting:**
    ```bash
    firebase deploy
    ```
    - See [`firebase.json`](firebase.json) for hosting configuration.

## Project Structure

```
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── css/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
├── firebase.json
└── README.md
```

## Contribution Guidelines

1. **Fork the repository** and create your feature branch:
    ```bash
    git checkout -b feature/YourFeature
    ```
2. **Commit your changes** with clear messages.
3. **Push to your fork** and submit a pull request.
4. **Describe your changes** and reference related issues if applicable.

## License

This project is licensed under the [MIT License](LICENSE).

## Support & Contact

For questions, suggestions, or issues, please open an issue on GitHub or contact the club directly.

---

Thank you for supporting the Merrimack College Computer Club Knowledgebase! Your contributions help foster a vibrant tech community on campus.

## Questions
If you have any questions please reach out to one of the Merrimack Computer Club eboard members in the [Discord](https://discord.gg/FdATJDYBPP).
If you have information about the project structure or want some extra help reach out to Alexander Elguezabal @ `aelguezabal@microsoft.com`.