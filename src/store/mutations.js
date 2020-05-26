// mutations: 用于保存修改全局共享数据的方法
import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'

export default {
  // 设置主播放界面显示隐藏
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  // 设置底部播放器显示隐藏
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  // 设置列表播放器显示隐藏
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  // 设置播放状态
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  // 设置播放模式
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag
  },
  // 设置歌曲详情
  [SET_SONG_DETAIL](state, list) {
    state.songs = list
  },
  // 设置歌词信息
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric
  },
  // 播放列表删除歌曲
  [SET_DEL_SONG](state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      // 清空
      state.songs = []
    }
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1
    }
    if (state.songs.length === 0) {
      state.isFullScreen = false,
        state.isShowMiniPlayer = false,
        state.isShowListPlayer = false
    }
  },
  // 设置当前播放歌曲下标
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  // 设置当前播放时长
  [SET_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  // 设置收藏歌曲
  [SET_FAVORITE_SONG](state, song) {
    let result = state.favoriteList.filter(item => {
      return item.id !== song.id
    })
    console.log(result.length === state.favoriteList.length)
    if (result.length === state.favoriteList.length) {
      // 添加收藏
      state.favoriteList.push(song)
    } else {
      // 取消收藏
      state.favoriteList = result
    }
  },
  // 设置收藏歌曲列表
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  // 设置播放歌曲历史
  [SET_HISTORY_SONG](state, song) {
    let result = state.historyList.find((currentValue) => {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(30, 1)
      }
      state.historyList.unshift(song)
    }
  },
  // 设置歌曲历史列表
  [SET_HISTORY_LIST](state, list) {
    state.historyList = list
  }
}