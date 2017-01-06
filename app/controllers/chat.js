module.exports.index = function(application, req, res){
    var form = req.body;

    req.assert('apelido', 'Apelido é obrigatorio').notEmpty();
    req.assert('apelido', 'Apelido deve conter entre 5 e 15 caracteres').len(5,15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao : erros});
        return;
    }

    application.get('io').emit(
        'msgCliente',
        { apelido : form.apelido, mensagem : ' acabou de entrar no chat.' }
    );

    res.render('chat', {param : form } );
}