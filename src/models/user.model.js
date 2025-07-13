import { db } from '../config/db.js';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const usuariosRef = collection(db, 'usuarios');

export const createUser = async (userData) => {
  // Validar y normalizar campos antes de guardar
  const user = {
    email: String(userData.email),
    password: String(userData.password),
    nombre: String(userData.nombre),
    apellido: String(userData.apellido),
    dni: Number(userData.dni),
    telefono: String(userData.telefono),
  };

  // Opcional: validar que no sean undefined o null
  for (const [key, value] of Object.entries(user)) {
    if (value === undefined || value === null || value === '') {
      throw new Error(`Campo ${key} inválido o faltante`);
    }
  }

  const docRef = await addDoc(usuariosRef, user);
  return { id: docRef.id, ...user };
};

export const getUserByEmail = async (email) => {
  const q = query(usuariosRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};
