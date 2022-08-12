const express = require( 'express' );
const {Router} = require( 'express' );

const User = require( './models/User' );

const routes = new express.Router();

const checkToken = require( './middlewares/checkToken' );

const UserController = require( './controllers/UserController' );

const PostController = require( './controllers/PostController' );

routes.get('/', (req, res) =>{
    return res.json({ msg: 'Tudo certo' })
})

routes.get('/user/:id', checkToken,  async (req, res) =>{
    const id = req.params.id

    const user = await User.findById( id, '-password' )

    if( !user ){
        return res.status( 404 ).json( { msg: 'Usuário não encontrado' } )
    }
    
    res.status( 200 ).json( { user } )
})

routes.post( '/auth/register', UserController.register );
routes.post( '/auth/login', UserController.login );

routes.get( '/auth/', checkToken, PostController.getPost );
routes.post( '/auth/post', checkToken, PostController.setPost );
routes.put( '/auth/post/:id', checkToken, PostController.editPost );
routes.delete( '/auth/post/:id', checkToken, PostController.delPost );


module.exports = routes;