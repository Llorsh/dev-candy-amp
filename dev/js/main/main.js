(function () {
    function nombrar(nombre) {
        return nombre;
    }

    function saludar(nombre) {
        console.info(nombre, ' :D')
    }

    saludar(nombrar('Llorsh'))
}());