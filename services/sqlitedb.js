import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY NOT NULL, userId TEXT NOT NULL, userName TEXT NOT NULL);',
                    [],
                    (_, success) => {
                        resolve(success)
                    },
                    (_, err) => {
                        reject(err)
                    }
            )
        })

    })

    return promise
}

export const getUser = (userId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT userName FROM contacts WHERE userId = ${userId.toString()}`,
                        [],
                        (query, success) => {
                            console.log(query)
                            resolve(success)
                        },
                        (_, err) => {
                            reject(err)
                        }
            )
        })
    })
    return promise
}

export const saveUserToDb = (userName, id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO contacts(userId, userName) VALUES (?, ?);',
                        [id, userName],
                        (_, success) => {
                            resolve(success)
                        },
                        (_, err) => {
                            reject(err)
                        }

            )
        })
    })
    return promise
} 