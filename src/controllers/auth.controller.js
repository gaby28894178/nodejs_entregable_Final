import { generateToken } from '../utils/token-generator.js'; 

// el objeto siguiente deberia ser  evaluado comparado con la db de  usuarios de  firebase
// para verificar si el usuario existe y si la contraseña es correcta  
// para generar el token 
 
const default_user = { 
  id: 1, 
  email: "user@email.com", 
  password: "strongPass123" 
} 

export async function login(req, res) { 
    const { email, password } = req.body; 

    // Aquí deberías verificar las credenciales del usuario 
    if (!email || !password) {
        return res.status(400).json({
            message: "Campos requeridos",
            error: "Debe proporcionar un email y una contraseña"
        });
    }
    // Ejemplo de usuario autenticado 
     const user = { id: 1, email };  
    if (email === default_user.email  
       && password === default_user.password) { 
        const token = generateToken(user); 
        console.log(token)
        res.json({token})
    }
    else{
        res.sendStatus(401);
    }
}

export async function register(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: "Campos requeridos",
            error: "Debe proporcionar un email y una contraseña"
        });
    }

    // Aquí deberías implementar la lógica para registrar el usuario en Firebase
    // Por ahora, simulamos el registro
    const user = { id: Date.now(), email };
    const token = generateToken(user);
    
    res.json({
        token,
        user: {
            id: user.id,
            email: user.email
        }
    });
}

export async function logout(req, res) {
    // En una implementación real, aquí invalidarías el token
    // o marcarías la sesión como cerrada
    res.json({ message: "Sesión cerrada correctamente" });
}

export async function me(req, res) {
    // Aquí deberías obtener los datos del usuario de Firebase
    // Por ahora, simulamos obteniendo los datos del token
    const user = req.user; // El middleware de autenticación debería agregar esto
    
    res.json({
        id: user.id,
        email: user.email
    });
}

// Middleware de autenticación
export async function authentication(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No autorizado" });
        }
        
        // Aquí deberías verificar el token con Firebase
        // Por ahora, simulamos la verificación
        const user = { id: 1, email: "user@email.com" };
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "No autorizado", error });
    }
}