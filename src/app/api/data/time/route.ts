import { NextRequest, NextResponse } from 'next/server'


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
const timeSeriesData = generateRandomData()
const titlesArray = titles.map(elem => {
  return ({
    title: elem
  })
})


export const GET = async (req: NextRequest) => {
  const res = NextResponse.json({
    timeSeriesData: timeSeriesData,
    titlesData: titlesArray,
  })
  return res
}