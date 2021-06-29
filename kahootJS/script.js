 const pregunta = [{
    titulo: 'gato',
    alternativas: ['cat', 'dog', 'fish', 'rinoseronte'],
    correcta: 0
},
    {
        titulo: 'perro',
        alternativas: ['fish', 'dog', 'cat', 'rinoseronte'],
        correcta: 1
    },
    {
        titulo: 'pájaro',
        alternativas: ['bird', 'dog', 'cat', 'ninguna es correcta'],
        correcta: 0
    }];

let app = {
    /**
     * inicializa la app, obteniendo la listas de opciones vacías del DOM y mediante addEventListener(), comprueba si al hacer click la respuesta es correcta o no,
     * mandando por parámetro la opción marcada
     */
    start: function () {
        this.posicionActual = 0;
        this.puntuacion = 0;

        if (this.posicionActual===0){
            this.actualizarStats();
        }
        let opciones = document.querySelectorAll(".opciones");

        for (let i = 0; i < opciones.length; i++) {
            //opciones[i].addEventListener() recoge la acción del click a todos los obtenidos
            //anteriormente mediante el querySelectorAll (todos los elementos de la lista con X class name)
            opciones[i].addEventListener('click', function () {
                this.comprobar(i);
            }.bind(this));
        }
        this.mostrarPregunta(pregunta[this.posicionActual]);
    },
    /**
     *
     * @param preg recibe el objeto 'pregunta', que tiene un título, array con respuestas posibles y un número que indica la posición correcta.
     * con esta función simplemente se inyecta en DOM el título del objeto y el array de opciones en cada elemento correspondiente.
     */
    mostrarPregunta: function (preg) {

        let tituloDiv = document.getElementById("titulo");
        tituloDiv.textContent = preg.titulo;

        //seleccionamos todas las que sean de X clase
        let opciones = document.querySelectorAll(".opciones");

        for (let i = 0; i < opciones.length; i++) {
            opciones[i].textContent = preg.alternativas[i];
        }
    },
    /**
     *
     * @param seleccionado recibe el click del usuario y devuelve si es respuesta correcta o no
     */
    comprobar: function (seleccionado) {
        let preguntaActual = pregunta[this.posicionActual];
        if (preguntaActual.correcta === seleccionado) {
            console.log("bien");
            this.puntuacion++;
            this.mostrarResultado(true);
        } else {
            console.log("mal");
            this.mostrarResultado(false);
        }
        /**
         * actualizamos la puntuación cada vez que se responda algo
         */
        this.actualizarStats();
        /**
         * una vez pasada la pregunta, pasa a la siguiente incrementando el contador
         */
        this.incrementarPosicion();

        /**
         * una vez que se ha incrementado este, se va a la siguiente posición (pregunta), y se muestra
         */
        this.mostrarPregunta(pregunta[this.posicionActual])
    },
    incrementarPosicion: function () {
        this.posicionActual++;
        if (this.posicionActual === pregunta.length) {
            this.posicionActual = 0;
        }
    },
    actualizarStats: function(){
        let puntuacionDiv = document.getElementById('puntuacion');
        puntuacionDiv.textContent=`Tu puntuación es: ${this.puntuacion}`;
    },
    mostrarResultado: function(esCorrecta){
        let resultadoDiv = document.getElementById('resultado');
        let resultado;
        if(esCorrecta){
            resultado = 'Es correcto!';
        }else{
            let preguntaActual = pregunta[this.posicionActual];
            /**
             *
             * @type {number|*} se obtiene, de la pregunta actual, la posición de la respuesta correcta
             */
            let respuestaCorrecta = preguntaActual.correcta;

            let textoCorrecta = preguntaActual.alternativas[respuestaCorrecta];
            resultado= `Incorrecta! Respuesta correcta: ${textoCorrecta}`;
        }
        resultadoDiv.textContent=resultado;
    }
};
app.start();