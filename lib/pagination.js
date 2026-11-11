export function paginate(items, requestedPage = 1, pageSize = 8) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.max(1, Math.min(requestedPage, pageCount));
  return { page, pageCount, items: items.slice((page - 1) * pageSize, page * pageSize) };
}
