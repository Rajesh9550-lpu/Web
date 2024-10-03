/**
 * @module environments
 * @description Read the configuration json file for the mentioned stage in environment variable.
 *              Created at 28/07/2023
 * @author Jagannathan Jothi
 */

import fs from "fs";

const readConfig = () => {
    const stage = process.env.Stage || 'test';
    const configBuff = fs.readFileSync(`./environments/${stage}/config.json`);
    return {
        stage : JSON.parse(configBuff)
    }
}

export default readConfig();