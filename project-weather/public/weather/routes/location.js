const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Retrieves the location of the weather station
 *     description: Returns the name and position (latitude and longitude) of the weather station
 *     responses:
 *       '200':
 *         description: Location information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the location
 *                 position:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       description: Latitude coordinate of the location
 *                     longitude:
 *                       type: number
 *                       description: Longitude coordinate of the location
 */

router.get('/', function(req, res, next) {
    const location = {
        name: "Hochschule Stralsund",
        position: {
            latitude: 54.33910476583089,
            longitude: 13.073712142427475
        }
    }

    res.send(location);
});

module.exports = router;
