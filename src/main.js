import express      from "express";
import createLogger from "logging";


const PORT_NUMMER = 8080;

const logger = createLogger( "main" );

const app = express();
app.use( express.static( "public" ) );

app.listen( PORT_NUMMER, () => {
    logger.info( `Server läuft auf http://localhost:${ PORT_NUMMER }` );
});
