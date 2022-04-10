create database ingenieriasoftware;
use ingenieriasoftware;

select * from pedido;
select * from `historial-pago`;
select * from `producto-pedido`;
select * from devolucion;
select * from compra;
select * from producto;
select * from `producto-devolucion`;
select * from `producto-compra`;
select * from `producto-nota-debito`;
select * from `nota-debito`;

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
    `Costo` float not null comment 'Costo del producto',
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
    `Estado` varchar(50) not null comment 'Estado del pedido',
    `Pagado` boolean not null comment 'Estado de pago del pedido',
    `Vendedor` varchar(50) not null comment 'Vendedor del pedido',
    `clienteID` int not null comment 'Cliente del pedido', 
    primary key(`ID`),
    foreign key (`clienteID`) references `cliente`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: PRODUCTO-PEDIDO
create table if not exists `producto-pedido` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion del producto-pedido',
    `CodigoBarra` varchar(50) not null comment 'Identificador propio de los producto-pedido',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto-pedido',
    `Cantidad` float not null comment 'Cantidad del producto-pedido',
    `Precio` float not null comment 'Precio del producto-pedido',
    `Costo` float not null comment 'Costo del producto-pedido',
    `Impuesto` float not null comment 'Impuesto del producto-pedido',
    `productoID` int not null comment 'Relacion con el producto', 
    `pedidoID` int not null comment 'Relacion con el producto',   
    primary key(`ID`),
    foreign key (`pedidoID`) references `pedido`(`ID`) on delete cascade,
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: DEVOLUCION
create table if not exists `devolucion` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion de la devolucion',
    `Pagado` boolean not null comment 'Estado de pago de la devolucion',
    `Vendedor` varchar(50) not null comment 'Vendedor de la devolucion',
    `clienteID` int not null comment 'Cliente de la devolucion', 
    primary key(`ID`),
    foreign key (`clienteID`) references `cliente`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: PRODUCTO-DEVOLUCION
create table if not exists `producto-devolucion` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion del producto-devolucion',
    `CodigoBarra` varchar(50) not null comment 'Identificador propio de los producto-devolucion',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto-devolucion',
    `Cantidad` float not null comment 'Cantidad del producto-devolucion',
    `Precio` float not null comment 'Precio del producto-devolucion',
    `Costo` float not null comment 'Costo del producto-devolucion',
    `Impuesto` float not null comment 'Impuesto del producto-devolucion',
    `productoID` int not null comment 'Relacion con el producto', 
    `devolucionID` int not null comment 'Relacion con la devolucion',   
    primary key(`ID`),
    foreign key (`devolucionID`) references `devolucion`(`ID`) on delete cascade,
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;


# ENTIDAD: NOTA-DEBITO
create table if not exists `nota-debito` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion de la compra',
    `Comprador` varchar(50) not null comment 'Vendedor de la compra',
    `proveedorID` int not null comment 'Proveedor de la compra', 
    primary key(`ID`),
    foreign key (`proveedorID`) references `proveedor`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: PRODUCTO-NOTA-DEBITO
create table if not exists `producto-nota-debito` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion del producto-nota-debito',
    `CodigoBarra` varchar(50) not null comment 'Identificador propio de los producto-nota-debito',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto-nota-debito',
    `Cantidad` float not null comment 'Cantidad del producto-nota-debito',
    `Costo` float not null comment 'Costo del producto-nota-debito',
    `productoID` int not null comment 'Relacion con el producto', 
    `notaDebitoID` int not null comment 'Relacion con la nota-debito',   
    primary key(`ID`),
    foreign key (`notaDebitoID`) references `nota-debito`(`ID`) on delete cascade,
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;






# ENTIDAD: COMPRAS
create table if not exists `compra` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion de la compra',
    `Pagado` boolean not null comment 'Estado de pago de la compra',
    `Comprador` varchar(50) not null comment 'Vendedor de la compra',
    `Termino` varchar(255) not null comment 'Termino de la compra',
    `proveedorID` int not null comment 'Proveedor de la compra', 
    primary key(`ID`),
    foreign key (`proveedorID`) references `proveedor`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: PRODUCTO-COMPRA
create table if not exists `producto-compra` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `FechaCreacion` date not null comment 'Fecha creacion del producto-compra',
    `CodigoBarra` varchar(50) not null comment 'Identificador propio de los producto-compra',
    `Descripcion` varchar(50) not null comment 'Descripcion del producto-compra',
    `Cantidad` float not null comment 'Cantidad del producto-compra',
    `Costo` float not null comment 'Costo del producto-compra',
    `productoID` int not null comment 'Relacion con el producto', 
    `compraID` int not null comment 'Relacion con la compra',   
    primary key(`ID`),
    foreign key (`compraID`) references `compra`(`ID`) on delete cascade,
    foreign key (`productoID`) references `producto`(`ID`) on delete cascade
) ENGINE=INNODB;

# ENTIDAD: historialPagos
create table if not exists `historial-pago` (
    `ID` int auto_increment not null comment 'Clave primaria',
    `Fecha` date not null comment 'Fecha creacion del pago',
    `Descripcion` varchar(500) not null comment 'Vendedor del pedido',
    `Termino` int not null comment 'Terminos de la deuda',
    `PagoMinimo` float not null comment 'Terminos de la deuda',
    `SaldoPendiente` float not null comment 'Terminos de la deuda',
    `SaldoPagado` float not null comment 'Terminos de la deuda',
    `Pendiente` boolean not null comment 'Terminos de la deuda',
    `Vendedor` varchar(50) not null comment 'Vendedor del pedido',
    `clienteID` int not null comment 'Cliente de la deduda', 
    `pedidoID` int not null comment 'Pedido de la deuda', 
    primary key(`ID`),
    foreign key (`clienteID`) references `cliente`(`ID`) on delete cascade,
    foreign key (`pedidoID`) references `pedido`(`ID`) on delete cascade
) ENGINE=INNODB;