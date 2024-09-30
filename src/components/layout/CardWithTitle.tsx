import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type CardWithTitleProps = {
  title: string
  children?: React.ReactNode
}

const CardWithTitle: React.FC<CardWithTitleProps> = ({ title, children }) => {
  return (
    <>
      <Card className="mb-8 border-primary-200">
        <CardHeader className="border-b border-primary-100">
          <CardTitle className="text-primary-700">{title}</CardTitle>
        </CardHeader>
        <CardContent className='px-2 lg:px-6'>
          {children}
        </CardContent>
      </Card>
    </>
  )
}
export default CardWithTitle

