import mysql = require("mysql");

export default class MySQL {

    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected: boolean = false;

    constructor() {
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
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {

        this.instance.cnn.query(query, (err, results: Object[], fields) => {

            if (err) {
                console.log("Error en query", err);
                callback(err);
                return;
            }

            if (results.length === 0) {
                callback("El registro solicitado no existe");
            } else {
                callback(null, results);
            }
        });

    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {

            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log("Base de datos MySQL online");
        });
    }
}