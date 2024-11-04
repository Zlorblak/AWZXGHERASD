const header = document.querySelector('header');
const Search = document.querySelector('nav ul .Search');

const body = document.querySelector('body');

document.getElementById('Lupa').addEventListener('click', function() {
    const headerHeight = header.offsetHeight;

    if (headerHeight === 72) {
        Search.style.top = '0';
    } else {
        Search.style.top = '18px';
    }
});

document.getElementById('Close-1').addEventListener('click',function(){
    Search.style.top = '-100%';
});

const MenuOptions = document.querySelector('nav ul');

document.getElementById('Menu').addEventListener('click',function(){
    MenuOptions.style.right = '0';
    body.style.overflowY = 'hidden'
});

document.getElementById('Close').addEventListener('click',function(){
    MenuOptions.style.right = '-100%';
    body.style.overflowY = 'scroll'
});

let carritoJSON = localStorage.getItem("Carro_de_compras");
let Carrito_de_compra = carritoJSON ? JSON.parse(carritoJSON) : [];

function actualizar() {
    const Numero = document.querySelector("nav .TWO #Numero");    
    
    let totalCantidad = 0;

    if (Carrito_de_compra.length > 0) {        
        Carrito_de_compra.forEach(producto => {
            totalCantidad += producto.Cantidad;            
        });
    }
    Numero.textContent = totalCantidad;
}

actualizar();

window.addEventListener('storage', (event) => {
    if (event.key === 'Carro_de_compras') {
        const carritoActualizadoJSON = localStorage.getItem("Carro_de_compras");
        Carrito_de_compra.length = 0;
        if (carritoActualizadoJSON) {
            Carrito_de_compra.push(...JSON.parse(carritoActualizadoJSON)); 
        }
        actualizar();
    }
});