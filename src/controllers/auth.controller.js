import authService from '../services/auth.service.js';
import { generateToken } from '../utils/token-generator.js';
import bcrypt from 'bcrypt';

export async function register(req, res) {
  const { email, password, nombre, apellido, dni, telefono } = req.body;

  const camposFaltantes = [];
  if (!email) camposFaltantes.push('email');
  if (!password) camposFaltantes.push('password');
  if (!nombre) camposFaltantes.push('nombre');
  if (!apellido) camposFaltantes.push('apellido');
  if (!dni) camposFaltantes.push('dni');
  if (!telefono) camposFaltantes.push('telefono');

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos requeridos',
      campos: camposFaltantes
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await authService.registerUser({ email, password: hashedPassword, nombre, apellido, dni, telefono });
    if (!user) return res.status(409).json({ error: 'Usuario ya existe' });

    const token = generateToken({ email: user.email });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function me(req, res) {
  try {
    const { email } = req.user;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    console.log("Login recibido:", req.body); // 👈 Log para depurar
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = generateToken({ email: user.email });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
