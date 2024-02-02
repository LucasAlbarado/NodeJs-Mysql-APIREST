import {pool} from '../db.js';

export const getUsers = async (req,res) => {
    try {
       const [rows] = await pool.query ('SELECT * FROM users');
   res.json(rows);
    
   } catch (error) {
        return res.status(500).json ({
            message:'Something goes wrong'
        });
   }
};

export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    console.log(rows)
    if (rows.length <= 0) return res.status(404).json({message: 'User not found'})
    
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json ({
            message:'Something goes wrong'
        })
    }
};

export const createUsers = async (req,res) =>{
    const {email, name, password} = req.body

    try {
    const [rows] = await pool.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password])
    res.send({
        id: rows.insertId,
        email,
        name,
        password
     })
    } catch (error) {
        return res.status(500).json ({
            message:'Something goes wrong'
        })
    }
};


export const deleteUsers = async(req,res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

    if (result.affectedRows <= 0) return res.status(404).json({message: 'User not found'});

    console.log(result)
    res.send('user deleted')
    } catch (error) {
        return res.status(500).json ({
            message:'Something goes wrong'
        });
    }
};

export const updateUsers = async (req,res) => {
    const {id} = req.params;
    const {email, name, password} = req.body;

    try {

        const [result] = await pool.query('UPDATE users SET email = IFNULL(?, email), name = IFNULL(?, name), password = IFNULL(?, password) WHERE id = ?', [email, name, password, id]);
        
        if (result.affectedRows === 0) return res.status(404).json({message: 'User not found'});

        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json ({
            message:'Something goes wrong'
        });
    }
};