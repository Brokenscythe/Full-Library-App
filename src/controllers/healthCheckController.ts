import { Request, Response } from 'express';

interface UptimeData {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    responsetime?: [number, number]; 
}

function formatUptime(uptimeInSeconds: number): UptimeData {
    const uptime: UptimeData = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30.44; // prosjecna duzina mjeseca
    const secondsInYear = secondsInDay * 365.25; //prosjecna duzina godine

    uptime.years = Math.floor(uptimeInSeconds / secondsInYear);
    uptimeInSeconds -= uptime.years * secondsInYear;

    uptime.months = Math.floor(uptimeInSeconds / secondsInMonth);
uptimeInSeconds -= uptime.months * secondsInMonth;


    uptime.days = Math.floor(uptimeInSeconds / secondsInDay);
    uptimeInSeconds -= uptime.days * secondsInDay;

    uptime.hours = Math.floor(uptimeInSeconds / secondsInHour);
    uptimeInSeconds -= uptime.hours * secondsInHour;

    uptime.minutes = Math.floor(uptimeInSeconds / secondsInMinute);
    uptime.seconds = Math.floor(uptimeInSeconds % secondsInMinute);

    return uptime;
}

export async function getHealthCheck(req: Request, res: Response) {

    const startTime = process.hrtime();

    const uptimeInSeconds = process.uptime();
    const formattedUptime: UptimeData = formatUptime(uptimeInSeconds);

 
    const hrtime = process.hrtime(startTime);


    const responseTimeMs = hrtime[0] * 1000 + hrtime[1] / 1000000;

    const message = 'OK';

    res.render('healthcheck', {
        healthcheck: {
            message,
            uptime: formattedUptime,
            responsetime: responseTimeMs + ' ms',
            timestamp: Date.now(),
        },
    });
}

export const restartServer = (req: Request, res: Response) => {
// treba instalirati npm install child_process
    const exec = require('child_process').exec;
    exec('npm restart', (error, stdout, stderr) => {
        if (error) {
            console.error(`Server restart greska: ${error}`);
            res.status(500).send('Server restart greska');
        } else {
            console.log(`Server restartovan: ${stdout}`);
            res.status(200).send('Server restartovan');
        }
    });
};
//moze se dodati i npm install os-utils
//radi mjerenja CPU % opterecenja,totalMemory,usedMemory,freeMemory...