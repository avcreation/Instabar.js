# InstaBar.js                       
# GPL2 licence                      
# Created by Alexandre Voiney       
# V.2 - août 2013                   

class @Instabar
    constructor: (options) ->
        @parameters = {
            "access_token": "",
            "selector": "instabar",
            'quality': "thumbnail",
            'caption': true,
            'likes': true,
            'user_id': false,
            'count': 30,
        }

        for name, value of options
            @parameters[name] = value

        # create a unique ID for each instance
        @instance_id = @_getUniqueId()

    _getUniqueId : ->
        text = ""
        choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for i in [0..4]
            text += choices.charAt Math.floor Math.random * choices.length
    
        return text

    
    display: (res) ->
        # check success or not
        if res.meta.code == 200
            # get the HTML element the user wanted
            container = document.getElementById @parameters.selector

            # create the 'Instabar' element
            insta_bar = document.createElement "div"
            insta_bar.style.textAlign = "center"
            # fill the container with it
            container.appendChild insta_bar

            # fetch the result
            data = res.data
            for d in data
                # create the wrapping link to the img HTML element
                image_a = document.createElement "a"
                image_a.href = d.link
                image_a.target = "_blank"

                # create the img HTML element
                image_img = document.createElement "img"
                image_img.src = d.images[@parameters.quality].url
                image_img.className = "insta-pict"
                
                # add the likes count
                if @parameters.likes
                    likes_count = d.likes.count
                    likes = document.createElement "div"
                    likes.className = "likes-count"
                    likes.innerHTML = "<strong class='symbol'>&#xe044;</strong>#{likes_count}"
                    image_a.appendChild likes

                # add alt text and if there is a title, create caption
                if d.caption != null
                    image_img.alt = d.caption.text

                    if @parameters.caption
                        caption = document.createElement "div"
                        caption.className = "insta-caption"
                        caption.innerHTML = d.caption.text.substr 0, 30
                        caption.innerHTML += "..."
                        
                        # add the caption inside the "a" HTML elemenet
                        image_a.appendChild caption


                else
                    image_img.alt = d.id

                # wrap the image with the link
                image_a.appendChild image_img
                image_a.style.position = "relative"
                image_a.className = "insta-link"

                # fill the 'Instabar' with the link
                insta_bar.appendChild image_a

        else if res.meta.code == 400
            # create an error element
            _alert = document.createElement "span"
            _alert.innerHTML = res.meta.error_message
            
            _alert.className = "alert"
            # Append the element to the body
            document.body.appendChild _alert
            # wait 3sec and adda class for CSS3 transition
            setTimeout ->
                _alert.className += " fading"
            , 3000
            # delete @'Instabar' instance
            instance = "instabar_#{@instance_id}"
            delete window[instance]

    
    run: ->
        # duplicate the instance to use it with callback
        instance = "instabar_#{@instance_id}"
        window[instance] = new Instabar @parameters
        window[instance].instance_id = @instance_id
        # create the api url
        unless @parameters.user_id
            url = "https://api.instagram.com/v1/users/self/feed/?count=#{@parameters.count}&access_token=#{@parameters.access_token}&callback=#{instance}.display"
        else

            url = "https://api.instagram.com/v1/users/#{@parameters.user_id}/media/recent/?count=#{@parameters.count}&access_token=#{@parameters.access_token}&callback=#{instance}.display"

        # create a script HTML element to avoid Cross-Domain ajax request error
        script = document.createElement "script"
        script.id = "instfeed-fetcher"
        script.src = url
        # append the script to the end of the body
        document.body.appendChild script








