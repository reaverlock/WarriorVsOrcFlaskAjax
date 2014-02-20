//party completa que se enviará
var allCharacters = {
    "party": [],
    "enemies": [],

}


$(document).ready(function() {

    //OJO Pongo aquí lo de los sonidos porque depende de Jquery y no entiendo bien aún como funca. 
    $.ionSound({
        sounds: [
            "beer_can_opening",
            "bell_ring",
        ],
        path: "../assets/sounds/",
        multiPlay: true,
        volume: "1.0"
    });

    $("#attack").on("click", function() {
        $.ionSound.play("bell_ring");
    });


    /***********************
    carga arrays con los valores iniciales con la funcion de 'functions.js'
    ***********************/
    loadStartingArrays(allCharacters);


    // funcion para seleccionar personaje que ataca (solo permite uno)
    $('.player').on('click', function() {
        if ($('#party').find('.selected').length == 0) {
            $.ionSound.play("beer_can_opening");
            $(this).toggleClass('selected');
        } else if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });

    // funcion para seleccionar enemigo (solo permite uno)
    $('.minion').on('click', function() {
        if ($('#minions').find('.selected').length == 0) {
            $.ionSound.play("beer_can_opening");
            if ($(this).hasClass('unselectable') == false) {
                $(this).toggleClass('selected');
            }
        } else if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
    });


    /*****
    Funcion del botón de ataque, inicia la mecánica del juego
     y envía los datos si hay un personaje y un enemigo seleccionados
    *****/
    $('#attack').on('click', function(e) {
        var attacker;
        var target;

        // confirma que has seleccionado a un personaje y un oponente
        if ($('#party').find('.selected').length == 0 || $('#minions').find('.selected').length == 0) {
            $('#outputText').prepend('<p class="errorText"> No has seleccionado atacante Y oponente </p>');
            return console.log('error, no habia seleccionado todo lo necesario');
        }
        // busca quienes hay seleccionados en ambas columnas y determina su posición en el array
        if ($('#party').find('.selected')) {
            attacker = $('#party').find('.selected').index() - 1; //'-1' x q index tira numeros ordinales
        }
        if ($('#minions').find('.selected')) {
            target = $('#minions').find('.selected').index() - 1; //'-1' x q index tira numeros ordinales
        }
        // Marca al player seleccionado como atacante
        allCharacters.party[attacker].role = 'attacker';
        // si el atacante es el mago marca a todos los enemigos como oponentes
        if (allCharacters.party[attacker].profession == 'Mage') {
            for (var i = 0; i < allCharacters.enemies.length; i++) {
                allCharacters.enemies[i].role = 'target';
            }
        } else {
            allCharacters.enemies[target].role = 'target';
        }


        /********
         TODO RESPECTO A LA CONEXION AJAX
        ********/
        console.log('Objeto a enviar');
        console.log(allCharacters);
        // convierto a string
        data = JSON.stringify(allCharacters);
        //uso la función pero previamente como tercer parametro paso el objeto que contiene el content Type para que 
        //el loader sepa que hacer con el, Flask lo requiere


        $.getJSON('/fightTurn', {
            data: data,
            contentType: "application/json",
            type: "GET"
        }, function(allCharacters) {
            // mensaje regresado x el server

            console.log("recibí esto del server: ");
            console.log(allCharacters);

            var party = allCharacters.party;
            var enemies = allCharacters.enemies;
            //actualiza enemigos
            enemiesAttacked(enemies);
            updateArray(allCharacters.enemies, enemies);
            // actualiza personajes
            //characterAttacked(party);



        });
    });

});