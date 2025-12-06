- **Express 5** API boilerplate
- **MongoDB + Mongoose 9** for schema modeling
- **JWT authentication support**
- **Security best practices**
  - Helmet
  - CORS
  - Rate limiting
  - Cookie parsing
  - Compression

- **Prettier + ESLint 9** for clean and consistent code
- **Pino (Pretty)** for fast JSON logging
- **Environment-based config**
- **Nodemon** for development live-reload

## **Installation**

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment config

Create a `.env` file in the root:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-secret-key
```

---

## **Running the Project**

### **Development**

```bash
npm run dev
```

Starts server with **nodemon** + logging.

### **Production**

```bash
npm start
```

---

## **Linting & Formatting**

### Check lint issues

```bash
npm run lint
```

### Auto-format code

```bash
npm run format
```

---

## **Testing**

Currently no test runner is configured.

To add test support later, recommended scaffolding:

- **Jest** for unit tests
- **Supertest** for API endpoint testing

---
