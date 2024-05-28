# Miro Clone Project 🎨

## Overview

This project is a Miro clone that allows users to sign in with Google, create organizations, create new boards, use a whiteboard for collaboration, and share with team members live.

## Features ✨

- **Google Sign-In**: Users can sign in using their Google account.
- **Organization Creation**: Users can create new organizations.
- **Board Creation**: Within an organization, users can create new boards.
- **Whiteboard Functionality**: Users can use a whiteboard for drawing, writing, and collaborating.
- **Live Collaboration**: Team members can collaborate in real-time on the whiteboard.

## Technologies Used 🛠️

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Clerk**: For authentication, including Google Sign-In.
- **Liveblocks**: For real-time collaboration on the whiteboard.

## Setup Instructions 🚀

1. **Clone the repository**:
    ```bash
    git clone https://github.com/khushi2706/miro-clone
    cd miro-clone
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a `.env.local` file in the root of your project and add the following environment variables:
    ```env
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
    CLERK_API_KEY=<your-clerk-api-key>
    LIVEBLOCKS_SECRET_KEY=<your-liveblocks-secret-key>
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 📋

### Sign In with Google
- Navigate to the home page and click on the "Sign in with Google" button.
- Authenticate using your Google account.

### Create Organization 🏢
- After signing in, click on the "Create Organization" button.
- Provide the necessary details for the organization.

### Create New Board 📝
- Inside your organization, click on the "Create New Board" button.
- Name your board and start using the whiteboard.

### Use Whiteboard ✏️
- Use the tools provided to draw, write, and add elements to your whiteboard.
- All changes are saved and can be seen in real-time by other team members.

### Share with Team Members 👥
- Invite team members to your organization and board.
- Collaborate live as changes appear instantaneously for all team members.

## Contributing 🤝

1. Fork the repository.
2. Create a new branch with your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.


## Acknowledgements 🙏

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Liveblocks](https://liveblocks.io/)

Feel free to contribute to the project by submitting issues or pull requests. Enjoy collaborating in real-time with your team!
