import { buildSchema } from "graphql";
import { readFileSync } from "fs";
import createLogger    from "logging";

const logger = createLogger( "graphql" );

// Schema aus separater Datei einlesen
const schemaString = readFileSync( "src/schema.graphql", "utf8" );
export const buecherSchema = buildSchema( schemaString );
logger.info( "GraphQL-Schema geladen." );

const alleBuecher = [
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

logger.info( `Es sind ${ alleBuecher.length } Bücher im Katalog.` );


// Resolver sind die Funktionen, die GraphQL-Felder mit echten Daten verbinden. 
export const buecherResolver = {

    buecher: () => alleBuecher,

    buch: ({id}) => alleBuecher.find( buch => buch.id == id ),

    sucheBuch: ( {query} ) => {
        const queryStringNormalisiert = query.trim().toLowerCase();
        return alleBuecher.filter( buch =>
            buch.titel.toLowerCase().includes( queryStringNormalisiert ) ||
            buch.autor.toLowerCase().includes( queryStringNormalisiert )
        );
    }
};
