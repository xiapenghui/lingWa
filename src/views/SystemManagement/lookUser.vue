<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%;margin-top:10px;" border>
      <el-table-column align="center" :label="$t('permission.fullName')" width="250">
        <!-- <template slot-scope="scope">
          {{ scope.row.key }}
        </template> -->
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.loginUser')" width="250">
        <!-- <template slot-scope="scope">
          {{ scope.row.name }}
        </template> -->
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.company')">
        <!-- <template slot-scope="scope">
          {{ scope.row.description }}
        </template> -->
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.department')">
        <!-- <template slot-scope="scope">
          {{ scope.row.description }}
        </template> -->
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },

  data() {
    return {
      total: 10,
      listLoading: false,
      rolesList: null
    }
  },
  created() {},
  methods: {}
}
</script>
