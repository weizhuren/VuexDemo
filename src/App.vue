<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handlInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @click.native="changeDoneById(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button @click="ChangeList('all')" :type="viewKey === 'all' ? 'primary' : ''">全部</a-button>
          <a-button @click="ChangeList('undone')" :type="viewKey === 'undone' ? 'primary' : ''">未完成</a-button>
          <a-button @click="ChangeList('done')" :type="viewKey === 'done' ? 'primary' : ''">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  data () {
    return {}
  },
  methods: {
    handlInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    // 向列表中新增item项
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$notification.open({
          message: '文本框内容不能为空！',
          type: 'warning'
        })
      }
      this.$store.commit('addItem')
    },
    // 删除列表中的item
    removeItemById (id) {
      this.$store.commit('removeItem', id)
    },
    // 改变任务状态
    changeDoneById (id) {
      this.$store.commit('changeDone', id)
    },
    // 清除已完成的任务
    clean () {
      this.$store.commit('cleanDone')
    },
    // 修改页面上展示的列表数据
    ChangeList (key) {
      this.$store.commit('changeViewKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
