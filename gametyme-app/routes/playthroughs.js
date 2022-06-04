const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load all Playthroughs and Sessions
router.get('/', (req, res) => {
    const query = `
    SELECT Playthroughs.playthrough_id AS 'Playthrough ID', Playthroughs.start_timestamp AS 'Start Timestamp',
    Playthroughs.finish_timestamp AS 'Finish Timestamp', Users.user_id AS 'User ID', Users.username AS 'Username',
    Games.game_id AS 'Game ID', Games.game_title AS 'Game Title'
    FROM Playthroughs JOIN Users ON Playthroughs.user_id = Users.user_id
    JOIN Games ON Playthroughs.game_id = Games.game_id
    ORDER BY Playthroughs.playthrough_id ASC;

    SELECT user_id, username AS 'Username' FROM Users;
    SELECT game_id, game_title AS 'Game Title' FROM Games;

    SELECT session_id, TIMESTAMPDIFF(HOUR, session_start, session_end) AS 'Time Played', session_start, session_end, playthrough_id FROM Sessions;
    `
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('playthroughs', {data: results[0], userSelect: results[1], gameSelect: results[2],sessionSelect: results[3]});
        console.log('Playthroughs loaded');
        
    });
}); 


// Add Playthrough and Session
router.post('/', (req, res) => {

    let {username, game_title}= req.body; 
    const addPlaythroughQuery = `INSERT INTO Playthroughs (start_timestamp, user_id, game_id)
    VALUES ((SELECT CURRENT_TIMESTAMP), (SELECT user_id FROM Users WHERE username = '${username}'), 
    (SELECT game_id FROM Games WHERE game_title='${game_title}'));
    
    `;
    

    db.query(addPlaythroughQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/playthroughs');
        }
    });
});


// Delete Playthrough
router.delete('/:playthrough_id', (req, res) => {
    const playthrough_id = req.params.playthrough_id;
    const query = `
        DELETE FROM Playthroughs
        WHERE playthrough_id=${playthrough_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Playthrough deleted');
        }
    });
});

module.exports =  router;