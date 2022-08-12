const User = require( '../models/User' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

module.exports ={
    async register( req, res ){
        const { name, email, password, checkpassword } = req.body

        if( !name ){
            return res.status( 422 ).json( { msg: 'O nome é obrigatório!' } )
        }
        if( !email ){
            return res.status( 422 ).json( { msg: 'O email é obrigatório!' } )
        }
        if( !password ){
            return res.status( 422 ).json( { msg: 'A senha é obrigatória!' } )
        }
        if( !checkpassword ){
            return res.status( 422 ).json( { msg: 'A confirmação de senha é obrigatória!' } )
        }

        if( password !== checkpassword ){
            return res.status( 422 ).json( { msg: "Senha não confere!" } )
        }

        const userExist = await User.findOne( { email: email } );

        if( userExist ){
            return res.status( 422 ).json( { msg: "Por favor, utilize outro email!" } )
        }

        const salt = await bcrypt.genSalt( 12 );
        const passwordHash = await bcrypt.hash( password, salt );

        const user = new User( {
            name,
            email,
            password: passwordHash,
        } )
        try {
            
            await user.save()

        } catch ( error ) {
            console.log( error )
        }
        // console.log(name, email, password, checkpassword)
        return res.json( { msg: "Chegando"} )
    },

    async login( req, res ){
        const { email, password } = req.body

        if( !email ){
            return res.status( 422 ).json( { msg: 'O email é obrigatório!' } )
        }
        if( !password ){
            return res.status( 422 ).json( { msg: 'A senha é obrigatória!' } )
        }

        const user = await User.findOne( { email: email } );

        if( !user ){
            return res.status( 404 ).json( { msg: "Usuário não encontrado" } )
        }

        const authenticPassword = await bcrypt.compare( password, user.password )

        if( !authenticPassword ){
            return res.status( 422 ).json( { msg: "Senha inválida!" } )
        }

        try {
            const secret = process.env.SECRET_KEY

            const token = jwt.sign( {
                id: user._id
            },
                secret 
            )

            res.status( 200 ).json( { msg: 'Autenticado', token } )

        } catch ( error ) {
            console.log( error )

            res.status( 500 ).json( {
                msg: "Erro do servidor, aguarde ou tente novamente mais tarde!"
            } )
        }
    }
}