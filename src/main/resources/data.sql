-- Datos de prueba para Conductores
INSERT INTO conductores (dni, nombre, apellido, email, telefono, direccion, fecha_nacimiento, numero_licencia, fecha_vencimiento_licencia, puntos_licencia, licencia_habilitada, fecha_creacion, fecha_actualizacion)
VALUES
('12345678', 'Juan', 'Perez', 'juan.perez@email.com', '1134567890', 'Av. Libertador 1234, CABA', '1985-05-15', 'LIC123456', '2026-12-31', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('87654321', 'Maria', 'Gonzalez', 'maria.gonzalez@email.com', '1145678901', 'Calle Corrientes 456, CABA', '1990-08-22', 'LIC654321', '2026-11-30', 18, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('11223344', 'Carlos', 'Rodriguez', 'carlos.rodriguez@email.com', '1156789012', 'San Martin 789, CABA', '1988-03-10', 'LIC112233', '2026-06-30', 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('55667788', 'Ana', 'Martinez', 'ana.martinez@email.com', '1167890123', 'Av. Santa Fe 2100, CABA', '1992-11-05', 'LIC556677', '2026-09-15', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('99887766', 'Luis', 'Fernandez', 'luis.fernandez@email.com', '1178901234', 'Av. Rivadavia 5678, CABA', '1987-01-20', 'LIC998877', '2026-03-20', 12, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('44556677', 'Laura', 'Lopez', 'laura.lopez@email.com', '1189012345', 'Belgrano 890, CABA', '1995-06-30', 'LIC445566', '2025-12-10', 8, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de prueba para Vehiculos
INSERT INTO vehiculos (patente, marca, modelo, anio, color, tipo, conductor_id, fecha_creacion, fecha_actualizacion)
VALUES
('ABC123', 'Toyota', 'Corolla', 2020, 'Blanco', 'AUTOMOVIL', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('XYZ789', 'Honda', 'Civic', 2019, 'Negro', 'AUTOMOVIL', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DEF456', 'Yamaha', 'YBR 125', 2021, 'Rojo', 'MOTOCICLETA', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GHI789', 'Ford', 'Ranger', 2022, 'Azul', 'CAMIONETA', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('JKL012', 'Chevrolet', 'Onix', 2023, 'Gris', 'AUTOMOVIL', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MNO345', 'Volkswagen', 'Amarok', 2021, 'Verde', 'CAMIONETA', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PQR678', 'Honda', 'Wave', 2020, 'Negro', 'MOTOCICLETA', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('STU901', 'Fiat', 'Cronos', 2022, 'Rojo', 'AUTOMOVIL', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('VWX234', 'Renault', 'Sandero', 2019, 'Blanco', 'AUTOMOVIL', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('YZA567', 'Peugeot', '208', 2023, 'Azul', 'AUTOMOVIL', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Datos de prueba para Infracciones
INSERT INTO infracciones (codigo, descripcion, gravedad, puntos_descontados, monto, ubicacion, latitud, longitud, conductor_id, vehiculo_id, estado, fecha_infraccion, fecha_vencimiento_pago, observaciones, fecha_creacion, fecha_actualizacion)
VALUES
('INF001', 'Exceso de velocidad en zona escolar', 'GRAVE', 5, 8500.00, 'Av. 9 de Julio y Corrientes', -34.6037, -58.3816, 1, 1, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Detectado por radar automatico a 80 km/h en zona de 40 km/h', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF002', 'Estacionamiento prohibido', 'LEVE', 2, 3000.00, 'Av. Corrientes 1500', -34.6037, -58.3816, 2, 2, 'PAGADA', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Zona de carga y descarga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF003', 'Circular sin casco', 'GRAVE', 5, 8000.00, 'Av. Libertador 3000', -34.5755, -58.4154, 3, 3, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Conductor en motocicleta sin elementos de seguridad', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF004', 'No respetar semaforo en rojo', 'MUY_GRAVE', 8, 15000.00, 'Av. Cabildo y Juramento', -34.5598, -58.4513, 5, 6, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 15, CURRENT_TIMESTAMP), 'Infraccion grave registrada por camara', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF005', 'Uso de celular mientras conduce', 'GRAVE', 4, 6500.00, 'Av. Santa Fe 3200', -34.5965, -58.4028, 4, 5, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Conductor utilizando telefono celular sin manos libres', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF006', 'Exceso de velocidad leve', 'LEVE', 2, 4000.00, 'Autopista 25 de Mayo', -34.6158, -58.3715, 1, 4, 'PAGADA', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Velocidad 85 km/h en zona de 70 km/h', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF007', 'Estacionamiento en lugar reservado discapacitados', 'GRAVE', 6, 10000.00, 'Shopping Dot Baires', -34.5461, -58.4494, 6, 7, 'VENCIDA', DATEADD(DAY, -45, CURRENT_TIMESTAMP), DATEADD(DAY, -15, CURRENT_TIMESTAMP), 'Sin autorizacion para estacionar en lugar reservado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF008', 'Conducir sin licencia vigente', 'MUY_GRAVE', 10, 20000.00, 'Av. General Paz y Constituyentes', -34.5870, -58.4981, 6, 7, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 10, CURRENT_TIMESTAMP), 'Licencia vencida hace 6 meses', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF009', 'No respetar paso peatonal', 'GRAVE', 5, 7500.00, 'Av. Callao y Santa Fe', -34.5955, -58.3923, 2, 8, 'ANULADA', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Infraccion anulada por apelacion exitosa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF010', 'Giro indebido en U', 'LEVE', 3, 4500.00, 'Av. Libertador altura 4500', -34.5456, -58.4331, 3, 9, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Maniobra prohibida en zona señalizada', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF011', 'Adelantamiento indebido', 'GRAVE', 6, 9000.00, 'Ruta 2 Km 45', -34.8765, -58.0234, 5, 6, 'PAGADA', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Adelantamiento en curva con linea continua', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('INF012', 'Falta de luces reglamentarias', 'LEVE', 2, 3500.00, 'Av. Rivadavia 8900', -34.6372, -58.4396, 4, 10, 'PENDIENTE', CURRENT_TIMESTAMP, DATEADD(DAY, 30, CURRENT_TIMESTAMP), 'Vehiculo circulando de noche sin luces bajas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
