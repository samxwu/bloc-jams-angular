(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         var currentAlbum = Fixtures.getAlbum();
         
          /**
            * @desc Buzz object audio file
            * @type {Object}
            */
         var currentBuzzObject = null;

         /**
            * @function setSong
            * @desc Stops currently playing song and loads new audio file as currentBuzzObject
            * @param {Object} song
        */
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
            
         };
         
         /**
            * @function playSong
            * @desc Plays current selected song
            * @param {Object} song
        */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }
         
         
         /**
            * @function stopSong
            * @desc Stops current selected song
            * @param {Object} song
        */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
         }
         
         /**
            * @function getSongIndex
            * @desc Returns the index of song
            * @param {Object} song
            * @returns {Number}
        */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
          /**
            * @desc Active song object from list of songs
            * @type {Object}
            */
         SongPlayer.currentSong = null;
          
         /**
            * @function SongPlayer.play
            * @desc Stops currently playing song and plays newly loaded audio file.
            * @param {Object} song
        */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                setSong(song);         
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
            
         };
         
         /**
            * @function SongPlayer.pause
            * @desc Pauses currently playing song.
            * @param {Object} song
        */
         SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
         };
         
         /**
            * @function SongPlayer.previous
            * @desc Method to go to previous song.
            * @param 
        */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             
             if (currentSongIndex < 0) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
             
         };
         
         
         /**
            * @function SongPlayer.next
            * @desc Method to go to next song.
            * @param 
        */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             
             if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
           
         };
         
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();