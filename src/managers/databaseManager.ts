import mysql, { Connection } from 'mysql2';

class DatabaseManager {
    private conn: Connection;

    constructor() {
        this.conn = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        this.conn.connect((err) => {
            if (err) {
                console.error('Error connecting to database: ' + err.stack);
                return;
            }

            console.log('Connected to database as id ' + this.conn.threadId);
            
        });
    }

    public query(sql: string, args: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    }

    public close(): void {
        this.conn.end();
    }
}

export const mysqlManager = new DatabaseManager();