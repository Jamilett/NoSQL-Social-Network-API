import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

// Eventos para verificar el estado de la conexión
mongoose.connection.on('connected', () => {
  console.log('✅ Conectado a la base de datos MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Error en la conexión a MongoDB: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Desconectado de MongoDB');
});

// Exportar la conexión para usar en server.ts
export default mongoose.connection;