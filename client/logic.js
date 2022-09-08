/* var api = "http://api.giphy.com/v1/gifs/search?";
var apikey = "&api_key=dc6zaTOxFJmzC";
 */



var socket = io.connect();
const messageForm = document.querySelector('#messageForm');
const message = document.querySelector('#messageInput');
const chat = document.querySelector('#chat');
const messageArea = document.querySelector('#messageArea');
const userFormArea = document.querySelector('#userFormArea');
const users = document.querySelector('#users');
const username = document.querySelector('#username');
var url = null;

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('send message', message.value);
  message.value = '';
});

socket.on('new message', function (data) {
  // Generate Chat Box
  if(data.msg.length == 0){
    alert('Message is required!')
    throw 'Message is required!';
  }
  if (data.msg === '/happy') {
    fetch('http://localhost:3000/happy')
      .then(res => res.json())
      .then(function (res) {
        url = res.link;
        console.log(url);
        chat.innerHTML += '<div class="well"><strong>' + data.user + '</strong>:<img src="' + url + '" width=200 height=200/>' + '</div>';
      });
  } else if (data.msg === '/serena') {
    fetch('http://localhost:3000/serena')
      .then(res => res.json())
      .then(function (res) {
        url = res.link;
        console.log(url);
        chat.innerHTML += '<div class="well"><strong>' + data.user + '</strong>:<img src="' + url + '" width=200 height=200/>' + '</div>';
      });


  } else if (data.msg === '/goodnight') {
    fetch('http://localhost:3000/goodnight')
      .then(res => res.json())
      .then(function (res) {
        url = res.link;
        console.log(url);
        chat.innerHTML += '<div class="well"><strong>' + data.user + '</strong>:<img src="' + url + '" width=200 height=200/>' + '</div>';
      });
  } else if (data.msg === '/sad') {
    fetch('http://localhost:3000/sad')
      .then(res => res.json())
      .then(function (res) {
        url = res.link;
        console.log(url);
        chat.innerHTML += '<div class="well"><strong>' + data.user + '</strong>:<img src="' + url + '" width=200 height=200/>' + '</div>';
      });
  }
  else {
    chat.innerHTML += '<div class="well"><strong>' + data.user + '</strong>:' + data.msg + '</div>';
  }
  const chatHeight = chat.scrollHeight;
  chat.scrollTop = chatHeight;
});

userFormArea.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('new user', username.value, function (data) {

    if (data) {
      userFormArea.style.display = 'none';
      messageArea.style.display = 'block';
    }
  });

  username.value = '';
});

socket.on('get users', function (data) {
  var html = '';
  for (i = 0; i < data.length; i++) {
    html += '<li class="list-group-item">' + data[i] + '</li>';
    users.innerHTML += html;
  }
});



