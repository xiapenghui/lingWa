<template>
  <div class="app-container">
    <el-table ref="table" row-key="id" :default-expand-all="false" :lazy="true" :load="load" :tree-props="treeProps">
      <el-table-column prop="name" label="行政区划名称" min-width="200" />
      <el-table-column prop="code" label="行政区划代码" min-width="200" />
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
          <span v-if="!scope.row.childrenCount">
            <el-divider direction="vertical" />
            <el-button type="text" size="mini" @click="deleteItem(scope)">删除</el-button>
          </span>
          <el-divider direction="vertical" />
          <el-button type="text" size="mini" @click="create(scope)">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  // 新增编辑弹窗组件 -->
    <!-- <create-or-update-region-model
      :id="dialogCreateOrEdit.id"
      v-model="dialogCreateOrEdit.isShow"
      :current-row="currentRow"
      :parent-id="dialogCreateOrEdit.parentId"
      :parent-region-name="dialogCreateOrEdit.parentRegionName"
    /> -->
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  name: 'RegionIndex',
  data() {
    return {
      currentRow: null,
      treeProps: {
        children: 'children',
        hasChildren: 'childrenCount'
      },
      dialogCreateOrEdit: {}
    }
  },
  methods: {
    getItems(id) {
      return new Promise((resolve, reject) => {
        // 接口相关，根据自己的接口处理
        fetchList({ parent: id })
          .then(result => {
            resolve(result)
          })
          .finally(() => {
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    async load(tree, treeNode, resolve) {
      try {
        const result = await this.getItems(tree.id)
        resolve(result)
      } catch (e) {
        this.loading = false
      }
    },
    handleRowClick(row, event, column) {
      this.currentRow = row
    },
    // 打开新增弹窗
    create(scope) {
      if (scope) {
        this.dialogCreateOrEdit.parentId = scope.row ? scope.row.id : -1
        this.currentRow = scope.row
      } else {
        this.dialogCreateOrEdit.parentId = -1
      }
      this.dialogCreateOrEdit.id = null
      this.dialogCreateOrEdit.isShow = true
    },
    // 打开编辑弹窗
    edit(scope) {
      this.editItem = scope.row
      this.currentRow = scope.row
      this.dialogCreateOrEdit.parentId = scope.row.parent
      this.dialogCreateOrEdit.id = scope.row.id
      this.dialogCreateOrEdit.isShow = true
    },
    // 删除
    deleteItem(scope) {
      const item = scope.row
      this.$confirm(this.$t('app.common.message.deleteWarningMessage', { 0: '' })).then(async result => {
        if (!result) {
          return
        }
        // 删除接口，根据自己项目相应处理
        await this.api.deleteItem({ id: item.id })
        // this.deleteLazyTableItem(item)
        this.$message.success(this.$t('app.common.message.successfullyDeleted'))
      })
    }
    // deleteLazyTableItem(item) {
    //   const store = this.$refs.table.store
    //   if (item.parent != -1) {
    //     let parentRow = store.states.data.find(child => child.id == item.parent)
    //     if (!parentRow) {
    //       const keys = Object.keys(store.states.lazyTreeNodeMap)
    //       for (let i = 0; i < keys.length; i++) {
    //         parentRow = store.states.lazyTreeNodeMap[keys[i]].find(child => child.id == item.parent)
    //         if (parentRow) {
    //           break
    //         }
    //       }
    //     }
    //     parentRow.childrenCount--
    //     const parent = store.states.lazyTreeNodeMap[item.parent]
    //     const index = parent.findIndex(child => child.id == item.id)
    //     parent.splice(index, 1)
    //   } else {
    //     const parent = store.states.data
    //     const index = parent.findIndex(child => child.id == item.id)
    //     parent.splice(index, 1)
    //   }
    // },
    // 编辑行政区划成功
    // handleEditOnSave(model) {
    //   const newItemData = Object.assign({}, model)
    //   const parentId = this.dialogCreateOrEdit.parentId
    //   if (model.parent == parentId) {
    //     // 未编辑父级节点，更新当前数据
    //     Object.assign(this.editItem, newItemData, {
    //       childrenCount: this.editItem.childrenCount
    //     })
    //   } else {
    //     // 编辑父级节点，先删除当前节点，再去新的父级节点添加子节点
    //     this.deleteLazyTableItem(this.editItem)
    //     if (model.parent == -1) {
    //       // 添加最外层
    //       this.addOuterTableItem(newItemData)
    //     } else {
    //       this.findNewParent(model.parent, newItemData)
    //     }
    //   }
  },
  // 查找新的父节点及数据后，添加子节点
  findNewParent(parentId, newItemData) {
    const store = this.$refs.table.store
    // 首先在最外层里面找
    let parentRow = store.states.data.find(item => item.id === parentId)
    if (parentRow) {
      parentRow.childrenCount++
    } else {
      const keys = Object.keys(store.states.lazyTreeNodeMap)
      for (let i = 0; i < keys.length; i++) {
        parentRow = store.states.lazyTreeNodeMap[keys[i]].find(item => item.id === parentId)
        if (parentRow) {
          break
        }
      }
      if (parentRow) {
        parentRow.childrenCount++
      }
    }
    const parentTreeNode = store.states.treeData[parentId]
    this.addLazyTableItemToParent(parentTreeNode, parentId, newItemData)
  },
  // 新增行政区划成功
  handleAddOnSave(model) {
    const newItemData = Object.assign({}, model)
    const parentId = this.dialogCreateOrEdit.parentId
    const store = this.$refs.table.store
    if (parentId === -1) {
      // 添加最外层
      this.addOuterTableItem(newItemData)
    } else {
      const parentRow = this.currentRow
      parentRow.childrenCount++
      // treeData为所有已加载过的节点的子节点
      const parentTreeNode = store.states.treeData[parentId]
      this.addLazyTableItemToParent(parentTreeNode, parentId, newItemData)
    }
  },
  // 添加数据放到最外层的数据中去
  addOuterTableItem(newItemData) {
    const store = this.$refs.table.store
    store.states.data.push(newItemData)
  },
  // 把数据加到父级节点上去
  addLazyTableItemToParent(parentTreeNode, parentId, newItemData) {
    const store = this.$refs.table.store
    // 如果在已加载过的节点的子节点中
    if (parentTreeNode) {
      // 如果该节点已加载
      if (parentTreeNode.loaded) {
        store.states.lazyTreeNodeMap[parentId].push(newItemData)
      }
    } else {
      store.states.treeData[parentId] = {
        display: true,
        loaded: false,
        expanded: false,
        children: [],
        lazy: true,
        level: 0
      }
    }
  }
}
</script>

<style></style>
