/* eslint-disable default-case */
/* eslint-disable no-console */

import createClient from '@/utils/supabase/client'

interface Filter {
  column: string;
  operator: string;
  value: string;
}

interface Order {
  column: string;
  ascending: boolean;
}

export default async function getData<T>(
  tableName: 'events' | 'photos' | 'video_urls' | 'concerts',
  select: ('id' | 'event_id' | 'date' | 'time' | 'location' | 'title' | 'place' | 'description' | 'href' | 'display_order' | 'photo_id' | '*')[] = ['*'],
  filters: Filter[] = [],
  order: Order | null = null,
): Promise<T[]> {
  const supabase = createClient()

  const selectFields = select.join(', ')
  let query = supabase.from(tableName).select(selectFields)

  filters.forEach(({ column, operator, value }) => {
    switch (operator) {
      case 'eq':
        query = query.eq(column, value)
        break
      case 'gte':
        query = query.gte(column, value)
        break
      case 'lte':
        query = query.lte(column, value)
        break
    }
  })

  if (order) {
    query = query.order(order.column, { ascending: order.ascending })
  }

  const { data, error } = await query
  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message)
    return []
  }
  return data as T[]
}
