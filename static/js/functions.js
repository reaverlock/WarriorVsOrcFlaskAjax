/***** 
Carga los valores iniciales de los 
elementos en web dentro del JSON inicial 
para agregar mas propiedades hacerlo aquí.
iguala los textos del HTML con los contenidos de las propiedades
el sub objeto "status" incluye todos los estados posibles
********/
function loadStartingArrays(allCharactersArray) {
    //carga array de personajes
    $('.player').each(function() {
        var name = $(this).find('.name').text();
        var characterProfession = $(this).find('.profession').text();
        var characterHealth = $(this).find('.playerHealth').text();
        var characterAttack = $(this).find('.playerAttack').text();
        var characterDefense = $(this).find('.playerDefense').text();
        var characterCrit = $(this).find('.playerCrit').text();
        var characterEvade = $(this).find('.playerEvade').text();
        allCharactersArray.party.push({
            "name": name,
            "profession": characterProfession,
            "health": characterHealth,
            "attack": characterAttack,
            "defense": characterDefense,
            "evade": characterEvade,
            "crit": characterCrit,
            "role": null,
            "status": {
                "evade": false,
                "stun": false,
                "crit": false,
                "defended": false,
                "dead": false
            }
        });
    });
    // carga array de malos
    $('.minion').each(function() {
        var name = $(this).find('.name').text();
        var characterProfession = $(this).find('.race').text();
        var characterHealth = $(this).find('.minionHealth').text();
        var characterAttack = $(this).find('.minionAttack').text();
        var characterDefense = $(this).find('.minionDefense').text();
        var characterCrit = $(this).find('.minionCrit').text();
        var characterEvade = $(this).find('.minionEvade').text();
        allCharactersArray.enemies.push({
            "name": name,
            "profession": characterProfession,
            "health": characterHealth,
            "attack": characterAttack,
            "defense": characterDefense,
            "evade": characterEvade,
            "crit": characterCrit,
            "role": null,
            "status": {
                "evade": false,
                "stun": false,
                "crit": false,
                "defended": false,
                "dead": false,
                "alreadyDead": false
            }
        });
    });
}

/*** NO ESTA HECHA
Evalua datos de los personajes buenos y los actualiza 
además de imprimir su estado en la consola 
***/
function characterAttacked(partyArray) {
    for (var i = 0; i < partyArray.length; i++) {
        // chequea todos los players de la web
        $('.player').each(function() {
            // si el nombre coincide con alguno
            if (partyArray[i].name == $(this).find('.name').text()) {
                // chequear cada condición
                // si esquiva da ese mensaje
                if (partyArray[i].status.evade == true) {
                    $('#outputText').prepend('<p class="playerText evadeText">' + partyArray[i].name + ' esquivó el ataque</p>');
                } else if (partyArray[i].status.stun == true) {
                    $('#outputText').prepend('<p class="playerText stunText">' + partyArray[i].name + ' fue aturdido por el ataque</p>');
                } else if (partyArray[i].status.crit == true) {
                    $('#outputText').prepend('<p class="playerText critText">' + partyArray[i].name + ' recibe un critico de daño </p>');
                } else if (partyArray[i].status.defended == true) {
                    $('#outputText').prepend('<p class="playerText defendedText">' + partyArray[i].name + ' se defiende del ataque </p>');
                } else if (partyArray[i].status.dead == true) {
                    $('#outputText').prepend('<p class="playerText stunText">' + partyArray[i].name + ' ha muerto </p>');
                    $(this).find('.playerHealth').text('R.I.P');
                }
            }
        });
    }
}

/***
Evalua datos de los MINIONS y los actualiza 
además de imprimir su estado en la consola 
***/
function enemiesAttacked(enemiesArray) {
    // por cada enemigo en el JSON
    for (var i = 0; i < enemiesArray.length; i++) {
        // compara con todos los minions de la web
        $('.minion').each(function() {
            //defino nombre
            var name = $(this).find('.name').text();
            // si el nombre coincide con alguno
            if (enemiesArray[i].name == name) {
                console.log(enemiesArray[i].name === name);
                // chequear cada condición y hace return para romper la funcion en las que es necesario
                // luego de botar el output en la consola resetear el status
                if (enemiesArray[i].status.evade == true) {
                    $('#outputText').prepend('<p class="minionText evadeText">' + name + ' esquivó el ataque</p>');
                    enemiesArray[i].status.evade = false;
                    console.log(name + ' esquiva el ataque');
                } else if (enemiesArray[i].status.stun == true) {
                    $('#outputText').prepend('<p class="minionText stunText">' + name + ' fue aturdido por el ataque</p>');
                    enemiesArray[i].status.stun = false;
                    console.log(name + ' es aturdido');
                } else if (enemiesArray[i].status.crit == true) {
                    $('#outputText').prepend('<p class="minionText critText">' + name + ' recibe un critico de daño </p>');
                    enemiesArray[i].status.crit = false;
                } else if (enemiesArray[i].status.defended == true) {
                    $('#outputText').prepend('<p class="minionText defendedText">' + name + ' se defiende del ataque </p>');
                    enemiesArray[i].status.defended = false;
                    console.log(name + ' se defiende del ataque');
                } else if (enemiesArray[i].status.dead == true) {
                    if (enemiesArray[i].status.alreadyDead == false) {
                        $('#outputText').prepend('<p class="minionText deadText">' + name + ' ha muerto </p>');
                        $(this).find('.minionHealth').text('R.I.P');
                        console.log(name + ' ha muerto (R.I.P)');
                        $(this).removeClass('selected');
                        $(this).addClass('unselectable');
                        enemiesArray[i].status.alreadyDead = true;
                    }    
                }
                // si hay diferencia de health
                if (enemiesArray[i].health < parseInt($(this).find('.minionHealth').text())) {
                    var dmg = parseInt($(this).find('.minionHealth').text()) - enemiesArray[i].health;
                    $('#outputText').prepend('<p class="minionText dmgText">' + name + ' sufre ' + dmg + ' puntos de daño</p>');
                    $(this).find('.minionHealth').text(enemiesArray[i].health);
                }

            }
        });

    }
}

function updateArray(oldArray, newArray) {
    for (var i = 0; i < newArray.length; i++) {
        oldArray[i].health = newArray[i].health;
        // pensar si hay que actualizar los status
    }
}