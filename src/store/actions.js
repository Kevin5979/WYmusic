// actions: 用来保存触发mutations保存的方法
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

import { getSongDetail, getSongLyric, getSongURL } from 'api'
import { parseLyric } from 'tools'

export default {
  // 设置主播放界面
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  // 设置底部播放界面
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  // 设置列表播放界面
  setListPlayer({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  // 设置播放状态
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  // 设置播放模式
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  // 设置歌曲详情
  async setSongDetail({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongURL({ id: ids.join(',') })
    let list = []
    result.songs.forEach((value, index) => {
      let singer = ''
      singer = value['ar'][0].name
      if (value['ar'].length !== 1) {
        // 多位歌手
        value['ar'].forEach(item => {
          if (item.name == value['ar'][0].name) {
            singer += ""
          } else {
            singer += "、" + item.name
          }
        })
      }
      // 保存信息
      let obj = {}
      obj.name = value.name
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      // obj.url = urls.data[index].url
      // 这里解决歌词和歌曲不对版的问题
      for (let j = 0; j < urls.data.length; j++) {
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      list.push(obj)
    });
    commit(SET_SONG_DETAIL, list)
  },
  // 获取歌词信息
  async setSongLyric({ commit }, id) {
    let result = await getSongLyric({ id })
    if (!result.nolyric && result.lrc.lyric !== "") {
      // 有歌词
      if (result.lrc.lyric === "纯音乐\n") {
        // 纯音乐
        commit(SET_SONG_LYRIC, { "mes": "纯音乐， 请欣赏" })
      } else {
        // 普通音乐
        let obj = parseLyric(result.lrc.lyric)
        commit(SET_SONG_LYRIC, obj)
      }
    } else {
      commit(SET_SONG_LYRIC, { "mes": "WY音乐,畅享好音质" })
    }
  },
  // 播放列表中删除歌曲
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  // 设置当前播放歌曲下标
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  // 设置当前播放时长
  setCurrentTime({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  // 设置收藏歌曲
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  // 设置收藏歌曲列表
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  // 设置歌曲历史
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  // 设置收藏歌曲列表
  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  },
}