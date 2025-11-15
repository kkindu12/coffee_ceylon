# Create .env File

Since .env files are typically ignored by git, you need to create it manually.

## Steps:

1. Navigate to the `backend` directory
2. Create a new file named `.env` (with the dot at the beginning)
3. Copy and paste the following content:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/coffee_ceylon
NODE_ENV=development
```

## For Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/coffee_ceylon
```

## For MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coffee_ceylon
```
Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

## After creating .env:

1. Test the connection:
   ```bash
   npm run test-connection
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

3. Check database status:
   Visit: http://localhost:3000/api/health

