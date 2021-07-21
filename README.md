# music-sessions

https://vjusiega.github.io/music-sessions

Music Sessions is an interactive visualization of my music listening habits on Spotify broken down into jam sessions. 

A session consists of a collection of tracks listened to consecutively without a significant break in time. 

Each session is visualized as a relationship between the unique artists + songs in a session and the track order of the session. These datapoints help create a geometry that reveals patterns in music listening such as obssessively listening to a song on repeat, focusing on a certain artist's discography, or listening to a variety of songs and artists (perhaps from a playlist). 

The user can hover over the datapoints and see how they connect to the rest of the session with the direct relationships in a session being: unique artist <---> unique song <---> session song. 
- highlighting an artist reveals the unique songs by them in the session and then in turn where in the session tracks they were listened to
- highlighting a unique song reveals a connection to the artist it is by and all the instances that the song was listened to in that session
- highlight a song in the session track order reveals a connection to the artist, unique song point, as well all other instances that the song was listened to
 
This project was created using [Processing](https://processing.org/) as a final project for [4.032 Design Studio: Information and Visualization](https://architecture.mit.edu/subject/spring-2020-4032) at MIT.

## the data 

Starting in April 2020 I used Last.fm to keep record of all the songs I listen to and when I listened to them. This data is retrieved from the Last.fm API and supplemented with data from the Spotify API, which gives additional information about tracks including their tempo and their "energy." This data is then combined into a single CSV and used in the Processing visualization. 

I wrote this Google Colab Notebook to process the data: [link to come]

## ineractive visualization 

*photos to come*

