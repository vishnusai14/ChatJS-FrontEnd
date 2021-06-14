import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('chats.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY NOT NULL, userId TEXT NOT NULL, userName TEXT NOT NULL, userEmail TEXT NOT NULL);',
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
    console.log(userId)
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT userName FROM people WHERE userId = ${userId.toString()}`,
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

export const saveUserToDb = (userName, id, userEmail) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO people(userId, userName, userEmail) VALUES (?, ?, ?);',
                        [id, userName, userEmail],
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

export const fetchUsers = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM people;',
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