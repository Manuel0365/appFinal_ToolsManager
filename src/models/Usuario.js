// src/models/Usuario.js
export class Usuario {
  constructor(correo, contrasena) {
    this.correo = correo;
    this.contrasena = contrasena;
  }

  // Podrías agregar validaciones específicas aquí, por ejemplo:
  validarCorreo() {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(this.correo);
  }
}
