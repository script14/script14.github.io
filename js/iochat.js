$(document).ready(function() {

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // iogames //                                                                                                          //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
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
	
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // modded script for io //                                                                                             //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
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

    // Convert the pattern into a regex
    const regexPattern = pattern.replace(/\*/g, '.*'); // Replace '*' with '.*' for regex
    const regex = new RegExp(`^${regexPattern}`, 'i'); // Create a case-insensitive regex

    // Check if the username matches the regex
    if (regex.test(username)) {
        console.log(`The username '${username}' has been blocked due to matching the pattern '${pattern}'.`);
        blockedUsers.push(username);
        updateBlockedUsersList();
        filterMessages();
        return;
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
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // dimden chat //                                                                                                      //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return ((_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    }
    : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }
    ),
    _typeof(obj));
}
var rectLeft = 80;
function _regeneratorRuntime() {
    "use strict";
    /*!regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE*/
    _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    }
    ;
    var exports = {}
      , Op = Object.prototype
      , hasOwn = Op.hasOwnProperty
      , defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }
      , $Symbol = "function" == typeof Symbol ? Symbol : {}
      , iteratorSymbol = $Symbol.iterator || "@@iterator"
      , asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator"
      , toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return (Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
        }),
        obj[key]);
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return (obj[key] = value);
        }
        ;
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator
          , generator = Object.create(protoGenerator.prototype)
          , context = new Context(tryLocsList || []);
        return (defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context),
        }),
        generator);
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf
      , NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
    function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg
                  , value = result.value;
                return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    (result.value = unwrapped),
                    resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    }
                    );
                }
                return (previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg());
            },
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state)
                throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method)
                    throw arg;
                return doneResult();
            }
            for (context.method = method,
            context.arg = arg; ; ) {
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel)
                            continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method)
                    context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state)
                        throw ((state = "completed"),
                        context.arg);
                    context.dispatchException(context.arg);
                } else
                    "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (((state = context.done ? "completed" : "suspendedYield"),
                    record.arg === ContinueSentinel))
                        continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && ((state = "completed"),
                (context.method = "throw"),
                (context.arg = record.arg));
            }
        }
        ;
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method
          , method = delegate.iterator[methodName];
        if (undefined === method)
            return ((context.delegate = null),
            ("throw" === methodName && delegate.iterator["return"] && ((context.method = "return"),
            (context.arg = undefined),
            maybeInvokeDelegate(delegate, context),
            "throw" === context.method)) || ("return" !== methodName && ((context.method = "throw"),
            (context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")))),
            ContinueSentinel);
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type)
            return ((context.method = "throw"),
            (context.arg = record.arg),
            (context.delegate = null),
            ContinueSentinel);
        var info = record.arg;
        return info ? info.done ? ((context[delegate.resultName] = info.value),
        (context.next = delegate.nextLoc),
        "return" !== context.method && ((context.method = "next"),
        (context.arg = undefined)),
        (context.delegate = null),
        ContinueSentinel) : info : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]),
        2 in locs && ((entry.finallyLoc = locs[2]),
        (entry.afterLoc = locs[3])),
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        (record.type = "normal"),
        delete record.arg,
        (entry.completion = record);
    }
    function Context(tryLocsList) {
        (this.tryEntries = [{
            tryLoc: "root"
        }]),
        tryLocsList.forEach(pushTryEntry, this),
        this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod)
                return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next)
                return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1
                  , next = function next() {
                    for (; ++i < iterable.length; )
                        if (hasOwn.call(iterable, i))
                            return (next.value = iterable[i]),
                            (next.done = !1),
                            next;
                    return (next.value = undefined),
                    (next.done = !0),
                    next;
                };
                return (next.next = next);
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return ((GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0,
    }),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction")),
    (exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return (!!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)));
    }
    ),
    (exports.mark = function(genFun) {
        return (Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : ((genFun.__proto__ = GeneratorFunctionPrototype),
        define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun);
    }
    ),
    (exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }
    ),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList),PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }
    ),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function() {
        return this;
    }),
    define(Gp, "toString", function() {
        return "[object Generator]";
    }),
    (exports.keys = function(val) {
        var object = Object(val)
          , keys = [];
        for (var key in object)
            keys.push(key);
        return (keys.reverse(),
        function next() {
            for (; keys.length; ) {
                var key = keys.pop();
                if (key in object)
                    return (next.value = key),
                    (next.done = !1),
                    next;
            }
            return (next.done = !0),
            next;
        }
        );
    }
    ),
    (exports.values = values),
    (Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = undefined),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = undefined),
            this.tryEntries.forEach(resetTryEntry),
            !skipTempReset))
                for (var name in this)
                    "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type)
                throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done)
                throw exception;
            var context = this;
            function handle(loc, caught) {
                return ((record.type = "throw"),
                (record.arg = exception),
                (context.next = loc),
                caught && ((context.method = "next"),
                (context.arg = undefined)),
                !!caught);
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                  , record = entry.completion;
                if ("root" === entry.tryLoc)
                    return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc")
                      , hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc)
                            return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc)
                            return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc)
                            return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally)
                            throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc)
                            return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return ((record.type = type),
            (record.arg = arg),
            finallyEntry ? ((this.method = "next"),
            (this.next = finallyEntry.finallyLoc),
            ContinueSentinel) : this.complete(record));
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type)
                throw record.arg;
            return ("break" === record.type || "continue" === record.type ? (this.next = record.arg) : "return" === record.type ? ((this.rval = this.arg = record.arg),
            (this.method = "return"),
            (this.next = "end")) : "normal" === record.type && afterLoc && (this.next = afterLoc),
            ContinueSentinel);
        },
        finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc)
                    return (this.complete(entry.completion, entry.afterLoc),
                    resetTryEntry(entry),
                    ContinueSentinel);
            }
        },
        catch: function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return ((this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
            }),
            "next" === this.method && (this.arg = undefined),
            ContinueSentinel);
        },
    }),
    exports);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this
          , args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        }
        );
    }
    ;
}
function _slicedToArray(arr, i) {
    return (_arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest());
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : ("undefined" != typeof Symbol && arr[Symbol.iterator]) || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (((_x = (_i = _i.call(arr)).next),
            0 === i)) {
                if (Object(_i) !== _i)
                    return;
                _n = !1;
            } else
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value),
                _arr.length !== i); _n = !0)
                    ;
        } catch (err) {
            (_d = !0),
            (_e = err);
        } finally {
            try {
                if (!_n && null != _i["return"] && ((_r = _i["return"]()),
                Object(_r) !== _r))
                    return;
            } finally {
                if (_d)
                    throw _e;
            }
        }
        return _arr;
    }
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
        return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || (allowArrayLike && o && typeof o.length === "number")) {
            if (it)
                o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length)
                        return {
                            done: true
                        };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e2) {
                    throw _e2;
                },
                f: F,
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e3) {
            didErr = true;
            err = _e3;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null)
                    it["return"]();
            } finally {
                if (didErr)
                    throw err;
            }
        },
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o)
        return;
    if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
        n = o.constructor.name;
    if (n === "Map" || n === "Set")
        return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
        len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
    return arr2;
}
var spoilers_ahead = "Easter egg spoilers ahead!!!!";
function isMobile() {
    var match = window.matchMedia || window.msMatchMedia;
    if (match) {
        var mq = match("(pointer:coarse)");
        return mq.matches;
    }
    return false;
}
var cookies = {};
document.cookie.split(";").forEach(function(cookie) {
    var _cookie$split = cookie.split("=")
      , _cookie$split2 = _slicedToArray(_cookie$split, 2)
      , key = _cookie$split2[0]
      , value = _cookie$split2[1];
    cookies[key.trim()] = value;
});


var relativeTimePeriods = [[31536000, "year"], [2419200, "month"], [604800, "week"], [86400, "day"], [3600, "hour"], [60, "minute"], [1, "second"], ];
var relativeTimePeriodsShort = [[31536000, "y"], [2419200, "m"], [604800, "w"], [86400, "d"], [3600, "h"], [60, "m"], [1, "s"], ];
function relativeTime(date, period, short) {
    if (!period)
        period = relativeTimePeriods;
    if (!(date instanceof Date))
        date = new Date(date * 1000);
    var seconds = (new Date() - date) / 1000;
    var _iterator = _createForOfIteratorHelper(period), _step;
    try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2)
              , secondsPer = _step$value[0]
              , name = _step$value[1];
            if (seconds >= secondsPer) {
                var amount = Math.floor(seconds / secondsPer);
                if (short)
                    return "".concat(amount).concat(name);
                return "".concat(amount, " ").concat(name).concat(amount && amount !== 1 ? "s" : "", " ago");
            }
        }
    } catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }
    return "Just now";
}

var text = "";
var pon = false;

var chatclient, chatJoin = 0, currentId = undefined;
var cursors = [];
var ignoreLocals = 0;

function escapeHTML(unsafe) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "’");
}
if (localStorage.admin) {
    document.getElementById("messages2").maxLength = 99999;
}
var isTabFocused = true;
function connectChat() {
    client = new WebSocket("wss://dimden.dev/services/chat/");
    client.binaryType = "arraybuffer";
    client.onmessage = function(msg) {
        if (typeof msg.data !== "string") {
            var data = new Int32Array(msg.data);
            var id = data[0];
            var x = data[1];
            var y = data[2];
            var h = data[3];
            x = Math.min(x, innerWidth - rectLeft - 50);
            y = Math.min(y, window.document.body.clientHeight - 100);
            if (id === currentId)
                return;
            var _c2 = cursors.find(function(c) {
                return c.id === id;
            });
            if (!_c2) {
                _c2 = {
                    id: id,
                    x: x,
                    y: y,
                    h: h,
                };
            }
            _c2.x = x;
            _c2.y = y;
            _c2.h = h;
            _c2.lastMove = Date.now();
            var ratio = document.body.clientHeight / h;
            //_c2.cursor.style.left = x + "px";
            //_c2.cursor.style.top = y * ratio + "px";
            //_c2.cursor.hidden = false;
            if (x === 0 && y === 0)
                _c2.cursor.hidden = true;
            else
                _c2.cursor.hidden = false;
            return;
        }
        if (msg.data.length === 0)
            return;
        if (msg.data.startsWith("Your ID: ")) {
            currentId = +msg.data.split(": ")[1];
            return;
        }
        if (msg.data.startsWith("Joined: ")) {
            var _msg$data$split$1$spl = msg.data.split(": ")[1].split(",").map(Number)
              , _msg$data$split$1$spl2 = _slicedToArray(_msg$data$split$1$spl, 4)
              , _joinedId = _msg$data$split$1$spl2[0]
              , _x2 = _msg$data$split$1$spl2[1]
              , _y = _msg$data$split$1$spl2[2]
              , _h = _msg$data$split$1$spl2[3];
        }
        if (msg.data.startsWith("Left: ")) {
            var leftId = +msg.data.split(": ")[1];
            if (leftId === currentId)
                return;
            var _cursor2 = document.getElementById("cursor-".concat(leftId));
            if (_cursor2) {
                _cursor2.remove();
            }
            cursors = cursors.filter(function(c) {
                return c.id !== leftId;
            });
            return;
        }
        var admin = msg.data.startsWith("!");
        var name = document.createElement("span");
        name.innerText = msg.data.split(">")[0] + "> ";
        name.textContent = msg.data.split(">")[0] + "> ";
        name.className = "chat-name";
        if (admin)
            name.className = "chat-name chat-name-admin";
        if (name.textContent.endsWith("[D]> ") && !admin)
            name.className = "chat-name chat-name-discord";
        if (msg.data.startsWith("<LOCAL>")) {
            if (ignoreLocals > Date.now() && !msg.data.includes("Disconnected"))
                return;
            name.className = "chat-name chat-name-local";
        } else {
            if (!isTabFocused || document.activeElement.id !== "messages2") {
                if (Date.now() - chatJoin > 2500 && localStorage.mutechat != "1")
                    newmsgsound.play();
            }
        }
        var text = document.createElement("span");
        text.innerHTML = admin ? msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | ") : escapeHTML(msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | "));
        text.innerHTML = text.innerHTML.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g, "<a href='$1' target='_blank'>$1</a>");
        text.innerHTML = text.innerHTML.replace(/(?:&lt;|<):([A-Z-a-z\-_~0-9]+?):([0-9]+)(?:&gt;|>)/g, '<img class="emote" title="$1" src="https://cdn.discordapp.com/emojis/$2.png?v=1">');
        text.innerHTML = text.innerHTML.replace(/(?:&lt;|<)a:([A-Z-a-z\-_~0-9]+?):([0-9]+)(?:&gt;|>)/g, '<img class="emote" title="$1" src="https://cdn.discordapp.com/emojis/$2.gif?v=1">');
        text.className = "chat-msg ".concat(msg.data.startsWith("<LOCAL>") ? "chat-msg-local" : "");
        var date = document.createElement("span");
        var d = new Date(+msg.data.split(" | ").slice(-1));
        var rd = new Date();
        date.innerText = " " + (rd.getDate() === d.getDate() ? d.toLocaleTimeString() : d.toLocaleString());
        date.textContent = " " + (rd.getDate() === d.getDate() ? d.toLocaleTimeString() : d.toLocaleString());
        date.className = "chat-date";
        try {
            date.title = "".concat(new Date(+msg.data.split(" | ").slice(-1)).toLocaleTimeString([], {
                timeZone: "Europe/Kiev",
                hour12: false,
            }), " in Ukraine");
        } catch (e) {}
        var message2 = document.createElement("div");
        message2.className = "chat-message";
        var messages = document.getElementById("messages2");
        message2.appendChild(name);
        message2.appendChild(text);
        message2.appendChild(date);
        messages.appendChild(message2);
        setTimeout(function() {
            if (messages.scrollHeight - messages.scrollTop < 300 || Date.now() - chatJoin < 5000)
                messages.scrollTop = messages.scrollHeight;
        });
        if (messages.childElementCount > 100) {
            messages.firstChild.remove();
        }
    }
    ;
    client.onopen = function() {
        chatJoin = Date.now();
        setTimeout(function() {
            if (localStorage.admin) {
                client.send(JSON.stringify({
                    operation: "admin",
                    value: localStorage.admin,
                }));
            }
            if (localStorage.nick) {
                client.send(JSON.stringify({
                    operation: "nick",
                    value: localStorage.nick,
                }));
            }
        }, 100);
    }
    ;
    client.onclose = function() {
        currentId = undefined;
        var messages = document.getElementById("messages2");
        messages.innerText = "";
        messages.textContent = "";
        if (client.onmessage) {
            client.onmessage({
                data: "<LOCAL> Disconnected from chat. | ".concat(Date.now()),
            });
        }
        setTimeout(connectChat, 1000);
        var _iterator3 = _createForOfIteratorHelper(cursors), _step3;
        try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var _c3 = _step3.value;
                _c3.cursor.remove();
            }
        } catch (err) {
            _iterator3.e(err);
        } finally {
            _iterator3.f();
        }
        cursors = [];
    }
    ;
}
setInterval(function() {
    if (client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify({
            operation: "ping",
            value: Date.now().toString(),
        }));
}, 1000);
connectChat();
let lastMessageSentDate = 0;

document.getElementById("send").onclick = function() {
    var msg = document.getElementById("message2").value;
    if (msg.startsWith("/nick ")) {
        localStorage.setItem("nick", msg.slice(6));
        client.send(JSON.stringify({
            operation: "nick",
            value: msg.slice(6),
        }));
    } else if (msg.startsWith("/ban ")) {
        client.send(JSON.stringify({
            operation: "ban",
            value: msg.slice(5),
        }));
    } else if (msg.startsWith("/unban ")) {
        client.send(JSON.stringify({
            operation: "unban",
            value: msg.slice(7),
        }));
    } else {
        if (msg.startsWith("/"))
            return;
        if (Date.now() - lastMessageSentDate < 1000)
            return;
        lastMessageSentDate = Date.now();
        client.send(JSON.stringify({
            operation: "send",
            value: msg,
        }));
    }
    document.getElementById("message2").value = "";
}
;

document.getElementById("send").onclick = function() {
    var msg = document.getElementById("messages2").value;
    if (msg.startsWith("/nick ")) {
        localStorage.setItem("nick", msg.slice(6));
        client.send(JSON.stringify({
            operation: "nick",
            value: msg.slice(6),
        }));
    } else if (msg.startsWith("/ban ")) {
        client.send(JSON.stringify({
            operation: "ban",
            value: msg.slice(5),
        }));
    } else if (msg.startsWith("/unban ")) {
        client.send(JSON.stringify({
            operation: "unban",
            value: msg.slice(7),
        }));
    } else {
        if (msg.startsWith("/"))
            return;
        if (Date.now() - lastMessageSentDate < 1000)
            return;
        lastMessageSentDate = Date.now();
        client.send(JSON.stringify({
            operation: "send",
            value: msg,
        }));
    }
    document.getElementById("messages2").value = "";
}
;
document.getElementById("messages2").onkeydown = function(e) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
        document.getElementById("send").click();
    }
}
;
function getRects() {
    var b00 = document.getElementById("mainbox").getBoundingClientRect();
    var b01 = document.getElementById("linksdiv").getBoundingClientRect();
    window.rectLeft = b00.left;
    window.rectRight = b01.right;
    window.rectTop = b00.top;
    window.rectWidth = rectRight - rectLeft;
    window.rectHeight = document.body.clientHeight;
}
getRects();
window.addEventListener("resize", getRects, {
    passive: true,
});
window.addEventListener("scroll", getRects, {
    passive: true,
});
setInterval(getRects, 1000);
window.xPercent = 0;
window.yPercent = 0;
var lastSend = Date.now();
document.addEventListener("mousemove", function(e) {
    if (cursorHidden || mobile)
        return;
    var x = e.pageX - rectLeft;
    var y = e.pageY - rectTop - window.scrollY;
    if (Date.now() - lastSend > 25 && client.readyState === WebSocket.OPEN) {
        lastSend = Date.now();
        var ab = new Int16Array(3);
        ab[0] = x;
        ab[1] = y;
        ab[2] = document.body.clientHeight;
        client.send(ab);
    }
}, {
    passive: true,
});
var mutechat = document.getElementById("mutechat");
mutechat.checked = localStorage.mutechat === "1";
mutechat.addEventListener("change", function() {
    if (mutechat.checked) {
        localStorage.mutechat = 1;
    } else {
        delete localStorage.mutechat;
    }
});
});
