const path = window.location.pathname;

let Nicho = path.split('/')[path.split('/').length - 1];

const Nichos = {
    'hogar.html':'Hogar',
    'tecnologia.html':'Tecnologia',
    'belleza.html':'Belleza'
}

Nicho = Nichos[Nicho];

const main = document.querySelector("main");

const section = document.querySelector('main section');

var productos = Productos[Nicho];

for(let i=0; i< productos.length;i++){
    const producto = productos[i];
    const article = document.createElement("article");
    
    const link = document.createElement('a');
    link.href = `../producto.html?Categoria=${encodeURIComponent(Nicho)}&Nombre=${encodeURIComponent(producto.Nombre)}`;

    const picture = document.createElement("picture");
    const sourceWEBP = document.createElement("source");
    sourceWEBP.type = "image/webp";
    const sourcePNG = document.createElement("source");
    sourcePNG.type = "image/png";

    const IMG = document.createElement("img");
    IMG.classList.add("lazyload");
    IMG.alt = producto.Nombre;
    IMG.width = 270;
    IMG.height = 250;

    if(producto.Color && !producto.rutaImagen){
        const primerColor = Object.values(producto.Color)[0];
        sourceWEBP.srcset = `../${primerColor.imagen0}`;
        sourcePNG.srcset = `../${primerColor.imagenRespaldo0}`;
        IMG.setAttribute("data-src", `../${primerColor.imagenRespaldo0}`);
    } else if(producto.rutaImagen){
        sourceWEBP.srcset = `../${producto.rutaImagen.imagen0}`;
        sourcePNG.srcset = `../${producto.rutaImagen.imagenRespaldo0}`;
        IMG.setAttribute("data-src", `../${producto.rutaImagen.imagenRespaldo0}`);
    }

    picture.appendChild(sourceWEBP);
    picture.appendChild(sourcePNG);
    picture.appendChild(IMG);

    link.appendChild(picture);
    article.appendChild(link);

    const Nombre = document.createElement("h3");
    Nombre.textContent = producto.Nombre;

    const divPrecio = document.createElement("div");
    divPrecio.classList.add("Precio");

    const Precio = document.createElement('p');
    Precio.textContent = producto.PrecioTexto;
    Precio.id = 'Precio'

    if (producto.PrecioReal) {
        const PrecioReal = document.createElement('p');
        PrecioReal.textContent = producto.PrecioReal;
        PrecioReal.id = 'PrecioReal'
        divPrecio.appendChild(Precio);
        divPrecio.appendChild(PrecioReal);
    } else {
        divPrecio.appendChild(Precio);
    }

    article.appendChild(Nombre);
    article.appendChild(divPrecio);

    const Button = document.createElement("button");
    Button.classList.add("boton-agregar");
    Button.setAttribute("aria-label", "Agregar al carrito");
    Button.textContent = "Agregar al Carrito";

    const buttonPicture = document.createElement("picture");

    const buttonSourceWEBP = document.createElement("source");
    buttonSourceWEBP.srcset = "../Icons/add-to-cart.webp";
    buttonSourceWEBP.type = "image/webp";

    const buttonImage = document.createElement("img");
    buttonImage.classList.add("lazyload");
    buttonImage.alt = "Icono del carrito";
    buttonImage.setAttribute("data-src", "Icons/add-to-cart.png");
    buttonImage.width = 30;
    buttonImage.height = 30;

    buttonPicture.appendChild(buttonSourceWEBP);
    buttonPicture.appendChild(buttonImage);

    Button.appendChild(buttonPicture);
    article.appendChild(Button);

    section.appendChild(article);
}

function setupProductButtons() {
    const buttons = document.querySelectorAll('.boton-agregar');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
}

function handleButtonClick(event) {
    const article = event.target.closest('article');
    const producto = getProductFromArticle(article);

    if (producto.Color) {
        openColorSelection(producto);
    } else {
        addToCart(producto);
    }
}

function getProductFromArticle(article) {
    const nombre = article.querySelector('h3').textContent;
    
    const seccion = main.querySelector('h2').textContent;
                    
    const productoEncontrado = Productos[seccion].find(producto => producto.Nombre === nombre);

    const precioTexto = article.querySelector('.Precio #Precio') ? article.querySelector('.Precio #Precio').textContent : 'Precio no disponible';
    
    const picture = article.querySelector('picture'); 
    
    const sourceWebP = picture.querySelector('source[type="image/webp"]');
    const img = picture.querySelector('img');

    const rutaImagen = {
        imagen0: sourceWebP.getAttribute('srcset'),
        imagenRespaldo0: img.getAttribute('data-src')
    };
        
    return {
        Nombre: nombre,
        PrecioTexto: precioTexto,
        rutaImagen: rutaImagen,
        Color: productoEncontrado.Color,
        Precio: parseInt(precioTexto.replace(/[^\d]/g, ''), 10),
        Buscar: productoEncontrado.Buscar,
        Peso: productoEncontrado.Peso,
    };
}

function openColorSelection(producto) {
    const PageOverlay = document.querySelector(".PageOverlay");
    const OverlayContent = PageOverlay.querySelector(".Overlay");
    const Contenedor = OverlayContent.querySelector(".Contenedor");
    const AgregarAlCarrito = OverlayContent.querySelector("#boton-agregar");
    const body = document.querySelector("body");

    PageOverlay.style.display = "flex";
    body.style.overflowY = "hidden";
    Contenedor.innerHTML = '';

    for (const color in producto.Color) {
        if (producto.Color.hasOwnProperty(color)) {
            const colorData = producto.Color[color];
            
            if (colorData.Stock >= 5) {
                const picture = document.createElement('picture');
                
                const sourceWEBP = document.createElement('source');
                sourceWEBP.type = 'image/webp';
                sourceWEBP.srcset = colorData.imagen0;
                
                const sourcePNG = document.createElement('source');
                sourcePNG.type = 'image/png';
                sourcePNG.srcset = colorData.imagenRespaldo0;
                
                const img = document.createElement('img');
                img.classList.add("lazyload");
                img.setAttribute("data-src", colorData.imagenRespaldo0); 
                img.setAttribute('data-color', color);
                img.alt = `Imagen de color ${color}`;
                img.width = 120;
                img.height = 120;
                img.style.border = '3px solid rgb(204, 204, 204)'
                img.style.borderRadius = '10px';
                img.style.cursor = "pointer"
                
                picture.appendChild(sourceWEBP);
                picture.appendChild(sourcePNG);
                picture.appendChild(img);
                
                Contenedor.appendChild(picture);
            } else {
                const div = document.createElement("div");
                div.style.position = "relative";
                div.style.width = "120px";
                div.style.height = "120px";
                
                const picture = document.createElement('picture');
                picture.style.position = "relative";
                
                const sourceWEBP = document.createElement('source');
                sourceWEBP.type = 'image/webp';
                sourceWEBP.srcset = colorData.imagen0;
                
                const sourcePNG = document.createElement('source');
                sourcePNG.type = 'image/png';
                sourcePNG.srcset = colorData.imagenRespaldo0;
                
                const img = document.createElement('img');
                img.classList.add("lazyload");
                img.setAttribute("data-src", colorData.imagenRespaldo0);
                img.alt = `Imagen de color ${color}`;
                img.width = 120;
                img.height = 120;
                img.style.filter = 'grayscale(100%)';
                img.style.cursor = "default";
                
                picture.appendChild(sourceWEBP);
                picture.appendChild(sourcePNG);
                picture.appendChild(img);
                
                div.appendChild(picture);
    
                const p = document.createElement('p');
                p.textContent = "No disponible";
                p.style.position = "absolute";
                p.style.top = "28px";
                p.style.left = "5px";
                p.style.color = "red";
                p.style.backgroundColor = "white";
                p.style.fontSize = "24px";
                p.style.width = "110px";
                p.style.textAlign = "center";
                div.appendChild(p);
                
                Contenedor.appendChild(div);
            }
        }
    }

    let selectedColor = null;

    Contenedor.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const imgs = Contenedor.querySelectorAll('img');
            imgs.forEach(img => img.style.border = '3px solid #ccc');
            e.target.style.border = '3px solid rgb(52, 131, 250)';
            selectedColor = e.target.getAttribute('data-color');

            const picture = e.target.closest('picture');
            const sourceWebP = picture.querySelector('source[type="image/webp"]');
            const img = picture.querySelector('img');

            producto.rutaImagen = {
                imagen0: sourceWebP ? sourceWebP.getAttribute('srcset') : null,
                imagenRespaldo0: img ? img.getAttribute('data-src') : null
            };        
        }
    });

    AgregarAlCarrito.onclick = function() {
        if (selectedColor) {
            addToCart(producto, selectedColor);
            PageOverlay.style.display = "none";
            body.style.overflowY = "scroll";
        } else {
            alert('Por favor, selecciona un color.');
        }
    };

    const close_3 = OverlayContent.querySelector("#close_3");
    close_3.onclick = function() {
        PageOverlay.style.display = "none";
        body.style.overflowY = "scroll";
    };
}

function addToCart(producto, selectedColor = null) {
    let productoExistente = Carrito_de_compra.find(p => p.Nombre === producto.Nombre);

    if (productoExistente) {
        if (productoExistente.Color) {
            if (productoExistente.Color !== selectedColor) {
                alert("Solamente se puede seleccionar un solo color, para poder agregar otro color, por favor eliminelo del carro de compras");
                return;
            }
        } 
        productoExistente.Cantidad++;    
    } else {
        let productoNuevo = {
            Nombre: producto.Nombre,
            PrecioTexto: producto.PrecioTexto,
            Precio: producto.Precio,
            Cantidad: 1,
            rutaImagen: producto.rutaImagen,
            Buscar: producto.Buscar,
            Peso: producto.Peso,
        };

        if (producto.Color && selectedColor) {
            productoNuevo.Color = selectedColor;
        }

        Carrito_de_compra.push(productoNuevo);
    }

    localStorage.setItem("Carro_de_compras", JSON.stringify(Carrito_de_compra));
    actualizar();
}

setupProductButtons();