import { reactive } from "vue";
import { BASE_URL, STORAGE_USER_TOKEN_KEY } from "../config/constants";
import { getItem } from "../util/storageUtil";
import { ElMessage, type UploadUserFile } from "element-plus";

export function useUpload() {
  let uploadCfg = reactive({
    uploadUrl: BASE_URL + "/storage/uploadFile",
    headers: {
      "Authorization": getItem(STORAGE_USER_TOKEN_KEY)
    }
  })

  function handleExceed(files: File[], fileList: UploadUserFile[]) {
    ElMessage({ message: `数量超出限制，只能上传${files.length}个`, type: "error" })
  }

  return { uploadCfg, handleExceed }
}