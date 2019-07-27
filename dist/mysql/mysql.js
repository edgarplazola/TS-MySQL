"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log("Clase inicializada");
        this.cnn = mysql.createConnection({
            host: "localhost",
            user: "node_user",
            password: "123456",
            database: "node_db"
        });
        this.conectarDB();
    }
    //?Singleton, evitar multiples instancias
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en query", err);
                callback(err);
                return;
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log("Base de datos MySQL online");
        });
    }
}
exports.default = MySQL;
