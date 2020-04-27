document.addEventListener('DOMContentLoaded', function() {
    // Launch modal to get user
    $('#modalGetUser').modal('show');

    // Assign onclick handler for user modal
    document.getElementById('acceptModalGetUser').addEventListener('click', function() { get_user(); });
    //document.getElementById('acceptModalGetUser').onclick = get_user; // Alternative

    // Assign onkeyup handler for user modal
    document.getElementById('nicknameModalGetUser').addEventListener('keyup', function(event) { get_user_from_keyboard(event); });
});

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
    $('#modalGetUser').modal('hide');

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