tgdb-api
========

Simple wrapper for thegamesdb's API (see
http://wiki.thegamesdb.net/index.php?title=API_Introduction)

Original code from https://www.npmjs.com/package/thegamesdb-api, adapted to
work with newer libraries


Installation
------------

    npm install tgdb-api

Usage
-----

    var gamesdb = require('tgdb-api')

    // All methods return a callback in this form:
    var cb = function(err,result)
    {
        if (!err)
        {
            console.log(JSON.stringify(result,undefined,2));
        }
    }

    // Available methods:
    gamesdb.GetGame({id:number}, cb);                   // Get JSON object describing game by thegamesdb id
    gamesdb.GetGameList({name:string}, cb)              // Get JSON object listing all games that match 'name'
    gamesdb.GetPlatform({id:number}, cb);               // Get JSON object describing platform by id
    gamesdb.GetArt({id:number}, cb);                    // Get JSON object describing available art (covers, screenshots, etc.) by id
    gamesdb.GetPlatformGames({platformId:number}, cb);  // Get JSON object describing all games on platform by platform Id
    gamesdb.PlatformGames({platformId:number}, cb);     // Same?
    gamesdb.Updates({time:number}, cb);                 // Get JSON object describing updates to gamesdb since timestamp
    gamesdb.GetPlatformList(undefined, cb);             // Get the list of all platforms on gamesdb.

    // NOTE: be careful with methods returning a list,
    // if there's only one result it won't be in an array.
    // TODO: this could be improved!

Example
-------

    GetGamesList({name:"Halo" }, cb)...

    {
       Game:
       [ { id: 9,
           GameTitle: 'Halo 2',
           ReleaseDate: '05/31/2007',
           Platform: 'PC' },
         { id: 90,
           GameTitle: 'Halo 3',
           ReleaseDate: '09/25/2007',
           Platform: 'Microsoft Xbox 360' },
         { id: 3597,
           GameTitle: 'Halo 4',
           ReleaseDate: '11/06/2012',
           Platform: 'Microsoft Xbox 360' },
        ...
        ]
     }


Todo/Roadmap
------------

    * Add test cases
    * Extend art functionality to stream art instead of just retrieving meta data.
