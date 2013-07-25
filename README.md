InstaBar.js
===========

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
            'quality': 'PHOTO_QUALITY', // 'thumbnail'(default) ,'low_resolution', 'standard_resolution'
        });
        myInstaBar.run()
    </script>

##It works !
Now, your feed will be display in the div you've set earlier. Each image will be wrapped by a link to the instagram page.  
To style the feed, you can add some css rules to the class `insta-pict`.  

##Release Note : v1
With the first version, you can get you picture feed.  

###Next Release
- Get the comments  
- Get the likes
- Add captions
