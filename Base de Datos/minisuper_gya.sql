-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-01-2023 a las 21:12:42
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `minisuper_gya`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodega`
--

CREATE TABLE `bodega` (
  `IDBodega` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bodega`
--

INSERT INTO `bodega` (`IDBodega`) VALUES
(2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `IDInventario` int(11) NOT NULL,
  `nombre` varchar(16) NOT NULL,
  `IDBodega` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`IDInventario`, `nombre`, `IDBodega`) VALUES
(2, 'inventario1', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `IDProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `codigoBarra` varchar(32) NOT NULL,
  `codigoCabys` varchar(32) NOT NULL,
  `iva` float NOT NULL,
  `nombre` varchar(16) NOT NULL,
  `precio` int(11) NOT NULL,
  `IDBodega` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`IDProducto`, `cantidad`, `codigoBarra`, `codigoCabys`, `iva`, `nombre`, `precio`, `IDBodega`) VALUES
(48, 36, '111', '111', 0.13, 'coca cola 1l', 1500, 2),
(49, 35, '222', '222', 0.13, 'fideos', 1000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoxventa`
--

CREATE TABLE `productoxventa` (
  `IDProductoXVenta` int(11) NOT NULL,
  `IDProducto` int(11) NOT NULL,
  `IDVenta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productoxventa`
--

INSERT INTO `productoxventa` (`IDProductoXVenta`, `IDProducto`, `IDVenta`, `cantidad`) VALUES
(1, 49, 10, 2),
(2, 48, 11, 1),
(3, 49, 11, 2),
(4, 48, 12, 1),
(5, 49, 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IDUsuario` int(11) NOT NULL,
  `usuario` varchar(16) NOT NULL,
  `contraseña` varchar(64) NOT NULL,
  `tipoUsuario` varchar(16) NOT NULL DEFAULT '0',
  `IDInventario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IDUsuario`, `usuario`, `contraseña`, `tipoUsuario`, `IDInventario`) VALUES
(1, 'admin', 'U2FsdGVkX1/OYN07UHvAJPxiIGrJw6UB34SixS7iS9k=', 'ADMIN', 2),
(17, 'reds', 'U2FsdGVkX199yh4YbER/1+9uqjWqEeaTtZYQhLTIqNQ=', 'EMPLEADO', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `IDVenta` int(11) NOT NULL,
  `fecha` varchar(64) NOT NULL,
  `descuento` int(11) NOT NULL DEFAULT 0,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `monto` int(11) NOT NULL,
  `metodo` varchar(16) NOT NULL DEFAULT '0',
  `IDInventario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`IDVenta`, `fecha`, `descuento`, `cantidad`, `monto`, `metodo`, `IDInventario`) VALUES
(10, 'Mon Jan 02 2023 14:06:40 GMT-0600 (hora estándar central)', 0, 2, 2000, 'EFECTIVO', 2),
(11, 'Mon Jan 02 2023 14:07:29 GMT-0600 (hora estándar central)', 0, 3, 3500, 'EFECTIVO', 2),
(12, 'Mon Jan 02 2023 14:09:03 GMT-0600 (hora estándar central)', 0, 2, 2500, 'EFECTIVO', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD PRIMARY KEY (`IDBodega`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`IDInventario`),
  ADD UNIQUE KEY `IDBodega` (`IDBodega`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`IDProducto`),
  ADD UNIQUE KEY `codigoBarra` (`codigoBarra`),
  ADD UNIQUE KEY `codigoCabys` (`codigoCabys`),
  ADD KEY `fk_producto_idbodega` (`IDBodega`);

--
-- Indices de la tabla `productoxventa`
--
ALTER TABLE `productoxventa`
  ADD PRIMARY KEY (`IDProductoXVenta`),
  ADD KEY `fk_productoxventa_idventa` (`IDVenta`),
  ADD KEY `fk_productoxventa_idproducto` (`IDProducto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDUsuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `fk_usuario_idinventario` (`IDInventario`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`IDVenta`),
  ADD KEY `fk_venta_idinventario` (`IDInventario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodega`
--
ALTER TABLE `bodega`
  MODIFY `IDBodega` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `IDInventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `IDProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `productoxventa`
--
ALTER TABLE `productoxventa`
  MODIFY `IDProductoXVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `IDVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `fk_inventario_idbodega` FOREIGN KEY (`IDBodega`) REFERENCES `bodega` (`IDBodega`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_idbodega` FOREIGN KEY (`IDBodega`) REFERENCES `bodega` (`IDBodega`);

--
-- Filtros para la tabla `productoxventa`
--
ALTER TABLE `productoxventa`
  ADD CONSTRAINT `fk_productoxventa_idproducto` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`IDProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_productoxventa_idventa` FOREIGN KEY (`IDVenta`) REFERENCES `venta` (`IDVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_idinventario` FOREIGN KEY (`IDInventario`) REFERENCES `inventario` (`IDInventario`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `fk_venta_idinventario` FOREIGN KEY (`IDInventario`) REFERENCES `inventario` (`IDInventario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
