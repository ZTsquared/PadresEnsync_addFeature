const express = require("express");
const db = require("../model/helper");

// this function returns a guard function (a closure!!!) that is constructed based on the particular parameters you want to check.
// the guard function confirms that a matching item already exists in the specified table
function mustExist (queryParamKey, queryTableName, queryColumnName){

    const result = async function (req, res, next ) {
        let searchTerm = req.params[queryParamKey];
        if (!searchTerm) {
            searchTerm = req.body[queryParamKey];
        }
        console.log(searchTerm)
        try {
            // console.log(queryParamKey)
            // console.log(queryParamKey === "id")
            // console.log(isNaN(+queryParamKey))
                const response = await db(`SELECT * FROM ${queryTableName} WHERE ${queryColumnName}="${searchTerm}"`);
                // console.log(response);
                if (response.data.length){
                    next()
                } else {
                    res.status(404).send({msg: `Searching database table '${queryTableName}' for entry '${queryColumnName} = ${searchTerm}' produced no results`})
                }
        }catch (err){
            res.status(500).send(err)
        }
    }
    return result
}

module.exports = mustExist
