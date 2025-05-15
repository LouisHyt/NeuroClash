import GameLayout from '~/layouts/GameLayout'

const End = () => {
  return <div>end</div>
}

End.layout = (page: React.ReactNode) => <GameLayout children={page} />
export default End
