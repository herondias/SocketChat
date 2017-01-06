/* Import server config */

var application = require('./config/server');

var  port = 3000;

var server = application.listen(port, function(){
    console.log('Servidor On-line na porta ' + port);
});

var io = require('socket.io').listen(server);
application.set('io', io);

io.on('connection', function(socket){
    console.log('Usuário conectado!');


    socket.on('disconnect', function(){{
        console.log('Usuário desconectou!');
    }});

    socket.on('msgServidor', function(data){
        /* Eventos dos dialogos */
        socket.emit(
            'msgCliente', 
            { apelido : data.apelido, mensagem : data.mensagem }
        );
        socket.broadcast.emit(
            'msgCliente', 
            { apelido : data.apelido, mensagem : data.mensagem }
        );

        if(parseInt(data.apelidoAtualizadoCliente) == 0){
            /* relação de participantes */
            socket.emit(
                'participantesCliente', 
                { apelido : data.apelido }
            );
            socket.broadcast.emit(
                'participantesCliente', 
                { apelido : data.apelido }
            );
        }
    });
});