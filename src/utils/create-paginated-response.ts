export function CreatePaginatedResponse<DataType>({
  result,
  perPage,
  page,
}: {
  result: { rows: DataType[]; count: number },
  perPage: number,
  page: number
}) {
  const total = result.count
  const totalPagesCalc = Math.ceil(total / perPage)

  const offset = (page - 1) * perPage

  const from = offset + 1
  const to = offset + result.rows.length

  return {
    data: result.rows,
    meta: {
      page,
      perPage,
      from,
      to,
      count: total,
      hasMore: page < totalPagesCalc,
      lastPage: totalPagesCalc,
    },
  }
}