create database ingenieriasoftware;
use ingenieriasoftware;


# ENTIDAD: USUARIO
create table if not exists `usuario` (
	`ID` int auto_increment not null comment 'Clave primaria',
    `Nombre` varchar(50) not null comment 'Nombre del usuario',
    `Usuario` varchar(50) not null comment 'Usuario para inicio de seccion',
    `Password` varchar(255) not null comment 'Contraseña para inicio de seccion',
    `Role` varchar(50) not null comment 'Rol del usuario',
    `Activo` boolean not null comment 'Estado del usuario',
    primary key (`ID`),
    unique key `Usuario`(`Usuario`)
) ENGINE=INNODB;

# ENTIDAD: PROVEEDOR
create table if not exists `proveedor` (
	`ID` int auto_increment not null comment 'Clave primaria',
	`RNC` varchar(50) not null comment 'Identificador propio de los proveedores',
    `Nombre` varchar(50) not null comment 'Nombre del proveedor',
    `Telefono` varchar(255) not null comment 'Telefono del proveedor',
    `Direccion` varchar(255) not null comment 'Direccion del proveedor',
    `Activo` boolean not null comment 'Estado del proveedor',
    primary key(`ID`),
    unique key `RNC`(`RNC`)
) ENGINE=INNODB;

# ENTIDAD: CLIENTE
create table if not exists `cliente` (
	`ID` int auto_increment not null comment 'Clave primaria',
	`Cedula` varchar(50) null comment 'Identificador propio de los clientes',
    `Nombre` varchar(50) not null comment 'Nombre del cliente',
    `Telefono` varchar(255) not null comment 'Telefono del cliente',
    `Direccion` varchar(255) not null comment 'Direccion del cliente',
    `Activo` boolean not null comment 'Estado del cliente',
    primary key(`ID`),
    unique key `Cedula`(`Cedula`)
) ENGINE=INNODB;


# ENTIDAD: PRODUCTO
create table if not exists `producto` (
	`ID` int auto_increment not null comment 'Clave primaria',
	`CodigoBarra` varchar(50) not null comment 'Identificador propio de los productos',
    `Cantidad` float not null comment 'Cantidad del producto',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto',
    `FechaCreacion` date not null comment 'Fecha creacion del producto',
    `FechaModificacion` date not null comment 'Ultima fecha de modificacion del producto',
    `Categoria` varchar(50) not null comment 'Categoria del producto',
    `Origen` varchar(50) not null comment 'Categoria del producto',
    `Costo` varchar(50) not null comment 'Costo del producto',
    `Activo` boolean not null comment 'Estado del producto',
    primary key(`ID`),
    unique key `CodigoBarra`(`CodigoBarra`)
) ENGINE=INNODB;


# ENTIDAD: PRECIOS
create table if not exists `precio` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `productoID` int not null comment 'Relacion con el producto',
    `Precio` float not null comment 'Precio del producto',
    `Impuesto` float not null comment 'Impuestos del producto',
    `Categoria` varchar(50) not null comment 'Categoria del producto',
    primary key(`ID`),
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: PEDIDO
create table if not exists `pedido` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion del pedido',
    `FechaModificacion` date not null comment 'Ultima fecha de modificacion del pedido',
    `Vendedor` varchar(50) not null comment 'Vendedor del pedido',
    `clienteID` int not null comment 'Cliente del pedido', 
    primary key(`ID`)
) ENGINE=INNODB;

# ENTIDAD: PRODUCTO-PEDIDO
create table if not exists `producto-pedido` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `CodigoBarra` varchar(50) not null comment 'Identificador propio de los producto-pedido',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto-pedido',
    `Cantidad` float not null comment 'Cantidad del producto-pedido',
    `Categoria` varchar(50) not null comment 'Razon del producto-pedido',
    `productoID` int not null comment 'Relacion con el producto', 
    `pedidoID` int not null comment 'Relacion con el producto',   
    primary key(`ID`),
    foreign key (`pedidoID`) references `pedido`(`ID`) on delete cascade,
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;