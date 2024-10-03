export type EnvironmentBadgeProps = {
  environment: string
}

const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({ environment }) => {
  return (
    <div className="fixed bottom-4 right-4 border-4
      border-red-600 text-red-600 text-4xl font-bold px-3 py-1 z-50">
      {environment}
    </div>
  )
}
export default EnvironmentBadge