// state: 用于保存全局共享数据
import mode from './modeType'

export default {
  isFullScreen: false, // 全屏的播放器
  isShowMiniPlayer: false, // 底部播放器
  isShowListPlayer: false, // 列表播放器
  isPlaying: false, // 是否播放
  modeType: mode.loop, // 播放模式
  songs: [], // 所有需要播放歌曲的详情信息
  currentSong: {}, // 当前歌曲
  currentIndex: 0,  // 当前下标
  currentLyric: {},  // 当前歌词
  currentTime: 0,  // 当前播放时间
  favoriteList: [], // 收藏歌曲列表
  historyList: [],  // 歌曲列表
}