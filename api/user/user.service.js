const pool = require('../../config/database');

module.exports = {
    create : (data, callback) => {
        pool.query(
            `Insert into registration(firstName, lastName, gender, email, password, number) 
            values (?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,

            ],
            (error, results, fields)=>{
                if(error)
                {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUsers : (callback) => {
        pool.query(`Select id,firstName ,lastName, gender, email, password, number from registration`,
        [],
        (error,results,fields)=> {
            if(error)
            {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getUsersById : (id,callback) => {
        pool.query(`Select id,firstName ,lastName, gender, email, password, number from registration where id = ?`,
        [id],
        (error,results,fields)=> {
            if(error)
            {
                return callback(error);
            }
            return callback(null, results[0]);
        });
    },

    update : (data,callback) => {
        pool.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
              data.firstName,
              data.lastName,
              data.gender,
              data.email,
              data.password,
              data.number,
              data.id
            ],
            (error, results, fields) => {
              if (error) {
                callback(error);
              }
              return callback(null, results[0]);
            }
          );
    },
    
     deleteUser : (data,callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
              if (error) {
                callback(error);
              }
              return callback(null);
            }
          );
    },


    getUserByEmail: (email, callBack)=> {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) =>{
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

}