const EnvironmentBadge: React.FC = () => {
  const environment = process.env.ENVIRONMENT_NAME

  if (!environment || environment === 'LIVE') return null;

  return (
    <div className="fixed bottom-4 right-4 border-4
      border-red-600 text-red-600 text-4xl font-bold px-3 py-1 z-50">
      {environment}
    </div>
  )
}
export default EnvironmentBadge