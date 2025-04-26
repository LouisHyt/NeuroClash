type StatisticCardProps = {
  value: number | string
  label: string
}

const StatisticCard = ({ value, label }: StatisticCardProps) => {
  return (
    <div className="bg-gray-900 rounded-lg p-1.5 sm:p-2 border border-gray-800 flex flex-col hover:bg-gray-850 transition-all duration-300 hover:border-gray-700 group">
      <div className="text-[10px] sm:text-sm md:text-base font-semibold capitalize text-gray-300 mb-0.5 sm:mb-1 group-hover:text-gray-100 transition-colors">
        {label}
      </div>
      <div className="text-sm sm:text-lg md:text-xl font-bold text-violet-400 group-hover:text-violet-300 transition-all duration-300">
        {value}
      </div>
    </div>
  )
}

export default StatisticCard
