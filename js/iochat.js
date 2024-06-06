$(document).ready(function() {
  const toggleButton = document.getElementById('toggleButton');
  const chat = document.getElementById('chat');

  toggleButton.addEventListener('click', () => {
    console.log("chat clicked");
    chat.classList.toggle('active');
  });
  
  //Console log to tell if iogames.fun is loading for you
  console.log('Loading IOGames.fun chat...');
  function chatMessage(type, options) {
      
    const name = $("<div></div>").addClass("name").text(options.name + ":");
    const message = $("<div></div>").addClass("message");

    /*-- I believe this is for the initial IOGames Bot (which has a bright green name) --*/
    if(type == "system") {
      name.addClass("system");
      message.html(options.message);
    }
    else {
      name.css({color : options.color});
      message.text(options.message);
    }
      
    let entry = $("<div></div>")
    .addClass("entry")
    .append(name)
    .append(message);
      
    $("#messages").prepend(entry);
    
    /*-- IOGames AMOUNT OF MESSAGES! --*/
    while($("#messages .entry").length > 1000) {
        $("#messages .entry").last().remove();
    }
  }
      
  let lastTime = null;

  /*-- IOGames Chat server (which uses wss websockets, which reminds me of socket.io) --*/
  const client = new Client("wss://iogames.fun/server", "@global", function(msg) {
    lastTime = new Date();      
    chatMessage("user", msg);
  });

  /*-- IOGames.fun Bot welcoming introduction --*/
  const welcomeInterval = setInterval(function() {
    const now = new Date();
    if(lastTime !== null) {
      if(now - lastTime > 1000) {
        clearInterval(welcomeInterval);
        chatMessage("system", {
          name : "tkrclient.fun",
          message : 'Thank you for using TKRClient! On the left side you can see an alternative chat if this one is being spammed or is uncomfortable. </a>'
        });
      }
    }
  }, 200);

  /*-- See message color? --*/
  function say() {
    if($("#name").val().length && $("#message").val().length) {
      client.send("message", {
        name : $("#name").val(),
        color : $("#colorpicker").css("color"),
        message : $("#message").val()
      });
      $("#message").val("");
    }
  }

  /*-- Color randomizer for the color palette icon AND name --*/
  $("#colorpicker").click(function(e) {
    client.chat.color("#" + Math.random().toString(16).slice(2, 8));
    e.preventDefault();
  });

  /*-- Initial Guest____ name with randomized numbers on the end PLUS randomized color when new to site --*/
  if(Cookies.get("name") === undefined || !Cookies.get("name").length) {
    client.chat.name("Guest" + Math.floor(Math.random() * 10000));
  }
  else {
    client.chat.name(Cookies.get("name"));
  }      
  if(Cookies.get("color") === undefined) {
    client.chat.color("#" + Math.random().toString(16).slice(2, 8));
  }
  else {
    client.chat.color(Cookies.get("color"));
  }
  $("#name").change(function() {
    Cookies.set("name", $(this).val(), { expires : 3650 });
  });
  $("#message").keydown(function(e) {
    if(e.which == 13) {
      say();
    }
  });

  $(".checkbox").click(function() {
    $(this).toggleClass("checked");
  });

  $(".layer").click(function(e) {
    $(this).fadeOut("fast", function() {
      $(".layer iframe").remove();
    });
    e.preventDefault();
  });

  /*-- I assume this is for the information on the navbar --*/
  $("[data-favorite]").click(function(e) {
    let gameId = parseInt($(this).data("favorite"));
    let favorites = Cookies.getJSON("favorites");
    if($(this).hasClass("icon-toggle-active")) {
      if(favorites !== undefined) {
        const index = favorites.indexOf(gameId);
        if(index !== -1) {
          favorites.splice(index, 1);
          Cookies.set("favorites", favorites, { expires: 3650 });
        }
      }
    }
  else {
    if(favorites === undefined) {
      favorites = [gameId];
    }
    else {
      favorites.push(gameId);
    }
  Cookies.set("favorites", favorites, { expires: 3650 });
  }

  $(this).parent().find(".icon-toggle").toggleClass("hide");  

  e.preventDefault();
  });
});