const express = require('express');
const router = express.Router();

/** @swagger
 * /weather:
 *   get:
 *     summary: Retrieves the current weather data
 *     description: Returns the temperature and humidity at the weather station
 *     responses:
 *       '200':
 *         description: Weather information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                   description: Current temperature in degrees Celsius
 *                 humidity:
 *                   type: number
 *                   description: Current relative humidity as a percentage
 *       '503':
 *         description: Weather station is malfunctioning
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the failure
 *
 */
router.get('/', function(req, res, next) {
    const ERROR = false;
    if(ERROR) {
        res.status(503).send({message: "Sensors offline"});
    }
    else {
        const weather = {
            temperature: 5 + 0.1 * Math.round(Math.random() * 50),
            humidity: 30 + 0.1 * Math.round(Math.random() * 100)
        }
        res.send(weather);
    }

});

module.exports = router;
