const header = document.querySelector('header');
const Search = document.querySelector('nav ul .Search');

document.getElementById('Lupa').addEventListener('click', function() {
    const headerHeight = header.offsetHeight;

    if (headerHeight === 72) {
        Search.style.top = '-19%';
    } else {
        Search.style.top = '-8%';
    }
});

document.getElementById('Close-1').addEventListener('click',function(){
    Search.style.top = '-100%';
});

const MenuOptions = document.querySelector('nav ul');

document.getElementById('Menu').addEventListener('click',function(){
    MenuOptions.style.right = '0';
});

document.getElementById('Close').addEventListener('click',function(){
    MenuOptions.style.right = '-100%';
});