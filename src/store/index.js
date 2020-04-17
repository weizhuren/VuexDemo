import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    // 下一个id
    nextId: 5,
    viewKey: 'undone'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    // 添加项目列表
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应任务事项
    removeItem (state, id) {
      // 1.根据id查找对应项索引
      const index = state.list.findIndex(i => i.id === id)
      // 2.根据索引删除对应项
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    changeDone (state, id) {
      const index = state.list.findIndex(i => i.id === id)
      if (index !== -1) {
        state.list[index].done = !state.list[index].done
      }
    },
    // 清除已完成的任务
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改页面上展示列表数据
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      } else {
        return state.list
      }
    }
  }
})
