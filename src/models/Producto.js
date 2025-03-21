// src/models/Producto.js
export class Producto {
  constructor(
    nombreProducto,
    categoria,
    descripcion,
    unidadesDisponibles,
    precioVenta
  ) {
    this.nombreProducto = nombreProducto;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.unidadesDisponibles = parseInt(unidadesDisponibles);
    this.precioVenta = parseFloat(precioVenta);
  }
}
