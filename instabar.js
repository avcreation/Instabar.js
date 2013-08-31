/*===================================
= InstaBar.js                       =
= GPL2 licence                      =
= Created by Alexandre Voiney       =
= V.1 - juillet 2013                =
===================================*/

function Instabar(options) {
  // Default parameters
  this.parameters={
    "access_token": "",
    "selector": "instabar",
    'quality': "thumbnail",
    'caption': true,
    'likes': true,
    'user_id': "",
  };

  // Override defaults
  for(param in options) {
    this.parameters[param] = options[param]
  }

  // Create a unique ID for each instance
  this.instance_id = this._getUniqueID();
}

Instabar.prototype = {
  _getUniqueID: function() {
    var text = "";
    var choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += choices.charAt(Math.floor(Math.random() * choices.length));

    return text;
  },
  display: function(res){
    // Check success or not
    if(res.meta.code == 200) {
      // Get the HTML element wanted by the user
      var container = document.getElementById(this.parameters.selector);

      // Create the 'Instabar' element
      var insta_bar = document.createElement("div");
      insta_bar.style.textAlign = "center";
      // Fill the container with it
      container.appendChild(insta_bar);

      // Fetch the result
      var data = res.data;
      for(i=0 ; i < data.length ; ++i) {
        // Create the wrapping link of the img HTML element
        var image_a = document.createElement("a");
        image_a.href = data[i].link;
        image_a.target = "_blank";

        // Create the img HTML element
        var image_img = document.createElement("img");
        image_img.src = data[i].images[this.parameters.quality].url;
        image_img.className = "insta-pict";

        // Add the likes count
        if(this.parameters.likes) {
          var likes_count = data[i].likes.count;
          var likes = document.createElement("div");
          likes.className = "likes-count";
          likes.innerHTML = "<strong class='symbol'>&#xe044;</strong>" + likes_count;
          image_a.appendChild(likes);
        }

        // Add alt text and if there is a title, create caption
        if(data[i].caption !== null){
          image_img.alt = data[i].caption.text;

          if(this.parameters.caption){
            var caption = document.createElement("div");
            caption.className = "insta-caption";
            caption.innerHTML = data[i].caption.text.substr(0, 30) + "...";
            // Add the caption inside the "a" HTML element
            image_a.appendChild(caption);
          }
        }else{
          image_img.alt = data[i].id;
        }

        // Wrap the image with the link
        image_a.appendChild(image_img);
        image_a.style.position = "relative";
        image_a.className = "insta-link";

        // Fill the 'Instabar' with the link
        insta_bar.appendChild(image_a);
      }
    }else if(res.meta.code == 400) {
      // Create an error element
      var _alert = document.createElement('span');
      _alert.innerHTML = res.meta.error_message;
      _alert.className = "alert";
      // Append the element to the body
      document.body.appendChild(_alert);
      // Wait 3sec and add a class for CSS3 transition
      setTimeout(function() {
        _alert.className += " fading";
      }, 3000);
      // Delete this 'Instabar' instance
      var instance = "instabar_"+this.instance_id;
      delete window[instance];
    }else {
      // Create an unknown error element
      var _alert = document.createElement('span');
      _alert.innerHTML = "An unknown error has occured";
       _alert.className = "alert";
      // Append the element to the body
      document.body.appendChild(_alert);
      // Wait 3sec and add a class for CSS3 transition
      setTimeout(function() {
        _alert.className += " fading";
      }, 3000);
      // Delete this 'Instabar' instance
      var instance = "instabar_"+this.instance_id;
      delete window[instance];
    }
  },
  run: function() {
    // Duplicate the instance for callback reason
    var instance = "instabar_"+this.instance_id;
    window[instance] = new Instabar(this.parameters);
    window[instance].instance_id = this.instance_id;
    // Create the url
    var url = "https://api.instagram.com/v1/users/self/feed/?user_id="+ this.parameters.user_id +"&access_token=" + this.parameters.access_token + "&callback="+instance+".display";

    // Create a script element to avoid Cross-Domain ajax request
    script = document.createElement('script');
    script.id = 'instafeed-fetcher';
    script.src = url;
    // Append the script to the end of the body element
    body = document.getElementsByTagName('body');
    body[0].appendChild(script);
  }
}
