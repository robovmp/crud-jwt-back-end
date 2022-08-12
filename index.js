require ( 'dotenv' ).config();
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' )

const app = express();

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

app.use( cors() );

app.use( require( './src/routes' ) )

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5i2zp.mongodb.net/?retryWrites=true&w=majority`)
    .then( ()=>{
        app.listen( process.env.PORT || 3000 );
        console.log( 'Servidor conectado ao MongoDB' );
    } )
    .catch( ( error )=>{
        console.log( error );
    } ); 

