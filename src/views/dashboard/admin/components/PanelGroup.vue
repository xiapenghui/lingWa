<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-for="(item, index) in titleList" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(item.type)">
        <div class="card-panel-icon-wrapper" :class="item.classS">
          <svg-icon :icon-class="item.class" class-name="card-panel-icon" /></div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ item.name }}</div>
          <count-to :start-val="item.start" :end-val="item.end" :duration="item.time" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },

  data() {
    return {
      titleList: [
        {
          name: this.$t('permission.importRoute'),
          start: 0,
          end: 102400,
          time: 2600,
          class: 'peoples',
          classS: 'icon-people',
          type: 'newVisitis'
        },
        {
          name: 'messages',
          start: 0,
          end: 81212,
          time: 3000,
          class: 'message',
          classS: 'icon-message',
          type: 'messages'
        },
        {
          name: 'purchases',
          start: 0,
          end: 92800,
          time: 3200,
          class: 'money',
          classS: 'icon-money',
          type: 'purchases'
        },
        {
          name: 'shoppings',
          start: 0,
          end: 13600,
          time: 3400,
          class: 'shopping',
          classS: 'icon-shopping',
          type: 'shoppings'
        }
      ]
    }
  },
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.titleList[0].name = this.$t('permission.importRoute')
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
