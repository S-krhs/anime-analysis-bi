// 参考資料

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Menu, BarChart2, Heart, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

type AnimeData = {
  title: string;
  views: number;
  favorites: number;
  users: number;
};

type TimeSeriesData = {
  [key: string]: any;
};

type Data = {
  animeData: AnimeData[];
  timeSeriesData: TimeSeriesData[];
};

type DateRange = {
  label: string;
  days: number;
};


const generateData = (days: number): Data => {
  const animes = Array.from({ length: 30 }, (_, i) => `作品${String.fromCharCode(65 + i)}`);
  return {
    animeData: animes.map(anime => ({
      title: anime,
      views: Math.floor(Math.random() * 10000),
      favorites: Math.floor(Math.random() * 1000),
      users: Math.floor(Math.random() * 5000),
    })),
    timeSeriesData: Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - days + i + 1);
      const data: { [key: string]: any } = { date: date.toISOString().split('T')[0] };
      animes.forEach(anime => {
        data[`${anime}_views`] = Math.floor(Math.random() * 10000);
        data[`${anime}_favorites`] = Math.floor(Math.random() * 1000);
        data[`${anime}_users`] = Math.floor(Math.random() * 5000);
      });
      return data;
    }),
  };
};

const dateRanges: DateRange[] = [
  { label: '1週間', days: 7 },
  { label: '1ヶ月', days: 30 },
  { label: '3ヶ月', days: 90 },
  { label: '6ヶ月', days: 180 },
  { label: '1年', days: 365 },
];

const colors = [
  '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
  '#6366F1', '#84CC16', '#06B6D4', '#D946EF', '#0EA5E9', '#F43F5E', '#22C55E', '#3B82F6',
  '#A855F7', '#64748B', '#CA8A04', '#0D9488', '#FF5C93', '#FFC107', '#8C9EFF', '#FF4081',
  '#CDDC39', '#00BCD4', '#7C4DFF', '#3F51B5', '#FF5722', '#795548', '#607D8B', '#00E676',
  '#F50057', '#9C27B0', '#FFC400', '#69F0AE', '#00BFA5', '#F06292', '#E91E63', '#009688',
  '#FFAB40', '#FF7043', '#1E88E5', '#3949AB', '#5E35B1', '#039BE5', '#43A047', '#7CB342',
  '#C0CA33', '#FFEB3B', '#A1887F', '#6D4C41'
]


const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-primary-200">
        <p className="font-bold text-primary-600">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnimeViewerApp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<string>('1ヶ月');
  const [selectedAnimes, setSelectedAnimes] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<Data>({ animeData: [], timeSeriesData: [] });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const days = dateRanges.find(range => range.label === selectedRange)?.days || 30;
    const newData = generateData(days);
    setData(newData);
    const initialSelectedAnimes = Object.fromEntries(
      newData.animeData.map(anime => [anime.title, false])
    );
    setSelectedAnimes(initialSelectedAnimes);
  }, [selectedRange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAnimeToggle = (anime: string) => {
    setSelectedAnimes(prev => ({ ...prev, [anime]: !prev[anime] }));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedAnimes(prev => Object.fromEntries(Object.keys(prev).map(key => [key, checked])));
  };

  const renderGraph = (dataKey: string, title: string): JSX.Element => {
    const selectedAnimeList = data.animeData.filter(anime => selectedAnimes[anime.title]);
    return (
      <Card className="mb-8 border-primary-200">
        <CardHeader className="border-b border-primary-100">
          <CardTitle className="text-primary-700">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-8 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                <XAxis dataKey="date" stroke="#000000" />
                {/* <YAxis className="hidden lg:block" stroke="#000000" /> */}
                <Tooltip wrapperStyle={{zIndex: 1}} content={<CustomTooltip />} />
                {selectedAnimeList.map((anime, index) => (
                  <Line
                    key={anime.title}
                    type="linear"
                    dataKey={`${anime.title}_${dataKey}`}
                    name={anime.title}
                    stroke={colors[index % colors.length]}
                    strokeWidth={1}
                    dot={{ r: 2 }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedAnimeList.map((anime, index) => (
              <div
                key={anime.title}
                className="flex items-center px-2 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                {anime.title}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };


  return (
    <div className="flex flex-col h-screen bg-primary-50">
      <header className="bg-white shadow-sm p-4 border-b border-primary-100">
        <h1 className="text-2xl font-bold text-primary-700">アニメ視聴データ分析</h1>
        <p className="mt-2 text-primary-600">アニメの視聴データを分析し、トレンドを把握しましょう。</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div
          ref={menuRef}
          className={`bg-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static h-full z-10 border-r border-primary-100`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-primary-700">メニュー</h2>
            <ul>
              <li className="mb-2">
                <Button variant="ghost" className="w-full justify-start text-primary-600 hover:bg-primary-100">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  再生数
                </Button>
              </li>
              <li className="mb-2">
                <Button variant="ghost" className="w-full justify-start text-primary-600 hover:bg-primary-100">
                  <Heart className="mr-2 h-4 w-4" />
                  お気に入り数
                </Button>
              </li>
              <li className="mb-2">
                <Button variant="ghost" className="w-full justify-start text-primary-600 hover:bg-primary-100">
                  <Users className="mr-2 h-4 w-4" />
                  ユーザー数
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="mb-4 flex justify-between items-center">
            <Button variant="ghost" size="icon" className="lg:hidden text-primary-600" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu />
            </Button>
            <Select value={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger className="w-[180px] border-primary-300 text-primary-700 bg-white">
                <SelectValue placeholder="日付範囲を選択" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="mb-8 border-primary-200">
            <CardHeader className="border-b border-primary-100">
              <CardTitle className="text-primary-700">アニメ一覧</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 overflow-auto max-h-96">
                <Table>
                  <TableHeader className="bg-white sticky top-0 h-10 shadow-md">
                    <TableRow className="bg-primary-50">
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={Object.values(selectedAnimes).every(Boolean)}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="text-primary-700">タイトル</TableHead>
                      <TableHead className="text-right text-primary-700">再生数</TableHead>
                      <TableHead className="text-right text-primary-700">お気に入り数</TableHead>
                      <TableHead className="text-right text-primary-700">ユーザー数</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.animeData.map((anime) => (
                      <TableRow key={anime.title} className="hover:bg-muted/50 h-10">
                        <TableCell>
                          <Checkbox
                            checked={selectedAnimes[anime.title]}
                            onCheckedChange={() => handleAnimeToggle(anime.title)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{anime.title}</TableCell>
                        <TableCell className="text-right">{anime.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{anime.favorites.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{anime.users.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {renderGraph('views', '再生数')}
          {renderGraph('favorites', 'お気に入り数')}
          {renderGraph('users', 'ユーザー数')}
        </div>
      </div>
    </div>
  );
};

export default AnimeViewerApp;
