/* eslint-disable no-console */

import createClient from '@/utils/supabase/client'

export default async function getData(
  tableName: 'events' | 'photos' | 'video_urls',
  select: ('event_id' | 'date' | 'title' | 'description' | 'href' | 'display_order' | '*')[] = ['*'],
  filters: { column: string, operator: string, value: string } [] = [],
  order: { column: string, ascending: boolean } | null = null,
) {
  const supabase = createClient()

  // Convert array to comma-separated string for the select method
  const selectFields = select.join(', ')
  let query = supabase.from(tableName).select(selectFields)

  // Apply filters
  filters.forEach(({ column, value }) => {
    query = query.eq(column, value)
  })

  // Apply order
  if (order) {
    query = query.order(order.column, { ascending: order.ascending })
  }

  const { data, error } = await query
  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message)
    return []
  }
  return data
}
