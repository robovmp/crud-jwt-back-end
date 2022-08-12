const Post = require( '../models/Post' );

module.exports ={
    async setPost ( req, res ){

        const { name, position, remuneration, area } = req.body;
        
        if( !name ) { 
            res.status( 422 ).json( { error: 'Nome requerido' } )
        }
    
        const post = { 
            name, 
            position,
            remuneration,
            area
        }
    
    
        try {
    
            await Post.create( post );
    
            res.status( 201 ).json( { mensagem: 'Post inserido' } );
            
        } catch (error) {
            res.status( 500 ).json( { error: error } );
        }
    
    },
    
    async getPost ( req, res ){
    
        try {
            const posts = await Post.find();
    
            res.status( 200 ).json( posts );
    
        } catch (error) {
    
            res.status( 500 ).json( { error: error } )
            
        }
    
    
    },
    
    async editPost ( req, res ){
    
        const id = req.body._id
    
        const { name, position, remuneration, area} = req.body
    
        const post = { 
            name, 
            position,
            remuneration,
            area
        }
    
        try {
    
            await Post.updateOne( { _id: id }, post );
    
            res.status( 200 ).json( post )
    
        } catch (error) {
            
            res.status( 500 ).json( { error: error } );
    
        }
    
    },
    
    async delPost ( req, res ){
    
        const id = req.params.id
    
        await Post.findOne( { _id:id } )
    
        try {
            await Post.deleteOne( { _id: id } )
    
            res.status( 200 ).json( { mensagem: 'Post deletado' } )
        } catch (error) {
            res.status( 500 ).json( { error: error } )
        }
    
    } 
}