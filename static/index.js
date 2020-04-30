document.addEventListener('DOMContentLoaded', function() {
    // Launch modal to get user
    show_modal_get_user();

    // Assign onclick handler to close user modal
    document.getElementById('acceptModalGetUser').addEventListener('click', function() { get_user(); });
    //document.getElementById('acceptModalGetUser').onclick = get_user; // Alternative

    // Assign onkeyup handler to close user modal
    document.getElementById('nicknameModalGetUser').addEventListener('keyup', function(event) { get_user_from_keyboard(event); });

    // Assign onclick handler to open channel modal
    document.getElementById('openModalNewChannel').addEventListener('click', function() { show_modal_new_channel(); });
    //document.getElementById('openModalNewChannel').onclick = show_modal_new_channel; // Alternative

    // Assign onclick handler to close channel modal
    document.getElementById('acceptModalNewChannel').addEventListener('click', function() { get_channel(); });
    //document.getElementById('acceptModalNewChannel').onclick = get_channel; // Alternative

    // Assign onkeyup handler to close channel modal
    document.getElementById('nameModalNewChannel').addEventListener('keyup', function(event) { get_channel_from_keyboard(event); });

    // Assign onclick handler to join channel buttons
    var channels = document.getElementsByClassName('channel');
    for (var i in channels) {
        channels[i].onclick = join_channel;
    }

    // Assign onclick handler to send message buttons
    document.getElementById('sendMessageButton').addEventListener('click', function() { send_message(); });
});

const message_template = Handlebars.compile(document.getElementById('message_template').innerHTML);

function show_modal_get_user() {
    $('#modalGetUser').modal('show');
}

function hide_modal_get_user() {
    $('#modalGetUser').modal('hide');
}

function show_modal_new_channel() {
    $('#modalNewChannel').modal('show');
}

function hide_modal_new_channel() {
    $('#modalNewChannel').modal('hide');
}

/**
 * Get the nickname from the user with ENTER key
 */
function get_user_from_keyboard(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        
        // Trigger the button element with a click
        document.getElementById("acceptModalGetUser").click();
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

/**
 * Get the nickname from the user
 */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
function get_user() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    // Get nickname from the modal
    const nickname = document.querySelector('#nicknameModalGetUser').value

    // Hide the modal
    hide_modal_get_user();

    // Insert the new nickname in the DOM
    document.querySelector('#header-lateral-nickname').innerHTML = nickname;

    /* Send the nickname back to the server */
    // Create request and open it                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    const request = new XMLHttpRequest();
    request.open('POST', '/store-nickname');

    // Add data to send with request
    const data = new FormData();// Send the data//
    data.append('nickname', nickname);

    // Send the data
    request.send(data);
}

/**
 * Get the channel name from the user with ENTER key
 */
function get_channel_from_keyboard(event) {
    // Number 13 is the "Enter" key on the keyboard                                                                                                                 
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        
        // Trigger the button element with a click
        document.getElementById("acceptModalNewChannel").click();
    }
}

/**
 * Get the channel name from the user
 */
function get_channel() {
    // Get nickname from the modal
    const channelName = document.querySelector('#nameModalNewChannel').value

    // Hide the modal
    hide_modal_new_channel();

    // Create new item for the channel
    const button = document.createElement('button');
    button.innerHTML = channelName;
    button.id = channelName;
    button.className = "btn btn-link";
    button.type = "button";
    button.onclick = join_channel;

    const div = document.createElement('div');
    div.append(button);

    // Insert the new channel in the DOM
    document.querySelector('#newChannels').append(div);

    /* Send the channel back to the server */
    // Create request and open it
    const request = new XMLHttpRequest();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    request.open('POST', '/add-channel');

    // Add data to send with request
    const data = new FormData();
    data.append('channel_name', channelName);

    // Send the data
    request.send(data);
}

/**
 * Join a channel
 */
function join_channel() {
    // Insert the new channel in the DOM
    document.getElementById('header-lateral-channel').innerHTML = this.id;

    // Set current channel and retrieve past messages


}

/**
 * Send a message
 */
function send_message() {
    // Read message
    message_text = document.getElementById('message').value;

    // Read Nickname
    message_user = document.querySelector('#header-lateral-nickname').innerHTML;

    // Add message to the DOM
    const message = message_template({'message_user': message_user, 'message_text': message_text});
    document.getElementById('newMessages').innerHTML += message;
}