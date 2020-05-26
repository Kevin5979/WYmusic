// getters: 保存用来获取state的数据方法
export default {
  isFullScreen(state) {
    return state.isFullScreen
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer(state) {
    return state.isShowListPlayer
  },
  isPlaying(state) {
    return state.isPlaying
  },
  modeType(state) {
    return state.modeType
  },
  songs(state) {
    return state.songs
  },
  currentSong(state) {
    if (state.songs.length === 0) {
      let obj = {
        name: '',
        singer: '',
        picUrl: null
      }
      // 没有获取数据
      return obj
    } else {
      return state.songs[state.currentIndex]
    }
  },
  currentLyric(state) {
    return state.currentLyric
  },
  currentIndex(state) {
    return state.currentIndex
  },
  currentTime(state) {
    return state.currentTime
  },
  favoriteList(state) {
    return state.favoriteList
  },
  historyList(state){
    return state.historyList
  }
}