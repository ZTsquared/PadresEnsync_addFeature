const express = require("express");
const db = require("../model/helper");

// this function returns a guard function (a closure!!!) that is constructed based on the particular parameters you want to check.
// the guard function checks that a matching item does not exists in the specified table

function mustNotExist (postBodyKey, queryTableName, queryColumnName){

    const result = async function (req, res, next ) {
        if (!req.body[postBodyKey]){
            res.status(400).send({msg: `Submission does not contain a valid ${postBodyKey} property`})
        } else {
            const searchTerm = req.body[postBodyKey];
            try {
                const responseObject = await db(`SELECT * FROM ${queryTableName} WHERE ${queryColumnName}="${searchTerm}"`);
                if (!responseObject.data.length){
                    next()
                } else {
                    res.status(403).send({msg: `Action Forbidden. Table '${queryTableName}' in the database already includes an entry with '${queryColumnName} = ${searchTerm}'.  ${queryColumnName} must be unique, please try again`})
                }
            }catch (err){
                res.status(500).send(err)
            }
        }
    }
    return result
}


module.exports = mustNotExist
