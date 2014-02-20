# from __future__ import print_function
from flask import Flask, render_template, jsonify, request
from librerias.battleLogic import battleLogic

import json
import ast


app = Flask(__name__, static_url_path='/static')
app.debug = True
app.config['SECRET_KEY'] = 'secret!'


# Define la ruta inicial y la pagina a renderizar
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/fightTurn', methods=['GET'])
def fight():
    # El $.GET de jQuery envia la data de una manera especifica,
    # Flask requiere el encabezado que le diga que es typo JSON para
    # asi poder deshacerla, los args de ese request son la
    # info que envia el GET, accedemos a su propiedad 'data'
    # que fue definida en el objet enviado en el JS
    dataRecibida = request.args['data']
    # Cargamos la data como diccionario
    dataToDict = json.loads(dataRecibida)
    print 'Recibi'
    print dataToDict
    # procesamos la info y la enviamos lista para sewr usada como json
    return jsonify(battleLogic(dataToDict))


@app.errorhandler(500)
def special_exception_handler(error):
    return 'problema de coneccion', 500


if __name__ == '__main__':
    app.run()
