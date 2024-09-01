$(document).ready(function() {

  /* first chat = iogames fun chat */
  const toggleButtonChat = document.getElementById('toggleButtonChat');
  const chat = document.getElementById('chat');
  console.log("sidebar");
  const toggleButtonSidebar = document.getElementById('toggleButtonSidebar');
  const sidebars = document.getElementById('sidebars');
  console.log("sidebar again");
  const toggleButtonSidebarDesktop = document.getElementById('toggleButtonSidebarDesktop');
  const toggleButtonFullscreen = document.getElementById('toggleButtonFullscreen');
  console.log("toggleButtonFullscreen");
  /* second chat = chat.server.bzmb.eu / used to be minnit */
  const secondChatButton = document.getElementById('secondChatButton');
  const secondChatServer = document.getElementById('secondChatServer');
  console.log("secondChatServer");
  const secondChatButtonMobile = document.getElementById('secondChatButtonMobile');
  console.log("secondChatServerMobile");
  /* third chat = cbox ws */
  const thirdChatButton = document.getElementById('thirdChatButton');
  const thirdChatServer = document.getElementById('thirdChatServer');
  console.log("thirdChatServer");
  const thirdChatButtonMobile = document.getElementById('thirdChatButtonMobile');
  console.log("thirdChatServerMobile");

  /* first chat = iogames fun chat */
  toggleButtonChat.addEventListener('click', () => {
    console.log("button clicked");
    chat.classList.toggle('active');
  });
  /* toggleButtonChat.addEventListener('click', () => {
    console.log("button clicked");
    chatElements.forEach(chatElement => {
      chatElement.classList.toggle('active');
    });
  }); */
  console.log("side");
  toggleButtonSidebar.addEventListener('click', () => {
    console.log("button clicked");
    sidebars.classList.toggle('active');
  });
  console.log("side");
  toggleButtonSidebarDesktop.addEventListener('click', () => {
    console.log("button clicked");
    sidebars.classList.toggle('active');
  });
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  toggleButtonFullscreen.addEventListener('click', toggleFullscreen);
  /* second chat = chat.server.bzmb.eu / used to be minnit */
  // Second chat button
  secondChatButton.addEventListener('click', () => {
    console.log("button clicked");
    secondChatServer.classList.toggle('hide');
  });
  // Second chat button mobile
  secondChatButtonMobile.addEventListener('click', () => {
    console.log("button clicked");
    secondChatServer.classList.toggle('hide');
  });
  /* third chat = cbox ws */
  // Third chat button
  thirdChatButton.addEventListener('click', () => {
    console.log("button clicked");
    thirdChatServer.classList.toggle('hide');
  });
  // Third chat button mobile
  thirdChatButtonMobile.addEventListener('click', () => {
    console.log("button clicked");
    thirdChatServer.classList.toggle('hide');
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

  // modded-script
  (function() {

    /*---- Testing ----*/
    
    /*---- Higher char limits ----*/
    // Higher character limit for chat box
    const messageInput = document.getElementById('message'); {
      messageInput.setAttribute('maxlength', '1000'); // 400 character limit
    }
    // Higher character limit for name box
    const nameInput = document.getElementById('name'); {
      nameInput.setAttribute('maxlength', '1000'); // 400 character limit
    } 

    /*---- Name color changes ----*/
    var namecolor = document.getElementById('colorpicker');
    // Function (for some reason only loads after few seconds)
    function func() {
      //namecolor.style.removeProperty('all');
      // namecolor.style.color = 'rgb(255, 0, 0)'; // CHANGE COLOR HERE! <---------------------------
    }
    setTimeout(func, 3000);


    /*---- Click colors and names ----*/
    // Function (for some reason only loads after few seconds)
    function mess() {
      // Get the elements whose color and text you want to copy
      const sourceElements = document.querySelectorAll('#messages .entry .name');
      // Get the elements where you want to copy the color and text
      const targetColorElement = document.getElementById('colorpicker');
      const targetTextElement = document.getElementById('name');
      addClickListeners(sourceElements, targetColorElement, targetTextElement);
      // Set up a mutation observer to watch for new elements
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            const newSourceElements = document.querySelectorAll('#messages .entry .name');
            addClickListeners(newSourceElements, targetColorElement, targetTextElement);
          }
        });
      });
      // Start observing the #messages element for changes
      observer.observe(document.getElementById('messages'), { childList: true });
      function addClickListeners(elements, targetColorElement, targetTextElement) {
        elements.forEach(element => {
          element.addEventListener('click', () => {
            // Get the computed color of the source element
            const computedColor = window.getComputedStyle(element).color;
            // Convert the color to an RGB object
            const rgbColor = convertColorToRGB(computedColor);
            // Apply the color to the target element
            targetColorElement.style.color = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;

            // Copy the text content of the clicked element, removing the last character
            const innerText = element.textContent;
            if (innerText.length > 1) {
              targetTextElement.value = innerText.slice(0, -1);
            } else {
              targetTextElement.value = innerText;
            }
          });
        });
      }
      function convertColorToRGB(colorString) {
        // Remove the "rgb(" and ")" from the string
        const colorValues = colorString.slice(4, -1).split(', ');
        return {
          red: parseInt(colorValues[0]),
          green: parseInt(colorValues[1]),
          blue: parseInt(colorValues[2])
        };
      }
    }
    setTimeout(mess, 6000);


    /*---- Removing Unicode ----*/
    // Function (for some reason only loads after few seconds)
    function removeUnicodeFromElements() {
      console.log('Removing Unicode from elements...');
      // Get all the ".message" elements nested under the ".entry" class and "#messages" parent
      const messageElements = document.querySelectorAll('#messages .entry .message');
      messageElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
      // Get all the ".name" elements nested under the ".entry" class and "#messages" parent
      const nameElements = document.querySelectorAll('#messages .entry .name');
      nameElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
    }
    // Run the function to remove Unicode characters after a 3-second delay
    function toggleFunction(checkbox) {
      var func = document.getElementById("removeUnicodeFromElements");
      if (checkbox.checked) {
        func.disabled = false; // Enable the function
        // Start observing the "#messages" element for changes after a 3-second delay
        observer.observe(document.getElementById('messages'), { childList: true });
      } else {
        func.disabled = true; // Disable the function
        observer.observe(document.getElementById('messages'), { childList: false });
      }
    }
    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          console.log('New elements added, running Unicode removal...');
          removeUnicodeFromElements();
        }
      });
    });

      
    /* Keybindings for [ ] and \ to change colors */
    // Listen for the 'keypress' event on the document
    /*document.addEventListener('keypress', function(event) {
      // Check if the pressed key is the 'Enter' key
      function red() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(255, 0, 0)'; // red
      }
      function green() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 255, 0)'; // green
      }
      function blue() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 0, 255)'; // blue
      }
      if (event.key === '[') { // [
        // Call the function you want to activate
        red();
      }
      if (event.key === ']') { // ]
        // Call the function you want to activate
        green();
      }
      if (event.key === '\\') { // \
        // Call the function you want to activate
        blue();
      }
    });*/

    /*---- Next user blocking script ----*/

    // BLOCK USERS FEATURE
    'use strict';

    // Load blocked users from localStorage
    let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || ["a bot"];

    // Create the container for the blocked users list
    const blockedUsersList = document.querySelectorAll('.blockedUsersListClass');
    // Create the input box for blocking users
    const blockInput = document.querySelectorAll('.blockInputClass');
    // Create the input box for unblocking users
    const unblockInput = document.querySelectorAll('.unblockInputClass');
    // Create the button to unblock all users
    const unblockAllButton = document.querySelectorAll('.unblockAllButtonClass');
    // Add the color picker to the page
    const colorPicker = document.querySelectorAll('.colorPickerClass');


    // Function to update the blocked users list display
    function updateBlockedUsersList() {
      blockedUsersList.forEach(element => {
        element.textContent = 'Blocked Users:\n' + blockedUsers.join('\n');
      });
      localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }

    // Function to block a user
    function blockUser(username) {
        // Check if the username is "a bot"
        if (username.toLowerCase() === "a bot") {
            // Add "a bot" to the blockedUsers array
            blockedUsers.push(username);
            updateBlockedUsersList();
            filterMessages();

            // Log a message to the console
            console.log("The user 'a bot' has been blocked");
            return;
        }

        if (!blockedUsers.includes(username)) {
            blockedUsers.push(username);
            updateBlockedUsersList();
            filterMessages();
        }
    }

    // Function to unblock a user
    function unblockUser(username) {
        blockedUsers = blockedUsers.filter(user => user !== username);
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock all users
    function unblockAllUsers() {
        blockedUsers = ["a bot"];
        updateBlockedUsersList("a bot");
        filterMessages();
    }

    // Function to filter messages from blocked users
    function filterMessages() {
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            const messageEntries = messagesContainer.querySelectorAll('.entry');
            messageEntries.forEach(entry => {
                const usernameElement = entry.querySelector('.name');
                if (usernameElement && blockedUsers.includes(usernameElement.textContent.replace(':', '').trim())) {
                    entry.style.display = 'none';
                } else {
                    entry.style.display = '';
                }
            });
        }
    }

    // Event listener for blocking users
    blockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    blockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener for unblocking users
    unblockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    unblockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener for unblocking all users
    unblockAllButton.forEach(button => {
        button.addEventListener('click', unblockAllUsers);
    });

    // Observe the messages container for new messages
    const observer2 = new MutationObserver(() => filterMessages());
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        observer2.observe(messagesContainer, { childList: true, subtree: true });
    }

    // Initial call to display the blocked users and filter messages
    updateBlockedUsersList("a bot");
    filterMessages();

    // Function to update the username color
    function updateUsernameColor(event) {
        const nameColor = document.getElementById('colorpicker');
        nameColor.style.removeProperty('all');
        nameColor.style.color = event.target.value;
    }

    // Add event listener to the color picker
    colorPicker.forEach(picker => {
        picker.addEventListener('input', updateUsernameColor);
    });

    // Optionally, set an initial color
    /* colorPicker.value = '#ff0000'; // Red
    updateUsernameColor({target: {value: colorPicker.value}}); */

/* BACKGROUNDS JS */
// Remove the background first variable
const elementToRemove = document.querySelectorAll('#video-background');

// Pick which background variables
const videoUrls = {
  b1: 'https://cdn.pixabay.com/video/2024/05/29/214405_large.mp4',
  b2: 'https://cdn.pixabay.com/video/2024/06/08/215762_large.mp4',
  b3: 'https://cdn.pixabay.com/video/2024/03/01/202587-918431513_large.mp4',
  b4: 'https://cdn.pixabay.com/video/2021/04/15/71122-537102350_large.mp4',
  b5: 'https://cdn.pixabay.com/video/2021/10/10/91562-629172467_large.mp4',
  b6: 'https://cdn.pixabay.com/video/2019/10/09/27669-365224683_large.mp4'
};

// Remove background
const rem = document.querySelector('.rem');

// Function to remove existing video-background elements
function removeVideoBackground() {
  const existingVideos = document.querySelectorAll('#video-background');
  existingVideos.forEach(video => {
    video.remove();
  });
}

// Function to create a new video-background element
function createVideoBackground(videoUrl) {
  var video = document.createElement('video');
  video.id = 'video-background';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.style.opacity = 0.6;
  var source = document.createElement('source');
  source.src = videoUrl;
  source.type = 'video/mp4';
  video.appendChild(source);
  document.body.insertBefore(video, document.body.firstChild);
}

// Event listener function for background changes
function changeBackground(event) {
  const videoKey = event.target.classList[0];
  const videoUrl = videoUrls[videoKey];

  if (videoUrl) {
    removeVideoBackground();
    createVideoBackground(videoUrl);
    localStorage.setItem('lastBackground', videoKey); // Store the last clicked background
  }
}

// Add event listeners to background elements
const backgroundElements = document.querySelectorAll('.b1, .b2, .b3, .b4, .b5, .b6');
backgroundElements.forEach(element => {
  element.addEventListener('click', changeBackground);
});

// noBackground variable
const noBackground = removeVideoBackground();

// Remove background click
function remchange() {
  removeVideoBackground();
  localStorage.removeItem('lastBackground'); // Remove the stored last background
  localStorage.setItem('noBackground', noBackground); // Store the last "no background" option
}

rem.addEventListener('click', remchange);

// Load the last clicked background on page load
window.addEventListener('load', () => {
  const lastBackground = localStorage.getItem('lastBackground');
  const noBackground = localStorage.getItem('noBackground');
  if (lastBackground && videoUrls[lastBackground]) {
    createVideoBackground(videoUrls[lastBackground]);
  } else if (noBackground) {
    removeVideoBackground();
  } else {
    // If no last background is stored, load background 5
    createVideoBackground(videoUrls['b5']);
  }
});

    /* GIF AUTOMATIC LOADING SUPPORT */
    setTimeout(function() {
      const messages = document.querySelectorAll('.message');

      function convertGifUrlToImage(message) {
        const text = message.textContent.trim();
        const regex = /https?:\/\/\S+\.(gif)/i;
        const match = text.match(regex);

        if (match) {
          const img = document.createElement('img');
          img.src = match[0];
          img.style.maxWidth = '200px'; // Set the max-width to 100%
          message.innerHTML = '';
          message.appendChild(img);
        }
      }

      messages.forEach(convertGifUrlToImage);
    }, 3000);

})();

});
