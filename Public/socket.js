/**
 * Change with your ip address + the server port
 */
const socket = io('http://192.168.0.25:3333');

function renderMessage(message) {
    $('#messages').append(`<li class="list-group-item"><strong>${message.author}:</strong> ${message.content}</li>`);
}

socket.on('previous-messages', function (messages) {
    for (message of messages) {
        renderMessage(message);
    }
});

socket.on('receive-message', function (message) {
    renderMessage(message);
});

$('#chat').submit(function (event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var content = $('textarea[name=message]').val();

    if (author.length && content.length) {
        var messageObj = { author, content }
    }

    renderMessage(messageObj);

    socket.emit('send-message', messageObj);
});
