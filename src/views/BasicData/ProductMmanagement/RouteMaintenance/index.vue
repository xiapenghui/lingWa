<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProcessRoute') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.Name" :placeholder="$t('permission.ProcessRouteInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="15">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <el-checkbox v-model="pagination.IsDelete" @change="tableKey">{{ $t('permission.inclusionRoute') }}</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addRoute') }}</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportRoute') }}</el-button> -->
      <!-- <el-button type="primary" icon="el-icon-document-remove" @click="handleImport">{{ $t('permission.importFinished') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" :label="$t('permission.ProcessRoute')" width="150">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.edition')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ProcessCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.descriptionRoute')">
        <template slot-scope="scope">
          {{ scope.row.Describe }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="150" sortable prop="status">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsDelete === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsDelete === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="250">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="200">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="handleEdit(scope.row)">{{ $t('permission.EditRoute') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope.row)">{{ $t('permission.lookRoute') }}</el-button>
          <el-button v-if="scope.row.status == '启用'" type="danger" size="small" @click="handleBan(scope.row, '禁用')">{{ $t('permission.handleRoute') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope.row, '启用')">{{ $t('permission.SpecificationsRoute') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">{{ $t('permission.deleteRoute') }}</el-button> -->

          <el-tooltip class="item" effect="dark" content="编辑工艺路线" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="查看工艺路线" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-view" plain @click="handleLook(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="禁用工艺路线" placement="top-start">
            <el-button v-if="scope.row.IsDelete == 1" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用工艺路线" placement="top-start">
            <el-button v-if="scope.row.IsDelete == 0" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除工艺" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.EditRouter') : $t('permission.addRouter')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
          <el-form-item :label="$t('permission.ProcessRoute')" prop="ProcessRoute">
            <el-input v-model="ruleForm.ProcessRoute" :placeholder="$t('permission.ProcessRoute')" clearable />
          </el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
          <el-form-item :label="$t('permission.edition')" prop="edition"><el-input v-model="ruleForm.edition" :placeholder="$t('permission.edition')" clearable /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
          <el-form-item :label="$t('permission.descriptionRoute')">
            <el-input v-model="ruleForm.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.descriptionRoute')" />
          </el-form-item>
        </el-tooltip>

        <div class="boxBig">
          <div class="boxTree" :style="{ width: boxThreeWidth }">
            <el-form-item :label="$t('permission.ProcessRouteDetail')">
              <el-tree
                :data="boxTree"
                node-key="id"
                default-expand-all
                draggable
                :allow-drop="allowDrop"
                :allow-drag="allowDrag"
                :expand-on-click-node="false"
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node" @mouseenter="mouseenter(data)" @mouseleave="mouseleave(data)">
                  <span>{{ node.label }}</span>
                  <span v-show="data.show">
                    <!-- <el-tag type="danger" size="mini" @click="() => remove(node, data)">删除</el-tag> -->
                    <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="remove(node, data)"><el-tag slot="reference" type="danger" size="mini">删除</el-tag></el-popconfirm>
                  </span>
                </span>
              </el-tree>
              <div class="boxBtn" style="text-align:right;">
                <el-button type="primary" @click="addRepai">{{ $t('permission.addRepai') }}</el-button>
                <el-button type="primary" @click="addTechnology">{{ $t('permission.addTechnology') }}</el-button>
              </div>
            </el-form-item>
          </div>

          <div v-if="isShow" class="boxList" :style="{ width: boxListWidth }">
            <el-form-item :label="$t('permission.changeRoute')">
              <el-tree ref="boxList" :data="boxList" show-checkbox node-key="id" />
              <div class="boxBtn" style="text-align:right;">
                <el-button type="danger" @click="cancel">{{ $t('permission.cancel') }}</el-button>
                <el-button type="primary" @click="submit">{{ $t('permission.submit') }}</el-button>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">{{ $t('permission.cancel') }}</el-button>
        <!-- <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button> -->
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" :title="dialogType2"><el-tree :data="treeData" :props="defaultProps" default-expand-all /></el-dialog>
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination'
import { ProduceList, ProduceAdd, ProduceDelete, ProduceModify } from '@/api/OrganlMan'
const fixHeight = 300
export default {
  name: 'RouteMaintenance',
  // components: { Pagination },
  data() {
    return {
      boxThreeWidth: '100%',
      boxListWidth: '50%',
      dialogVisible: false,
      dialogVisible2: false,
      listLoading: false,
      isShow: false,
      dialogType: 'new',
      total: 10,
      dialogType2: '标题',
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        IsDelete: false,
        Name: undefined
      },
      editLoading: false, // 编辑loading
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度

      boxTree: [
        {
          id: 1,
          label: '一级 1',
          show: false,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              show: false,
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  show: false
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  show: false
                }
              ]
            }
          ]
        }
      ],
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],

      boxList: [
        {
          id: 1,
          label: '工序1'
        },
        {
          id: 2,
          label: '工序2'
        },
        {
          id: 3,
          label: '工序3'
        },
        {
          id: 4,
          label: '工序4'
        },
        {
          id: 5,
          label: '工序5'
        },
        {
          id: 6,
          label: '工序6'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      parentMsg: this.$t('permission.importRoute'),
      content1: this.$t('permission.ProcessRoute'),
      content2: this.$t('permission.inclusionRoute'),
      content3: this.$t('permission.edition'),
      content4: this.$t('permission.descriptionRoute'),
      content5: this.$t('permission.ProcessRouteDetail')
    }
  },
  computed: {},
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.parentMsg = this.$t('permission.importRoute')
      this.content1 = this.$t('permission.ProcessRoute')
      this.content2 = this.$t('permission.inclusionRoute')
      this.content3 = this.$t('permission.edition')
      this.content4 = this.$t('permission.descriptionRoute')
      this.content5 = this.$t('permission.ProcessRouteDetail')
      this.setFormRules()
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        ProcessRoute: [{ required: true, message: this.$t('permission.ProcessRouteInfo'), trigger: 'blur' }],
        edition: [
          {
            required: true,
            message: this.$t('permission.editionInfo'),
            trigger: 'blur'
          }
        ]
      }
    },
    // 禁用，启用权限
    handleBan(scope, status) {
      this.$message({
        message: status + '成功',
        type: 'success'
      })
      scope.row.status = status
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 重置
    handleReset() {},
    // 选择框
    tableKey() {},
    // 导出用户

    // 获取列表
    getList() {
      this.listLoading = true
      ProduceList(this.pagination).then(res => {
        debugger
        if (res.IsPass === true) {
          this.tableData = res.Obj
          this.total = res.TotalRowCount
        }
        this.listLoading = false
      })
    },

    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },

    // 增加角色
    handleAdd() {
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // 编辑角色
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true

      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodess
      })
    },

    // 查看详情
    handleLook() {
      this.dialogVisible2 = true
    },
    // 删除角色
    handleDelete(row) {},
    // 提交工序列表
    submit() {
      this.$refs.boxList.getCheckedNodes().map(item => {
        this.boxTree.push(item)
      })
    },
    // 取消工序列表操作
    cancel() {
      this.$refs.boxList.setCheckedKeys([])
    },
    // 添加维修
    addRepai() {},
    // 添加工序
    addTechnology() {
      this.boxThreeWidth = '50%'
      this.isShow = true
    },

    // 鼠标悬浮出现按钮
    mouseenter(data) {
      data.show = true
    },

    mouseleave(data) {
      data.show = false
    },
    // 删除节点
    remove(node, data) {
      console.log('node', node)
      console.log('data', data)
    },
    // 拖拽功能
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.boxBig {
  display: -webkit-flex;
  display: flex;
}
.boxBig ::v-deep .el-form-item__content {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 400px;
}
.boxTree ::v-deep .el-tree,
.boxList ::v-deep .el-tree {
  height: 340px;
  overflow-y: auto;
}
.boxBtn {
  margin-top: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
