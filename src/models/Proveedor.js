// src/models/Proveedor.js
export class Proveedor {
  constructor(nombreProveedor, productoOfrecido, telefono) {
    this.nombreProveedor = nombreProveedor;
    this.productoOfrecido = productoOfrecido;
    this.telefono = telefono;
  }

  // Validar datos
  validarDatos() {
    return (
      this.nombreProveedor.trim() &&
      this.productoOfrecido.trim() &&
      this.telefono.trim()
    );
  }
}
