import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

// Rutas de la API
app.use('/api/users', require('./routes/userRouters'));
app.use('/api/thoughts',  require('./routes/thoughtRoutes'));

// Verificar conexión a la base de datos
mongoose.connection.once('open', () => {
  console.log('Conectado a la base de datos MongoDB');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});