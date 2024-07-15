# Social Media Platform

This is a social media platform built using Express.js and MongoDB. It allows users to create posts, like/unlike posts, comment on posts, and manage their user profiles.

## Features

- User authentication with JWT
- CRUD operations for posts
- Like/unlike functionality for posts
- Commenting on posts
- Basic error handling and validation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- JWT for authentication

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

```
git clone https://github.com/Yasinj05/social-media-platform.git
```

2. Navigate to the project directory:

```
cd social-media-platform
```

3. Install dependencies:

```
npm install
```

4. Set up environment variables:

Create a `.env` file in the root of the project and add the following:

```
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=your_mongodb_uri
PORT=your-port
```

5. Start the server:

```
npm run start
```

## API Endpoints

### Authentication

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`

### Posts

- **Create Post**: `POST /api/posts` (Protected)
- **Get All Posts**: `GET /api/posts`
- **Get Post by ID**: `GET /api/posts/:id`
- **Delete Post**: `DELETE /api/posts/:id` (Protected)
- **Like Post**: `PUT /api/posts/like/:id` (Protected)
- **Unlike Post**: `PUT /api/posts/unlike/:id` (Protected)
- **Comment on Post**: `POST /api/posts/comment/:id` (Protected)
- **Delete Comment**: `DELETE /api/posts/comment/:id/:comment_id` (Protected)

### Example API Requests

#### Headers

Make sure to include the `x-auth-token` header for protected routes:

```
{
  "Authorization": "Bearer your_jwt_token"
}
```

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
