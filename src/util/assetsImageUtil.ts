export const getImage = (imageName: string) => {
  // import.meta.url的值为：http://localhost:8001/src/util/assetsImageUtil.ts?t=171xxxxxxx
  // 以当前文件作为基准路径，到../assets/image/目录下找图片
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}