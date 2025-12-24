import { buildSchema } from "graphql";
import createLogger    from "logging";

const logger = createLogger( "graphql" );

// Schema definieren mit "GraphQL SDL". 
// Ausrufezeichen nach Typ steht für  Not-Null, [typ] für Listen.
// Es gibt folgende Datentypen: String, Int, Float, Boolean, ID (Strings als Schlüssel).
// Syntax-Checker: https://www.leskoff.com/s01929-0
export const buecherSchema = buildSchema(`

  type Buch {
    id: ID!
    titel: String!
    autor: String!
    jahr: Int
    genre: String
  }

  # "Query" ist der Obertyp für alle GraphQL-Anfragen
  type Query {

    # alle Buecher holen
    buecher: [Buch!]!

    # Buch anhand ID abfragen
    buch(id: ID!): Buch

    # Buch suchen
    sucheBuch(query: String!): [Buch!]!
  }
`);

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
