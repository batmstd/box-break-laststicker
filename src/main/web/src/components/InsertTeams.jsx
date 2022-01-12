import React from 'react';
import '../style.css'
import TextField from "@mui/material/TextField";

const getCommandsByLeague = (league) => {
    switch (league) {
        case "NBA":
            return 'Atlanta\nBoston\nBrooklyn\nCharlotte\nChicago\nCleveland\nDallas\nDenver\nDetroit\nGolden State\nHouston\nIndiana\nLA Clippers\nLA Lakers\nMemphis\nMiami\nMilwaukee\nMinnesota\nNew Orleans\nNew York\nOklahoma City\nOrlando\nPhiladelphia\nPhoenix\nPortland\nSacramento\nSan Antonio\nToronto\nUtah\nWashington';
        case 'APL':
            return 'Arsenal\nLondon\nAston Villa\nBrentford\nBrighton & Hove Albion\nBurnley\nChelsea\nCrystal Palace\nEverton\nLeeds United\nLeicester City\nLiverpool\nManchester City\nManchester United\nNewcastle United\nNorwich City\nSouthampton\nTottenham Hotspur\nWatford\nWest Ham United\nWolverhampton Wanderers';
        case 'La Liga':
            return 'Alavés\nAthletic Bilbao\nAtlético Madrid\nBarcelona\nCádiz\nCelta\nElche\nEspanyol\nGetafe\nGranada\nLevante\nMallorca\nOsasuna\nRayo Vallecano\nReal Betis\nReal Madrid\nReal Sociedad\nSevilla\nValencia\nVillarreal';
        case 'NFL':
            return 'Arizona\nAtlanta\nBaltimore\nBuffalo\nCarolina\nChicago\nCincinnati\nCleveland\nDallas\nDenver\nDetroit\nGreen Bay\nHouston\nIndianapolis\nJacksonville\nKansas City\nLA Chargers\nLA Rams\nLas Vegas\nMiami\nMinnesota\nNew England\nNew Orleans\nNY Giants\nNY Jets\nPhiladelphia\nPittsburgh\nSan Francisco\nSeattle\nTampa Bay\nTennessee\nWashington';
        default:
            return '';
    }
}

export const InsertTeams = ({callback, league}) => {
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        const list = getCommandsByLeague(league).split("\n")
        callback(list);
    }, []);

    React.useEffect(() => {
        setValue(getCommandsByLeague(league))
    }, [league])

    const handleChange = ({target: {value}}) => {
        setValue(value);
        const list = value.split("\n")
        callback(list);
    }
    return (<div>
        <TextField
            id="draft-teams"
            label="Список команд"
            multiline
            maxRows={30}
            value={value}
            onChange={handleChange}
        />
    </div>)
}