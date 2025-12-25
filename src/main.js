import createLogger    from "logging";
import express         from "express";
import { graphqlHTTP } from "express-graphql";

import { buecherSchema, buecherResolver } from "./graphql.js";


const PORT_NUMMER = 8080;

const logger = createLogger( "main" );

const app = express();

app.use( express.static( "public" ) );

app.use( "/graphql", graphqlHTTP({
    schema   : buecherSchema,
    rootValue: buecherResolver,
    graphiql : true // damit bei Browser-Request GraphQL-Test-Client ausgeliefert wird
}));

app.listen( PORT_NUMMER, () => {
    logger.info( `Server läuft auf http://localhost:${ PORT_NUMMER }` );
});
