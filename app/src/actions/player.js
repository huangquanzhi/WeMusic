import {
    SONG_PLAY_MODE_LOOP,
    SONG_PLAY_MODE_REPEAT,
    SONG_PLAY_MODE_SHUFFLE
} from '../constants/song';

export default class SongPlayer {
    constructor(action, playerNode = null) {
        this.action = action;
        this.playerNode = playerNode;
        this.currentTime = 0;
        this.duration = 1;

        this.song = this.song.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
        this.resetTime = this.resetTime.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.playlist = this.playlist.bind(this);
        this.updatePlayList = this.updatePlayList.bind(this);
        this.mode = this.mode.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.replay = this.replay.bind(this);
        this.reload = this.reload.bind(this);
    }

    // set the song player
    // callback (DOM element of the audio player)
    setPlayer(player, callback) {
        if (player instanceof HTMLElement) {
            this.playerNode = player;
            if (typeof callback === 'function') {
                callback(player);
            }
        }
        return this;
    }

    resetTime() {
        this.currentTime = 0;
        this.duration = 1;
        this.playerNode.currentTime = this.currentTime;
        return this;
    }

    // music player switch for playing or not
    // callback: (isPlaying status)
    isPlaying(status, callback) {
        const {action} = this;
        if (typeof status === 'boolean') {
            action.isPlaying(status);

            if (this.playerNode instanceof HTMLElement) {
                // play/pause the audio
                status ? this.playerNode.play() : this.playerNode.pause();
            }
            if (typeof callback === 'function') {
                callback(status);
            }
        }
        return this;
    };

    // set the current playlist
    // callback: (array of current playlist)
    playlist(list, callback) {
        const {action} = this;
        if (Array.isArray(list)) {
            action.setPlayList(list);
            if (typeof callback === 'function') {
                callback(list);
            }
        }
        return this;
    }

    // update is required if playlist of mode changed
    // callback
    updatePlayList(callback) {
        const {action} = this;
        action.changePlayList();
        if (typeof callback === 'function') {
            callback();
        }
        return this;
    }

    // change the current playing song
    // callback: (id of the current playing song);
    song(id, callback) {
        const {action} = this;

        if (typeof id === 'string') {
            action.changeSong(id);
            if (typeof callback === 'function') {
                callback(id);
            }
        }
        return this;
    }

    // change the play mode of the player , eg loop repeat shuffle
    // callback: (requested mode change)
    mode(type, callback) {
        const {action} = this;
        if (typeof type === 'string') {
            switch (type) {
                case SONG_PLAY_MODE_REPEAT:
                case SONG_PLAY_MODE_LOOP:
                case SONG_PLAY_MODE_SHUFFLE:
                    action.changePlayMode(type);
            }
            if (typeof callback === 'function') {
                callback(type);
            }
        }
        return this;
    }

    // change to next available song
    // callback
    next(callback) {
        const {action} = this;
        action.changeNextSong();
        if (typeof callback === 'function') {
            callback();
        }
        return this;
    }

    // change to prev available song
    // callback
    prev(callback) {
        const {action} = this;
        action.changePrevSong();
        if (typeof callback === 'function') {
            callback();
        }
        return this;
    }

    // reply the current song, status: boolean
    replay(status, callback) {
        if (this.playerNode instanceof HTMLElement) {
            if (typeof status === 'boolean') {
                this.playerNode.load();
                this.playerNode.play();
                console.log("Replay")
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
        return this;
    }

    // reload the audio player
    // audio node required
    // callback
    reload() {
        const {playerNode} = this;
        if (playerNode instanceof HTMLElement) {
            playerNode.load();
        }
        return this;
    }

}