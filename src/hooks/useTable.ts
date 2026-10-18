import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { AnyObjDefine, UseTableOptDefine } from "../types/common";

export function useTable(opts: UseTableOptDefine) {
  const { searchFormData = {}, loadTableApi, deleteByIdApi } = opts // searchFormData = {} 写法表示如果没有searchFormData属性，就把其赋值为空对象
  let searchData = reactive<AnyObjDefine>({
    ...searchFormData,
    pageIndex: 1,
    pageSize: 10
  })

  let tableData = reactive({
    rows: [],
    total: 0
  })

  // 加载表格
  function loadTable() {
    loadTableApi && loadTableApi(searchData).then(result => {
      tableData.rows = result.data
      // 后端对Long类型做了特殊序列化，返回的是字符串，这里要转回为数字
      tableData.total = Number.parseInt(result.total)
    })
  }

  function handlePageSizeChange(pageSize: number) {
    searchData.pageSize = pageSize
    loadTable()
  }

  // 当前要前往第几页，则此处的pageIndex值要改为相应的值
  function handlePageIndexChange(pageIndex: number) {
    searchData.pageIndex = pageIndex
    loadTable()
  }

  function deleteById(id: string) {
    ElMessageBox.confirm("确认要删除吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      deleteByIdApi && deleteByIdApi(id).then(result => {
        ElMessage({
          type: "success",
          message: result.data
        })
        // 刷新表格
        loadTable()
      })
    })
  }

  return { searchData, tableData, loadTable, handlePageSizeChange, handlePageIndexChange, deleteById }
}