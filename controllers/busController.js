
const db = require("../config/db");

// get states
exports.getStates = async (
    req,res
) =>{
    try{
        const [states] = await db.query(
            'SELECT * FROM state'
        )
        res.json(states)

    }catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: 'Error Fetching State',error,
            }
        )

    }
}

//get cities
exports.getCitiesByState = async (req,res) =>{
    const stateId = req.params.stateId;
    console.log(stateId, "req.params", req.params);
    try{
        const [cities] = await db.query(
            'SELECT * FROM cities WHERE stateId = ?',[stateId]
        )
        res.json(cities)
    }catch(error){

        res.status(500).json({
            Error: 'Error Fetching Cities',
        })
    }
}

exports.searchBuses = async (req, res) => {
    const { sourceCityId, destinationCityId, travelDate } = req.query;
    console.log('Received query:', { sourceCityId, destinationCityId, travelDate });
    try {
        const [buses] = await db.query(
            `SELECT * FROM buses WHERE fromCity = ? AND toCity = ? AND travelDate = ?`,
            [sourceCityId, destinationCityId, travelDate]
        );

        const busesWithCityNames = await Promise.all(buses.map(async (bus) => {
            const [fromCity] = await db.query('SELECT cityName FROM cities WHERE cityId = ?', [bus.fromCity]);
            const [toCity] = await db.query('SELECT cityName FROM cities WHERE cityId = ?', [bus.toCity]);

            bus.fromCityName = fromCity[0]?.cityName || 'Unknown';
            bus.toCityName = toCity[0]?.cityName || 'Unknown';

            return bus;
        }));

        console.log("Buses list with city names:", busesWithCityNames);
        return res.json(busesWithCityNames);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            Error: 'Error fetching buses'
        });
    }
};

