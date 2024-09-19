import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'


const titles = [
    "Attack on Titan", "My Hero Academia", "One Piece", "Demon Slayer", "Jujutsu Kaisen",
    "Naruto", "Dragon Ball", "Fullmetal Alchemist", "Sword Art Online", "Tokyo Revengers",
    "Hunter x Hunter", "Bleach", "Death Note", "Re:Zero", "Black Clover",
    "One Punch Man", "Your Lie in April", "Haikyuu!!", "Steins;Gate", "Code Geass",
]
const generateRandomData = () => {
  const data = [];
  const startDate = new Date(2024, 3, 1); // April 1, 2024
  const endDate = new Date(2024, 3, 15); // April 15, 2024
  
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    const dailyData = Array.from({ length: 20 }, () => ({
      title: titles[Math.floor(Math.random() * titles.length)],
      value: (Math.floor(Math.random() * 10000) + 1), // Random number between 1 and 10000
    }));

    data.push({ date: formattedDate, data: dailyData });
  }
  
  return data;
}
// const timeSeriesData = generateRandomData()
const titlesArray = titles.map(elem => {
  return ({
    title: elem
  })
})

type GetScrapingData = {
  scraping_id: number
  job_id: number
  date: string
  website_name: string
  attribute_name: string
  title: string
  value: number
  cron_execution_timestamp: number
}
type TimeSeriesData = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
type TitlesData = {
  title: string
}

export const GET = async (req: NextRequest) => {
  const { data, error, status } = await supabaseClient
  .rpc('get_scraping_data', { _start_date: '2024-01-01', _end_date: '2024-03-31', _website_id: 1 })

  console.log("data: ", data, error, status)
  const timeSeriesData = data.reduce((acc: TimeSeriesData[], curr: GetScrapingData) => {
    const sameDateData = acc.find(elem => elem.date === curr.date)
    if(sameDateData){
      sameDateData.data.push({ title: curr.title, value: curr.value })
    }else{
      acc.push({
        date: curr.date,
        data: [{ title: curr.title, value: curr.value }]
      })
    }
    return acc
  }, [])
  const titles: string[] = [...new Set<string>(data.map((elem: GetScrapingData) => elem.title))]
  const titlesData: TitlesData[] = titles.map((elem: string) => {
    return ({ title: elem })
  })

  const res = NextResponse.json({
    timeSeriesData: timeSeriesData,
    titlesData: titlesData,
  })
  return res
}