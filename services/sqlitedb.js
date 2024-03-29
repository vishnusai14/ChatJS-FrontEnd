import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('chat.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY NOT NULL, userId TEXT NOT NULL, userName TEXT NOT NULL, userEmail TEXT NOT NULL, userImage TEXT);',
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

export const saveUserToDb = (userName, id, userEmail, userImage) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO people(userId, userName, userEmail,userImage) VALUES (?, ?, ?, ?);',
                        [id, userName, userEmail, userImage],
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

export const updateUsers = (user, imageUrl) => {
    console.log("Updating User Image")
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE people SET userImage = "${imageUrl}" WHERE userEmail = "${user.userEmail}"`,
            [],
            (_,success) => {
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