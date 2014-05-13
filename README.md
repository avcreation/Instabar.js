InstaBar.js v3
==============

Instagram user feed javascript plugin

##First step
You simply have to authorize my application to access your Instagram Data.
Of course, I only need a ***Basic*** authorization (user info and photos feed).

For that purpose, click on this button. If you're not, log you in and accept my application to access your data. You'll be redirected on this page, and find your *access_token* on it.

##Get the plugin work
Once you've done that, you simpe have to insert the Instabar.min.js file and a piece of Javascript.

    <script type="text/javascript" src="/path/to/Instabar.min.js"></script>
    <script type="text/javascript">
        var myInstaBar = new Instabar({
            'access_token': "YOUR_ACCESS_TOKEN",
            'selector': 'YOUR_DIV_ID', // default is 'insta-bar',
            'quality': 'PHOTO_QUALITY', // 'thumbnail'(default) ,'low_resolution', 'standard_resolution',
            'likes': true/false,  // default is true
            'caption': true/false,  // default is true
            'user_id': 'YOUR_USER_ID or false', // default is false
            'count': 'MAX_NUMBER_OF_PICTURE', // default is 30
            'popular': true/false, //default is false
            'location': 'AN_INSTAGRAM_LOCATION_ID or false', // default is false
            'tag': 'AN_INSTAGRAM_TAG or false' // default is false
        });
        myInstaBar.run()
    </script>

##It works !
Now, your feed will be display in the div you've set earlier. Each image will be wrapped by a link to the instagram page.
To style the feed, you can add some css rules to the class `insta-pict`.

##Release Note : v3
Switch to coffeescript and scss to write sources
Add popular, location and tag filter
Add an example page which load two distinct Instabar instance

##Release Note : v2
Get only the user's photos.
Add captions and likes count.

##Release Note : v1
With the first version, you can get you picture feed.

###Next Release
- ?
