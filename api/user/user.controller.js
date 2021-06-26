const { json } = require('express');
const {
    create,
    getUsers,
    getUsersById,
    update, 
    deleteUser,
    getUserByEmail } = require('./user.service');
const  {genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign} = require('jsonwebtoken');
module.exports = {
    createUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password =  hashSync(body.password, salt);
        create(body, (err,results)=>{
            if(err)
            {
            
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    messege : "Database connection error: " + err,
                });
            }
            return res.status(200).json({
                success: 1,
                data : results,

            });
        });
    },
    getUsersById : (req, res)=>{
      const id = req.params.id;
      getUsersById(id, (err,results)=>{
        if(err)
        {
            console.log(err);
                return;
        }
        if(!results)
        {
            return res.json({
                success: 0,
                messege: "records not found",
            });
        }

        return res.json({
            success : 1,
            data : results
        });
      });
    },

    getUsers : (req, res)=>{
        getUsers((err, results)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        if(!results)
        {
            return res.json({
                success: 0,
                messege: "records not found",
            });
        }

        return res.json({
            success : 1,
            data : results
        });

        });
    },

    update : (req, res) =>{
        
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        update(body, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "updated successfully"
        });
        });
    },

    deleteUser : (req, res) =>{
        const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
            console.log(err);
            return ;
        }
        
        return res.json({
            success: 1,
            message: "user deleted successfully"
        });
        });
    },

    login: (req, res) => {
        try {
            const body = req.body;
            getUserByEmail(body.email, (err, results) => {
              if (err) {
                console.log(err);
              }
              if (!results) {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
              const result = compareSync(body.password, results.password);
              if (result) {
                results.password = undefined; 
                const jsontoken = sign({ result: results }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                  expiresIn: "1h"
                });
                return res.json({
                  success: 1,
                  message: "login successfully",
                  token: jsontoken
                });
              } else {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
            });
        } catch(error){
            return res.status(500).json({
                success: 0,
                data: error
              });
        }
       
      },

   
}
