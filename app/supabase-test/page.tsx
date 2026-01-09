'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTestPage() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase
        .from('test')
        .select('*')

      if (error) {
        console.error('❌ Supabase 연결 실패', error)
      } else {
        console.log('✅ Supabase 연결 성공', data)
      }
    }

    test()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase 연결 테스트</h1>
      <p>콘솔을 확인하세요</p>
    </div>
  )
}