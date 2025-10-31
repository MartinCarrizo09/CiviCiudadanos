-- Datos de prueba para Conductores
INSERT INTO conductores (dni, nombre, apellido, email, telefono, direccion, fecha_nacimiento, numero_licencia, fecha_vencimiento_licencia, puntos_licencia, licencia_habilitada, fecha_creacion, fecha_actualizacion)
VALUES
('12345678', 'Juan', 'Pérez', 'juan.perez@email.com', '1234567890', 'Av. Libertador 1234, CABA', '1985-05-15', 'LIC123456', '2025-12-31', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('87654321', 'María', 'González', 'maria.gonzalez@email.com', '0987654321', 'Calle Falsa 456, CABA', '1990-08-22', 'LIC654321', '2025-11-30', 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11223344', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '1122334455', 'San Martín 789, CABA', '1988-03-10', 'LIC112233', '2024-06-30', 10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de prueba para Vehículos
INSERT INTO vehiculos (patente, marca, modelo, anio, color, tipo, conductor_id, fecha_creacion, fecha_actualizacion)
VALUES
('ABC123', 'Toyota', 'Corolla', 2020, 'Blanco', 'AUTOMOVIL', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('XYZ789', 'Honda', 'Civic', 2019, 'Negro', 'AUTOMOVIL', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DEF456', 'Yamaha', 'YBR 125', 2021, 'Rojo', 'MOTOCICLETA', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GHI789', 'Ford', 'Ranger', 2022, 'Azul', 'CAMIONETA', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de prueba para Infracciones
INSERT INTO infracciones (codigo, descripcion, gravedad, puntos_descontados, monto, ubicacion, latitud, longitud, conductor_id, vehiculo_id, estado, fecha_infraccion, fecha_vencimiento_pago, observaciones, fecha_creacion, fecha_actualizacion)
VALUES
('INF001', 'Exceso de velocidad', 'LEVE', 3, 5000.00, 'Av. 9 de Julio y Corrientes', -34.6037, -58.3816, 1, 1, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD('DAY', 30, CURRENT_TIMESTAMP), 'Detectado por radar automático', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF002', 'Estacionamiento prohibido', 'LEVE', 2, 3000.00, 'Av. Corrientes 1500', -34.6037, -58.3816, 2, 2, 'PAGADA', CURRENT_TIMESTAMP, DATEADD('DAY', 30, CURRENT_TIMESTAMP), 'Zona de carga y descarga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF003', 'Circular sin casco', 'GRAVE', 5, 8000.00, 'Av. Libertador 3000', -34.5755, -58.4154, 3, 3, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD('DAY', 30, CURRENT_TIMESTAMP), 'Conductor en motocicleta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
