import { buildSchema } from "graphql";


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
    }
];


// Resolver sind die Funktionen, die GraphQL-Felder mit echten Daten verbinden. 
export const buecherResolver = {

    buecher: () => alleBuecher,

    buecher: ({id}) => alleBuecher.find( buch => buch.id == id ),

    sucheBuecher: ( queryString ) => {
        const queryStringNormalisiert = queryString.trim().toLowerCase();
        return alleBuecher.filter( buch =>
            buch.titel.toLowerCase().includes( queryStringNormalisiert ) ||
            buch.autor.toLowerCase().includes( queryStringNormalisiert )
        );
    }
};

