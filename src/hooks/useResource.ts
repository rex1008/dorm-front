import { BASE_RESOURCES_URL } from "../config/constants";

export function useResource() {
  function toAddressable(relativePath: string) {
    if(relativePath) {
      return BASE_RESOURCES_URL + relativePath
    }
    return relativePath
  }

  return {toAddressable}
}