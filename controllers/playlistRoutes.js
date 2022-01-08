const router = require('express').Router();
const { Playlist, PlaylistSong, Song, Genre, ArtistGenre, ArtistSong, Artist} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
      const playlistData = await Playlist.findAll(
        {
          include: [{model: Song, include: [{model: Artist}]}]
        }
      )
      const playlists = playlistData.map((playlist) => {
      return playlist.get({plain: true});
      })
    // let reducedPlaylists = []
    // let playlistName
    // let songAndArtist
    // for(let i = 0; i < playlists.length; i++) {
    //   if(i == 0) {
    //     playlistName = playlists[0].name
    //     reducedPlaylists.push(
    //       {
    //         [playlistName]: {}
    //       }
    //     )
    //   }
    //   if(playlists[i].name != playlistName) {
    //     playlistName = playlists[i].name
    //     reducedPlaylists.push(
    //       {
    //         [playlistName]: {}
    //       }
    //     )
    //     if(playlists[i].name == playlistName) {
    //       songAndArtist = {
    //         songTitle: playlists[i].songs.name,
    //         artist: playlists[i].songs.artists.name
    //       }
    //       reducedPlaylists['Bangin Hip Hip Playlist'] = songAndArtist
    //     }
    //   }
    // }



    // console.log("-----------------------", reducedPlaylists)
    // console.log("-----------------------", songAndArtist)



      // res.status(200).json(playlists)
      // console.log(playlists)
      res.status(200).render('Playlists/index', {playlists: playlists, logged_in: req.session.logged_in})
    }
    catch (err) {
      res.status(500).json(err)
    }
    
  });
  
  router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
      const singlePlaylist = await Playlist.findAll(
        {
          where: {
            'id': req.params.id
          },
          include: [{model: Song, include: [{model: Artist}]}]
        })
        const playlist = singlePlaylist.map((song) => {
        return song.get({plain: true});
        })
        // res.status(200).json(singlePlaylist)
        res.status(200).render('Playlists/view', {playlist: playlist[0], logged_in: req.session.logged_in})
    }
    catch (err) {
      res.status(500).json(err)
    }
  
  });
  
  router.post('/', async (req, res) => {
    // create a new category
    try {
      const newPlaylistData = await Playlist.create(req.body)
      res.status(200).json(newPlaylistData)
    }
    catch (err) {
      res.status(400).json(err)
    }
  });

  router.post('/addsong', async (req, res) => {
    // create a new category
    try {
      const addSongData = await PlaylistSong.create(req.body)
      res.status(200).json(addSongData)
    }
    catch (err) {
      res.status(400).json(err)
    }
  });


  
  router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
      const updatePlaylistData = await Playlist.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(updatePlaylistData)
    }
    catch (err) {
      res.status(500).json(err)
    }
  });
  
  router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const delPlaylistData = await Playlist.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(delPlaylistData)
    }
    catch (err) {
      res.status(500).json(err)
    }
  });

  router.delete('/deletesong/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const delPlaylistSongData = await PlaylistSong.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(delPlaylistSongData)
    }
    catch (err) {
      res.status(500).json(err)
    }
  });
  
  module.exports = router;