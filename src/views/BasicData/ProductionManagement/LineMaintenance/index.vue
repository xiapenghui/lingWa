<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="预留查询" placement="top-start"><label class="radio-label">预留查询:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.MaterialNum" placeholder="预留查询" /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="预留查询" placement="top-start"><label class="radio-label">预留查询:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.Name" placeholder="预留查询" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="预留查询" placement="top-start"><el-checkbox v-model="pagination.ShowBanned">预留查询</el-checkbox></el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser('1')">{{ $t('permission.addFactory') }}</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser('2')">{{ $t('permission.addWorkshop') }}</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser('3')">{{ $t('permission.addLine') }}</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser('4')">{{ $t('permission.addWord') }}</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser('5')">{{ $t('permission.addStation') }}</el-button>
      <el-tag type="success" style="margin-left: 2%;">上级组织：{{ organization }}</el-tag>
    </div>

    <!-- 工厂对应表格 -->
    <div class="centerBox">
      <div class="centerTree" :style="{ height: centerTree }"><el-tree :data="treeData" node-key="Key" :props="defaultProps" :default-expand-all="true" /></div>
      <div v-if="factoryShow" class="centerTable">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
          :data="factoryData"
          :height="tableHeight"
          style="width: 100%"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="工厂编码">
            <template slot-scope="scope">
              {{ scope.row.FactoryNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工厂名称">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="工厂描述">
            <template slot-scope="scope">
              {{ scope.row.Description }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护者">
            <template slot-scope="scope">
              {{ scope.row.CreateUser }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间">
            <template slot-scope="scope">
              {{ scope.row.CreateTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑工厂" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row, '1')" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="禁用工厂" placement="top-start">
                <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="启用工厂" placement="top-start">
                <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除工厂" placement="top-start">
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row, '1')" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getFactory" />
      </div>

      <!-- 车间对应表格 -->
      <div v-if="workshopShow" class="centerTable">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
          :data="workshopData"
          :height="tableHeight"
          style="width: 100%"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="车间编码">
            <template slot-scope="scope">
              {{ scope.row.WorkshopNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="车间名称">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="车间描述">
            <template slot-scope="scope">
              {{ scope.row.Description }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护者">
            <template slot-scope="scope">
              {{ scope.row.CreateUser }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间">
            <template slot-scope="scope">
              {{ scope.row.CreateTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑车间" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row, '2')" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="禁用车间" placement="top-start">
                <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="启用车间" placement="top-start">
                <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除车间" placement="top-start">
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row, '2')" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->
      </div>

      <!-- 产线对应表格 -->
      <div v-if="lineShow" class="centerTable">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
          :data="lineData"
          :height="tableHeight"
          style="width: 100%"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="产线编码">
            <template slot-scope="scope">
              {{ scope.row.FactoryNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="产线名称">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="产线描述">
            <template slot-scope="scope">
              {{ scope.row.Description }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护者">
            <template slot-scope="scope">
              {{ scope.row.CreateUser }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间">
            <template slot-scope="scope">
              {{ scope.row.CreateTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑产线" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row, '3')" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="禁用产线" placement="top-start">
                <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="启用产线" placement="top-start">
                <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除产线" placement="top-start">
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row, '3')" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->
      </div>

      <!-- 工作中心表格 -->
      <div v-if="wordShow" class="centerTable">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
          :data="wordData"
          :height="tableHeight"
          style="width: 100%"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="工作中心编码">
            <template slot-scope="scope">
              {{ scope.row.FactoryNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工作中心名称">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="工作中心描述">
            <template slot-scope="scope">
              {{ scope.row.Description }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护者">
            <template slot-scope="scope">
              {{ scope.row.CreateUser }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间">
            <template slot-scope="scope">
              {{ scope.row.CreateTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑工作中心" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row, '4')" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="禁用工作中心" placement="top-start">
                <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="启用工作中心" placement="top-start">
                <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除工作中心" placement="top-start">
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row, '4')" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->
      </div>

      <!-- 工位表格 -->
      <div v-if="stationShow" class="centerTable">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
          :data="stationData"
          :height="tableHeight"
          style="width: 100%"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="工位编码">
            <template slot-scope="scope">
              {{ scope.row.FactoryNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工位名称">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="工位描述">
            <template slot-scope="scope">
              {{ scope.row.Description }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护者">
            <template slot-scope="scope">
              {{ scope.row.CreateUser }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间">
            <template slot-scope="scope">
              {{ scope.row.CreateTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑工位" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row, '5')" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="禁用工位" placement="top-start">
                <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="启用工位" placement="top-start">
                <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除工位" placement="top-start">
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row, '5')" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->
      </div>
    </div>

    <!-- 编辑新增工厂 -->

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="listLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item v-if="factoryShow" label="工厂编号"><el-input v-model="ruleForm.FactoryNum" placeholder="工厂编号" /></el-form-item>
        <el-form-item v-if="factoryShow" label="工厂名称" prop="FactoryName"><el-input v-model="ruleForm.FactoryName" placeholder="工厂名称" /></el-form-item>
        <el-form-item v-if="factoryShow" label="工厂电话"><el-input v-model="ruleForm.Tel" placeholder="工厂电话" /></el-form-item>
        <el-form-item v-if="factoryShow" label="工厂地址"><el-input v-model="ruleForm.Address" placeholder="工厂地址" /></el-form-item>
        <el-form-item v-if="factoryShow" label="工厂描述"><el-input v-model="ruleForm.Description" type="textarea" placeholder="工厂描述" /></el-form-item>
        <el-form-item v-if="factoryShow" label="工厂备注"><el-input v-model="ruleForm.Remark" type="textarea" placeholder="工厂备注" /></el-form-item>

        <el-form-item v-if="workshopShow" label="车间编号"><el-input v-model="ruleForm.WorkshopNum" placeholder="车间编号" /></el-form-item>
        <el-form-item v-if="workshopShow" label="车间名称" prop="WorkshopName"><el-input v-model="ruleForm.WorkshopName" placeholder="车间名称" /></el-form-item>
        <el-form-item v-if="workshopShow" label="车间电话"><el-input v-model="ruleForm.Tel" placeholder="车间电话" /></el-form-item>
        <el-form-item v-if="workshopShow" label="车间描述"><el-input v-model="ruleForm.Description" type="textarea" placeholder="车间描述" /></el-form-item>
        <el-form-item v-if="workshopShow" label="车间备注"><el-input v-model="ruleForm.Remark" type="textarea" placeholder="车间备注" /></el-form-item>

        <el-form-item v-if="lineShow" label="产线编号"><el-input v-model="ruleForm.LineNum" placeholder="产线编号" /></el-form-item>
        <el-form-item v-if="lineShow" label="产线名称" prop="LineName"><el-input v-model="ruleForm.LineName" placeholder="产线名称" /></el-form-item>
        <el-form-item v-if="lineShow" label="产线类别"><el-input v-model="ruleForm.LineType" placeholder="产线类别" /></el-form-item>
        <el-form-item v-if="lineShow" label="车间描述"><el-input v-model="ruleForm.Description" type="textarea" placeholder="车间描述" /></el-form-item>
        <el-form-item v-if="lineShow" label="车间备注"><el-input v-model="ruleForm.Remark" type="textarea" placeholder="车间备注" /></el-form-item>

        <el-form-item v-if="wordShow" label="工作中心编号"><el-input v-model="ruleForm.WorkCenterNum" placeholder="工作中心编号" /></el-form-item>
        <el-form-item v-if="wordShow" label="工作中心名称" prop="WorkCenterName"><el-input v-model="ruleForm.WorkCenterName" placeholder="工作中心名称" /></el-form-item>
        <el-form-item v-if="wordShow" label="工作中心类别"><el-input v-model="ruleForm.WorkCenterType" placeholder="工作中心类别" /></el-form-item>
        <el-form-item v-if="wordShow" label="工作中心描述"><el-input v-model="ruleForm.Description" type="textarea" placeholder="工作中心描述" /></el-form-item>
        <el-form-item v-if="wordShow" label="工作中心备注"><el-input v-model="ruleForm.Remark" type="textarea" placeholder="工作中心备注" /></el-form-item>

        <el-form-item v-if="stationShow" label="工位编号"><el-input v-model="ruleForm.TerminalNum" placeholder="工位编号" /></el-form-item>
        <el-form-item v-if="stationShow" label="工位名称" prop="TerminalName"><el-input v-model="ruleForm.TerminalName" placeholder="工位名称" /></el-form-item>
        <el-form-item v-if="stationShow" label="工位类别"><el-input v-model="ruleForm.ProcessCode" placeholder="工位类别" /></el-form-item>
        <el-form-item v-if="stationShow" label="工位描述"><el-input v-model="ruleForm.Description" type="textarea" placeholder="工位描述" /></el-form-item>
        <el-form-item v-if="stationShow" label="工位备注"><el-input v-model="ruleForm.Remark" type="textarea" placeholder="工位备注" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { MaterialModify, MaterialStatus } from '@/api/BasicData'
import {
  treeList,
  factoryList,
  workShopList,
  productLineList,
  workList,
  stationList,
  factoryAdd,
  workShopAdd,
  productAdd,
  workAdd,
  stationAdd,
  factoryDelete,
  workShopDelete,
  productDelete,
  workDelete,
  stationDelete,
  factoryModify,
  workShopModify,
  productModify,
  workModify,
  stationModify
} from '@/api/BasicData'
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'MaterialInformation',
  components: { Pagination },
  data() {
    return {
      factoryData: [], // 工厂数组
      workshopData: [], // 车间数组
      lineData: [], // 产线数组
      wordData: [], // 工作中心数组
      stationData: [], // 工位数组
      treeData: [], // 树状图
      organization: null, // 上级组织名字
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50
      },

      listLoading: false,
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      centerTree: window.innerHeight - 270 + 'px',
      dialogType: 'new',
      factoryShow: true, // 默认工厂表格出现
      workshopShow: false, //  默认车间表格因隐藏
      lineShow: false, // 默认产线表格隐藏
      wordShow: false, // 默工作中心隐藏
      stationShow: false, // 默认工位隐藏
      dialogTypeTitle: null, // 弹窗标题
      FactoryCode: null, // 工厂code
      WorkshopCode: null, //  车间code
      LineCode: null, // 产线code
      WorkCenterCode: null, // 工作中心code
      TerminalCode: null, // 工位code
      rules: {
        FactoryName: [{ required: true, message: '请输入工厂名字', trigger: 'blur' }],
        WorkshopName: [{ required: true, message: '请输入车间名字', trigger: 'blur' }],
        LineName: [{ required: true, message: '请输入产线名字', trigger: 'blur' }],
        WorkCenterName: [{ required: true, message: '请输入工作中心名称', trigger: 'blur' }],
        TerminalName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }]
      }
      // content1: this.$t('permission.userName'),
      // content2: this.$t('permission.fullName'),
      // content3: this.$t('permission.containInfo'),
      // content4: this.$t('permission.company'),
      // content5: this.$t('permission.department'),
      // content6: this.$t('permission.password'),
      // content7: this.$t('permission.passwords'),
      // content8: this.$t('permission.roleUser'),
      // content9: this.$t('permission.description')
    }
  },
  computed: {},
  watch: {
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    tableBoxHeight(val) {
      if (!this.timer) {
        this.tableBoxHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      // this.content1 = this.$t('permission.userName')
      // this.content2 = this.$t('permission.fullName')
      // this.content3 = this.$t('permission.containInfo')
      // this.content4 = this.$t('permission.company')
      // this.content5 = this.$t('permission.department')
      // this.content6 = this.$t('permission.password')
      // this.content7 = this.$t('permission.passwords')
      // this.content8 = this.$t('permission.roleUser')
      // this.content9 = this.$t('permission.description')
      this.setFormRules()
    }
  },
  created() {
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
        that.tableBoxHeight = window.innerHeight - fixHeightBox
      })()
    }
    this.getFactory() // 工厂查询
    this.getWorkshop() // 车间查询
    this.getLine() // 产线查询
    this.getword() // 工作中心查询
    this.getStation() // 车间查询
    this.setFormRules()
    this.funTree() // 获取树状图
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        FactoryName: [{ required: true, message: '请输入工厂名字', trigger: 'blur' }],
        WorkshopName: [{ required: true, message: '请输入车间名字', trigger: 'blur' }],
        LineName: [{ required: true, message: '请输入产线名字', trigger: 'blur' }],
        WorkCenterName: [{ required: true, message: '请输入工作中心名称', trigger: 'blur' }],
        TerminalName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }]
      }
    },

    // 禁用，启用权限
    handleBan(row) {
      let status, statusTitle
      if (row.Status === true) {
        status = this.$t('permission.jingyongTitle')
        statusTitle = this.$t('permission.jingyongInfo')
      } else {
        status = this.$t('permission.qiyongTitle')
        statusTitle = this.$t('permission.qiyongInfo')
      }
      this.$confirm(statusTitle, status, {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      }).then(() => {
        const params = {
          Status: (row.Status = row.Status !== true),
          MaterialCode: row.MaterialCode
        }
        MaterialStatus(params).then(res => {
          if (res.IsPass === true) {
            this.$message({
              type: 'success',
              message: res.MSG
            })
            this.getFactory()
          } else {
            this.$message({
              type: 'error',
              message: res.MSG
            })
          }
        })
      })
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getFactory()
    },

    //  获取树状图
    funTree() {
      treeList().then(res => {
        if (res.IsPass === true) {
          this.treeData = res.Obj
          this.organization = res.Obj[0].label
        }
      })
    },
    // 工厂查询
    getFactory() {
      this.listLoading = true
      factoryList(this.pagination).then(res => {
        this.factoryData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 车间查询
    getWorkshop() {
      this.listLoading = true
      workShopList(this.pagination).then(res => {
        this.workshopData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 产线查询
    getLine() {
      this.listLoading = true
      productLineList(this.pagination).then(res => {
        this.lineData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 工作中心查询
    getword() {
      this.listLoading = true
      workList(this.pagination).then(res => {
        this.wordData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 车间查询
    getStation() {
      this.listLoading = true
      stationList(this.pagination).then(res => {
        this.stationData = res.Obj
        this.total = res.TotalRowCount
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

    // 增加
    handleAddUser(status) {
      if (status === '1') {
        this.dialogTypeTitle = '增加工厂'
        this.factoryShow = true
        this.workshopShow = false
        this.lineShow = false
        this.wordShow = false
        this.stationShow = false
      } else if (status === '2') {
        this.dialogTypeTitle = '增加车间'
        this.factoryShow = false
        this.workshopShow = true
        this.lineShow = false
        this.wordShow = false
        this.stationShow = false
      } else if (status === '3') {
        this.dialogTypeTitle = '增加产线'
        this.factoryShow = false
        this.workshopShow = false
        this.lineShow = true
        this.wordShow = false
        this.stationShow = false
      } else if (status === '4') {
        this.dialogTypeTitle = '增加工作中心'
        this.factoryShow = false
        this.workshopShow = false
        this.lineShow = false
        this.wordShow = true
        this.stationShow = false
      } else {
        this.dialogTypeTitle = '增加工位'
        this.factoryShow = false
        this.workshopShow = false
        this.lineShow = false
        this.wordShow = false
        this.stationShow = true
      }
      this.dialogFormVisible = true
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row, status) {
      if (status === '1') {
        this.dialogTypeTitle = '编辑工厂'
      } else if (status === '2') {
        this.dialogTypeTitle = '编辑车间'
      } else if (status === '3') {
        this.dialogTypeTitle = '编辑产线'
      } else if (status === '4') {
        this.dialogTypeTitle = '编辑工作中心'
      } else {
        this.dialogTypeTitle = '编辑工位'
      }
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除角色
    handleDelete(row, status) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          if (status === '1') {
            factoryDelete({ FactoryCode: row.FactoryCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getFactory()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          } else if (status === '2') {
            workShopDelete({ WorkshopCode: row.WorkshopCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getWorkshop()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          } else if (status === '3') {
            productDelete({ LineCode: row.LineCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getLine()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          } else if (status === '4') {
            workDelete({ WorkCenterCode: row.WorkCenterCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getword()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          } else {
            stationDelete({ TerminalCode: row.TerminalCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getStation()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('table.deleteError')
          })
        })
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTypeTitle === '增加工厂') {
            const params = this.ruleForm
            MaterialModify(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getFactory()
              }
            })
          } else if (this.dialogTypeTitle === '增加车间') {
            debugger
          } else if (this.dialogTypeTitle === '增加产线') {
            debugger
          } else if (this.dialogTypeTitle === '增加工作中心') {
            debugger
          } else if (this.dialogTypeTitle === '增加工位') {
            debugger
          } else {
            const params = this.ruleForm
            if (this.dialogTypeTitle === '增加工厂') {
              factoryAdd(params).then(res => {
                if (res.IsPass === true) {
                  this.$message({
                    type: 'success',
                    message: this.$t('table.addSuc')
                  })
                  this.getFactory()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.MSG
                  })
                }
              })
            } else if (this.dialogTypeTitle === '增加车间') {
              workShopAdd(params).then(res => {
                if (res.IsPass === true) {
                  this.$message({
                    type: 'success',
                    message: this.$t('table.addSuc')
                  })
                  this.getFactory()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.MSG
                  })
                }
              })
            } else if (this.dialogTypeTitle === '增加产线') {
              productAdd(params).then(res => {
                if (res.IsPass === true) {
                  this.$message({
                    type: 'success',
                    message: this.$t('table.addSuc')
                  })
                  this.getFactory()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.MSG
                  })
                }
              })
            } else if (this.dialogTypeTitle === '增加工作中心') {
              workAdd(params).then(res => {
                if (res.IsPass === true) {
                  this.$message({
                    type: 'success',
                    message: this.$t('table.addSuc')
                  })
                  this.getFactory()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.MSG
                  })
                }
              })
            } else {
              stationAdd(params).then(res => {
                if (res.IsPass === true) {
                  this.$message({
                    type: 'success',
                    message: this.$t('table.addSuc')
                  })
                  this.getFactory()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.MSG
                  })
                }
              })
            }
            this.editLoading = false
            this.dialogFormVisible = false
          }
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .el-col-7 {
    height: 30px;
    line-height: 25px;
    text-align: right;
  }
}
.main-container .centerBox {
  width: 100%;
  .centerTree {
    width: 28%;
    float: left;
    border: 1px solid #dfe6ec;
    padding: 10px;
    overflow-y: auto;
  }
  .centerTable {
    width: 70%;
    float: right;
  }
}
</style>
