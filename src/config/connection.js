"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';
// Conexión a MongoDB
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Eventos para verificar el estado de la conexión
mongoose_1.default.connection.on('connected', () => {
    console.log('✅ Conectado a la base de datos MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error(`❌ Error en la conexión a MongoDB: ${err}`);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('⚠️ Desconectado de MongoDB');
});
// Exportar la conexión para usar en server.ts
exports.default = mongoose_1.default.connection;
