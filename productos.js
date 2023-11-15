document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado");

    let carrito = [];
    const detalleCompra = document.getElementById("detalleCompra");
    const carritoItems = document.getElementById("carritoItems");
    const totalCarrito = document.getElementById("totalCarrito");
    const finalizarCompraButton = document.getElementById("finalizarCompra");
    const productDisplay = document.getElementById("productDisplay");
    const cancelarCompraButton = document.getElementById("cancelarCompra");

    const productos = [
        { nombre: "Cama 1", precio: 4200, imagen: "imagenProducto/camasupercolchon-1.jpg", descripcion: "Aqui va la descripción del producto"},
        { nombre: "Cama 2", precio: 4200, imagen: "imagenProducto/camasupercolchon-1.jpg", descripcion: "Aqui va la descripción del producto" },
        { nombre: "Cama 3", precio: 4200, imagen: "imagenProducto/camasupercolchon-1.jpg", descripcion: "Aqui va la descripción del producto" },
        { nombre: "Cama 4", precio: 4200, imagen: "imagenProducto/camasupercolchon-1.jpg", descripcion: "Aqui va la descripción del producto"},

        // Agrega los demás productos aquí
    ];
    
    const datosTarjeta = document.getElementById("datosTarjeta");
    const datosEfectivo = document.getElementById("datosEfectivo");
    const enviarDatosTarjeta = document.getElementById("enviarDatosTarjeta");
    const enviarDatosEfectivo = document.getElementById("enviarDatosEfectivo");

    const formaDePago = document.getElementById('formaDePago');
    formaDePago.addEventListener('change', function () {
        const datosTarjeta = document.getElementById("datosTarjeta");
        const datosEfectivo = document.getElementById("datosEfectivo");

        if (this.value === 'tarjetaCredito') {
            mostrarDatosTarjeta(datosTarjeta, datosEfectivo);
        } else if (this.value === 'efectivo') {
            mostrarDatosEfectivo(datosEfectivo, datosTarjeta);
        }
    });

    enviarDatosTarjeta.addEventListener('click', function () {
        const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();
        const nombreTitular = document.getElementById("nombreTitular").value.trim();
        const numeroCvv = document.getElementById("numeroCvv").value.trim();
        const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
        console.log('Datos de tarjeta enviados:', numeroTarjeta, nombreTitular, numeroCvv, numeroDocumento);
    });

    enviarDatosEfectivo.addEventListener('click', function () {
        const generarCupon = document.getElementById("generarCupon").checked;
        const tiempoLimite = document.getElementById("tiempoLimite").value.trim();
        console.log('Detalles de efectivo enviados:', generarCupon, tiempoLimite);
    });

    function agregarAlCarrito(productName) {
        console.log("Función agregarAlCarrito");
        const productoEnCarrito = carrito.find(producto => producto.nombre === productName);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            carrito.push({ nombre: productName, cantidad: 1, precio: 4200 });
        }

        detalleCompra.style.display = 'block';
        actualizarDetalleCompra();
    }

    function mostrarDatosTarjeta(elementoAMostrar, elementoAOcultar) {
        elementoAMostrar.style.display = 'block';
        elementoAOcultar.style.display = 'none';
    }

    function mostrarDatosEfectivo(elementoAMostrar, elementoAOcultar) {
        elementoAMostrar.style.display = 'block';
        elementoAOcultar.style.display = 'none';
    }

    function actualizarDetalleCompra() {
        carritoItems.innerHTML = '';

        carrito.forEach(producto => {
            const item = document.createElement("li");
            const img = new Image();
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.width = 70; // Ancho de la imagen en miniatura
        
            const nombreProducto = document.createElement("span");
            nombreProducto.textContent = `${producto.nombre} x ${producto.cantidad}`;
        
            item.appendChild(img);
            item.appendChild(document.createElement("br")); // Agrega un salto de línea
            item.appendChild(nombreProducto);
        
            carritoItems.appendChild(item);
        });

        const total = carrito.reduce((sum, producto) => sum + producto.cantidad * producto.precio, 0);
        totalCarrito.textContent = `$${total.toFixed(2)}`;

        // Habilitar el botón cuando haya productos en el carrito
        finalizarCompraButton.disabled = carrito.length === 0;
    }

    cancelarCompraButton.addEventListener('click', function () {
        carrito = [];
        detalleCompra.style.display = 'none';
        actualizarDetalleCompra();
    });

    finalizarCompraButton.disabled = true; // Deshabilitar el botón inicialmente

    finalizarCompraButton.addEventListener('click', function () {
        if (carrito.length > 0) {
            // Validar información del cliente antes de mostrar el alert
            const nombreCliente = document.getElementById("nombreCliente").value.trim();
            const clienteEmail = document.getElementById("clienteEmail").value.trim();
            const direccion = document.getElementById("direccionCliente").value.trim();
            const formaDePago = document.getElementById("formaDePago").value;
            const metodoEnvio = document.getElementById("metodoEnvio").value;

            if (nombreCliente && clienteEmail && direccion && formaDePago && metodoEnvio) {
                alert("¡Compra realizada con éxito!");
                carrito = [];
                detalleCompra.style.display = 'none';
                actualizarDetalleCompra();
            } else {
                alert("Completa todos los campos antes de finalizar la compra.");
            }
        } else {
            alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        }
    });

    window.addEventListener('click', function (event) {
        if (event.target === detalleCompra) {
            detalleCompra.style.display = 'none';
        }
    });

    // Generar y mostrar los elementos HTML de los productos
    productos.forEach(producto => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button class="agregarAlCarrito" data-product="${producto.nombre}">Agregar al carrito</button>
            <input type="number" min="1" value="1" class="cantidadProducto" />
        `;
        productDisplay.appendChild(productElement);

        // Agregar evento de clic al botón generado
        const agregarAlCarritoButton = productElement.querySelector('.agregarAlCarrito');
        const cantidadProductoInput = productElement.querySelector('.cantidadProducto');

        agregarAlCarritoButton.addEventListener('click', function () {
            const productName = this.dataset.product;
            console.log(`Producto agregado al carrito: ${productName}`);
            agregarAlCarrito(productName);
        });

        cantidadProductoInput.addEventListener('change', function () {
            const productName = this.parentElement.querySelector('h4').textContent;
            const newQuantity = parseInt(this.value);
            
            const productoEnCarrito = carrito.find(producto => producto.nombre === productName);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad = newQuantity;
                actualizarDetalleCompra();
            }
        });
    });

    const formularioCompra = document.getElementById('detalleCompra');
    const direccionDomicilio = document.getElementById('direccionDomicilio');
    const direccionSucursal = document.getElementById('direccionSucursal');
    const metodoEnvio = document.getElementById('metodoEnvio');

    metodoEnvio.addEventListener('change', function () {
        if (this.value === 'retiroSucursal') {
            direccionDomicilio.style.display = 'none';
            direccionSucursal.style.display = 'block';
        } else {
            direccionDomicilio.style.display = 'block';
            direccionSucursal.style.display = 'none';
        }

        if (this.value === 'retiroSucursal') {
            if (formularioCompra.contains(direccionDomicilio)) {
                direccionDomicilio.style.display = 'none';
                direccionSucursal.style.display = 'block';
            } else {
                formularioCompra.insertBefore(direccionSucursal, metodoEnvio.nextSibling);
            }
        } else {
            if (formularioCompra.contains(direccionDomicilio)) {
                direccionDomicilio.style.display = 'block';
                direccionSucursal.style.display = 'none';
            }
        }
    });
});


