export async function uploadNewsPhotos(files: File[], add: (photo: { id: number; url: string }) => void) {
  let failed = 0
  for (const file of files) {
    const body = new FormData()
    body.append('files', file)
    try {
      const photo = await $fetch<{ id: number; url: string }>('/api/admin/news/upload', {
        method: 'POST', query: { kind: 'gallery' }, body
      })
      add(photo)
    } catch {
      failed++
    }
  }
  return failed
}
