'use strict'

const conn = require('../conn/conn');


var controller = {
    viewAll: (req, res) => {
            const {id } = req.params
            const sql = `SELECT *, (SELECT sum(finanzas.monto) FROM finanzas WHERE finanzas.tipo='INGRESO' AND id_usuario=${id}) AS Ingresos, (SELECT sum(finanzas.monto) FROM finanzas WHERE finanzas.tipo='EGRESO'  AND id_usuario=${id}) AS Egresos FROM finanzas  WHERE id_usuario=${id} ORDER BY id DESC`;

            conn.query(sql, (error, result)=>{
                if(error) console.log(error);

                if(result.length > 0) {
                    res.json(result);
                }else{
                    res.send('No hay datos aun')
                }
            })
    },
    login: (req, res) => {
        const {email } = req.params;
        const {password } = req.params;

        const sql = `SELECT * FROM usuarios Where email = '${email}' AND password = '${password}'`;
        
        conn.query(sql, (error, result)=>{
            if(error) console.log(error);
        
            if(result.length > 0) {
                res.json(result);
                
            }else{
                res.json('INVALIDO')
            }  
        })
    },
    registerUser: (req, res) => {
        const registerObj = {
            email: req.body.email,
            password: req.body.password
        }

        const sqlControl =`SELECT COUNT(id) as Id  FROM usuarios WHERE email = '${registerObj.email}'`
        const sql = 'INSERT INTO usuarios SET ?';

        let query = `SELECT COUNT(id) AS id_count FROM usuarios WHERE email = '${req.body.email}'`;
  
        conn.query(query, (err, rows) => {
            if(err) throw err;
    
            let valor = JSON.stringify(rows);
            var json =  JSON.parse(valor);

            
            
            if (json[0].id_count > 0){
               
                
                
                res.json({res: "INVALIDO"});
                //res.status(200).send('INVALIDO')
            }else{
                conn.query(sql, registerObj ,error=>{
                    if(error) throw error;
                    
                    res.json({res: "VALIDO"});
                })
            }
        });
        /*
     
        */
    },
    listarCat: (req, res)=>{
        const sql = 'SELECT * FROM categorias ORDER BY nombre';

        conn.query(sql, (error, result)=>{
            if(error) console.log(error);
            
            
            console.log(result)
            if(result.length > 0) {
                res.json(result);
            }else{
                res.send('No hay datos aun')
            }
        })
       
        
    },
    createCat: (req, res)=>{
        const registerObj = {
            nombre: req.body.name
        }
        const sql = 'INSERT INTO categorias SET ?';

        conn.query(sql, registerObj ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
        
    },
    editCat: (req, res)=>{
        const {id } = req.params
        const registerObj = {
            nombre: req.body.name,
        }

        const sql = `UPDATE categorias SET ? WHERE id = ${id }`;

        conn.query(sql, registerObj ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
        
    },
    deleteCat: (req, res)=>{
        const {id } = req.params

        const sql = `DELETE FROM categorias WHERE id = ${id }`;

        conn.query(sql, id ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
    },
    finanzasNew: (req, res)=>{
        const registerObj = {
            id_usuario: req.body.id_usuario,
            id_categoria: req.body.id_categoria,
            concepto: req.body.concepto,
            monto: req.body.monto,
            fecha: req.body.fecha,
            tipo: req.body.tipo
        }
        const sql = 'INSERT INTO finanzas SET ?';

        conn.query(sql, registerObj ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
        
    },
    finanzasEdit: (req, res)=>{
        const {id } = req.params
        const registerObj = {
            id_categoria: parseInt(req.body.categoria),
            concepto: req.body.concepto,
            monto: req.body.monto,
            fecha: req.body.fecha,
            tipo: req.body.tipo,
        }

        console.log("Entro!!!---------------------")
        console.log(req.body)
        const sql = `UPDATE finanzas SET ? WHERE id = ${id }`;

        conn.query(sql, registerObj ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
        
    },
    finanzasDelete: (req, res)=>{
        const {id } = req.params

        const sql = `DELETE FROM finanzas WHERE id = ${id }`;

        conn.query(sql, id ,error=>{
            if(error) throw error;
            
            res.send('VALIDO')
        })
    }

    
}

module.exports = controller;
