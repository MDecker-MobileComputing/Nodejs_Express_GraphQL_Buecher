import { buildSchema } from "graphql";
import { readFileSync } from "fs";
import createLogger    from "logging";

const logger = createLogger( "graphql" );

// Schema aus separater Datei einlesen
const schemaString = readFileSync( "src/schema.graphql", "utf8" );
export const buecherSchema = buildSchema( schemaString );
logger.info( "GraphQL-Schema geladen." );

const alleBuecherArray = [
    {
        id   : "1",
        titel: "Der Herr der Ringe",
        autor: "J.R.R. Tolkien",
        jahr : 1954,
        genre: "Fantasy"
    },{
        id   : "2",
        titel: "James Bond: Casino Royale",
        autor: "Ian Fleming",
        jahr : 1953,
        genre: "Thriller"
    }, {
        id   : "3",
        titel: "1984",
        autor: "George Orwell",
        jahr : 1949,
        genre: "Dystopie"
    }, {
        id   : "4",
        titel: "Der kleine Prinz",
        autor: "Antoine de Saint-Exupéry",
        jahr : 1943,
        genre: "Märchen"
    }, {
        id   : "5",
        titel: "A Game of Thrones",
        autor: "George R. R. Martin",
        jahr : 1996,
        genre: "Fantasy"
    }
];

logger.info( `Es sind ${ alleBuecherArray.length } Bücher im Katalog.` );


// Resolver sind die Implementierungen der CRUD-Operationen
export const buecherResolver = {

    buecher: () => alleBuecherArray,

    buch: ( {id} ) => alleBuecherArray.find( buch => buch.id == id ),

    sucheBuch: ( {query} ) => {

        const queryStringNormalisiert = query.trim().toLowerCase();
        return alleBuecherArray.filter( buch =>
            buch.titel.toLowerCase().includes( queryStringNormalisiert ) ||
            buch.autor.toLowerCase().includes( queryStringNormalisiert )
        );
    },

    buchDazu: ({ input }) => {

        const neueID = alleBuecherArray.length + 1;

        const buchNeu = { id: neueID, ...input };

        alleBuecherArray.push( buchNeu );

        const buchNeuJson = JSON.stringify( buchNeu );
        logger.info( `Neues Buch angelegt: ${buchNeuJson}` );

        return buchNeu;
    },

    buchLoeschen: ({ id }) => {

        const buchIndex = alleBuecherArray.findIndex( buch => buch.id === id );
        if ( buchIndex === -1 ) { 
        
            logger.warn( `Kein Buch mit ${id} zum Löschen gefunden.` );
            return false; 
        }
        alleBuecherArray.splice( buchIndex, 1 );

        logger.info( `Buch mit ${id} gelöscht.` );

        return true;
    }
};
